"use client";

import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp",
      avatar: "👩‍💻",
      content: "CodeGuardian caught 3 critical security vulnerabilities in our authentication system before they made it to production. It's like having a senior security engineer reviewing every line of code.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Engineering Manager", 
      company: "StartupXYZ",
      avatar: "👨‍💼",
      content: "Our code review time dropped by 60% after implementing CodeGuardian. The AI suggestions are incredibly accurate and help our junior developers learn best practices.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "DevOps Lead",
      company: "ScaleInc",
      avatar: "👩‍🔧",
      content: "The GitHub integration is seamless. CodeGuardian runs on every PR and provides instant feedback. It's become an essential part of our CI/CD pipeline.",
      rating: 5
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What our users are{" "}
            <span className="gradient-text">saying</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of developers who have transformed their code quality with CodeGuardian.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}