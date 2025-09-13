"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Code, Zap } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-8">
              <Zap className="w-4 h-4" />
              <span>Cut Code Review Time & Bugs In Half. Instantly.</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="gradient-text">Enhance your</span>
              <br />
              code quality with{" "}
              <span className="gradient-text">AI-powered</span>
              <br />
              code reviews
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              CodeGuardian provides automated AI code reviews, security insights, 
              and best practices. Seamlessly integrate with GitHub, GitLab, and CI/CD pipelines.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover-glow text-lg px-8 py-3"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-border text-foreground hover:bg-accent text-lg px-8 py-3"
              >
                View Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-col sm:flex-row items-center sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">SOC 2 Type II Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Code className="w-5 h-5 text-primary" />
                <span className="text-sm">GitHub & GitLab Integration</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="relative">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl glow-primary">
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Live Review</span>
                  </div>
                </div>

                {/* Mock Code Review Content */}
                <div className="space-y-4">
                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">Security Vulnerability Detected</h3>
                      <span className="bg-destructive/20 text-destructive px-2 py-1 rounded text-xs font-medium">
                        Critical
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Potential SQL injection vulnerability in user authentication
                    </p>
                    <div className="bg-muted rounded p-2 font-mono text-xs">
                      <span className="text-destructive">- query = "SELECT * FROM users WHERE id = " + userId</span>
                      <br />
                      <span className="text-primary">+ query = "SELECT * FROM users WHERE id = ?"</span>
                    </div>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">Performance Improvement</h3>
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                        Suggestion
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Consider using async/await for better performance
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-primary font-medium">✓ 23 Issues Resolved</span>
                      <span className="text-muted-foreground">2 Pending Review</span>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground">
                      Apply All
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}