"use client";

import { Shield, Code, Zap, GitBranch, Eye, BarChart3 } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Security First",
      description: "Advanced vulnerability detection with OWASP compliance and real-time threat analysis.",
      color: "text-red-500"
    },
    {
      icon: Code,
      title: "Smart Code Analysis",
      description: "AI-powered code review that understands context and suggests intelligent improvements.",
      color: "text-blue-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get comprehensive code reviews in seconds, not hours. Perfect for CI/CD integration.",
      color: "text-yellow-500"
    },
    {
      icon: GitBranch,
      title: "Git Integration",
      description: "Seamlessly works with GitHub, GitLab, and Bitbucket. Zero configuration required.",
      color: "text-green-500"
    },
    {
      icon: Eye,
      title: "Visual Insights",
      description: "Beautiful dashboards and reports that make code quality metrics easy to understand.",
      color: "text-purple-500"
    },
    {
      icon: BarChart3,
      title: "Team Analytics",
      description: "Track team performance, code quality trends, and identify areas for improvement.",
      color: "text-pink-500"
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How our platform makes your{" "}
            <span className="gradient-text">workflow easier</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to maintain high-quality, secure code. 
            Built for modern development teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-3 rounded-xl bg-background border border-border group-hover:scale-110 transition-transform ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}