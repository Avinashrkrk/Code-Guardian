export function StatsSection() {
    const stats = [
      {
        value: "2M",
        label: "Lines of code reviewed",
        description: "Every single day"
      },
      {
        value: "15M",
        label: "Security issues prevented",
        description: "In the last year"
      },
      {
        value: "50%",
        label: "Faster code reviews",
        description: "Average time saved"
      },
      {
        value: "99.9%",
        label: "Uptime guarantee",
        description: "Enterprise SLA"
      }
    ];
  
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              The most trusted AI code review platform on{" "}
              <span className="gradient-text">GitHub</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of developers who trust CodeGuardian to protect their code 
              and accelerate their development workflow.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="text-5xl font-display font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }