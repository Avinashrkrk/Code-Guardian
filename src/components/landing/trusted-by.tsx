export function TrustedBy() {
    const companies = [
      { name: "Microsoft", logo: "🟩" },
      { name: "GitHub", logo: "🔴" },
      { name: "Stripe", logo: "🟣" },
      { name: "Vercel", logo: "⚫" },
      { name: "Netflix", logo: "🔵" },
      { name: "Shopify", logo: "🟢" },
    ];
  
    return (
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-wide font-medium text-muted-foreground mb-8">
              Trusted by 2,000+ developers
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {companies.map((company, index) => (
                <div
                  key={company.name}
                  className="flex items-center justify-center p-4 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="flex items-center space-x-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-2xl">{company.logo}</span>
                    <span className="font-medium text-foreground">{company.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }