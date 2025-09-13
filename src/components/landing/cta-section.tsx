"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export function CTASection() {
  const benefits = [
    "14-day free trial",
    "No credit card required", 
    "Setup in under 5 minutes",
    "Cancel anytime"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground mb-6">
          Get started{" "}
          <span className="gradient-text">today</span>
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join over 2,000 developers who are already shipping better code with CodeGuardian. 
          Start your free trial and see the difference in minutes.
        </p>

        {/* Benefits List */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow text-lg px-8 py-4"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-accent text-lg px-8 py-4"
          >
            Schedule Demo
          </Button>
        </div>

        {/* Trust Indicator */}
        <p className="text-sm text-muted-foreground">
          ✨ Join 2,000+ developers • ⭐ 4.9/5 rating • 🔒 SOC 2 compliant
        </p>
      </div>
    </section>
  );
}