import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dns from 'dns';
import 'server-only';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the environment variables');
}

// Extract hostname from DATABASE_URL
const url = new URL(process.env.DATABASE_URL);
const hostname = url.hostname;

// A custom Pool that completely bypasses the buggy DNS resolver in Next.js/Bun
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// We override the pg driver's internal socket connection to force IPv4 manual resolution
pool.on('connect', (client) => {
  // We can't easily intercept net.Socket in pg here, but we can do a global override for dns.lookup
});

// A much better and globally effective way:
// Force Node's dns.lookup to use a specific family and avoid the ENOTFOUND bug
const originalLookup = dns.lookup;
// @ts-ignore
dns.lookup = function (domain, options, callback) {
  let isAll = false;
  if (typeof options === 'function') {
    callback = options;
    options = { family: 4 };
  } else if (typeof options === 'object') {
    isAll = options.all === true;
    options = { ...options, family: 4 };
  }
  
  // Directly resolve4 to bypass getaddrinfo entirely if it's the Neon database
  if (domain && domain.includes('neon.tech')) {
    dns.resolve4(domain, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        // Fallback to original
        return originalLookup(domain, options, callback);
      }
      
      if (isAll) {
        callback(null, addresses.map(ip => ({ address: ip, family: 4 })));
      } else {
        callback(null, addresses[0], 4);
      }
    });
  } else {
    originalLookup(domain, options, callback);
  }
};

export const db = drizzle(pool);
