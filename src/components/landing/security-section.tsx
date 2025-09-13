"use client";

import { Shield, Lock, Eye, Database } from "lucide-react";

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "SOC 2 Type II",
      description: "Comprehensive security controls and regular audits",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your code is encrypted in transit and at rest",
    },
    {
      icon: Eye,
      title: "Zero Data Retention", 
      description: "We analyze your code but never store it permanently",
    },
  ];

  return (
    <section id="security" className="py-20 bg-gradient-to-br from-secondary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your data stays{" "}
            <span className="gradient-text">confidential</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We take security seriously. Your code never leaves your environment 
            without enterprise-grade encryption and compliance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-card border border-border rounded-2xl p-8">
          <div className="text-center">
            <div className="text-3xl font-display font-bold gradient-text mb-2">256-bit</div>
            <div className="text-sm text-muted-foreground">AES Encryption</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold gradient-text mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold gradient-text mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Security Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
}