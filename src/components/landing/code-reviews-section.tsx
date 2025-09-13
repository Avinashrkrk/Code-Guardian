"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react";

export function CodeReviewsSection() {
  const reviewItems = [
    {
      type: "error",
      icon: XCircle,
      title: "Potential Memory Leak",
      description: "Event listener not properly removed in cleanup",
      file: "components/Dashboard.tsx:45",
      severity: "High",
      fixed: false
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Performance Concern",
      description: "Expensive operation inside render loop",
      file: "utils/helpers.js:12",
      severity: "Medium", 
      fixed: false
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Security Improvement",
      description: "Input validation successfully implemented",
      file: "api/auth.ts:28",
      severity: "Fixed",
      fixed: true
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Code Optimization",
      description: "Reduced bundle size by 12% with tree shaking",
      file: "webpack.config.js:8",
      severity: "Fixed",
      fixed: true
    }
  ];

  const codeExample = `// Before - Potential security vulnerability
app.get('/user/:id', (req, res) => {
  const query = \`SELECT * FROM users WHERE id = \${req.params.id}\`;
  db.query(query, (err, results) => {
    res.json(results);
  });
});

// After - CodeGuardian suggestion applied
app.get('/user/:id', (req, res) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    res.json(results);
  });
});`;

  return (
    <section className="py-20 bg-gradient-to-br from-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              <span className="gradient-text">AI Code Reviews</span>
              <br />
              that actually help
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Our AI doesn't just find bugs—it understands your code context and 
              provides intelligent suggestions that improve security, performance, 
              and maintainability.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Contextual code understanding</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Automated security vulnerability detection</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Performance optimization suggestions</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Best practice recommendations</span>
              </div>
            </div>

            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow">
              Try AI Reviews
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right side - Mock Dashboard */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-background border-b border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Code Review Results</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Live</span>
                  </div>
                </div>
              </div>

              {/* Review Items */}
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {reviewItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                        item.fixed 
                          ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                          : item.type === 'error'
                          ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                          : 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          item.fixed 
                            ? 'text-green-600' 
                            : item.type === 'error' 
                            ? 'text-red-600' 
                            : 'text-yellow-600'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground">{item.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              item.severity === 'Fixed'
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                : item.severity === 'High'
                                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                            }`}>
                              {item.severity}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          <p className="text-xs text-muted-foreground font-mono">{item.file}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Code Example */}
              <div className="border-t border-border p-6">
                <h4 className="font-medium text-foreground mb-3">Suggested Fix</h4>
                <div className="bg-background border border-border rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-muted-foreground font-mono whitespace-pre">
                    <code>{codeExample}</code>
                  </pre>
                </div>