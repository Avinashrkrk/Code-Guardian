'use client';

import { useState } from 'react';
import { Shield, Lock, Eye, Settings, BarChart3, Users, AlertTriangle } from 'lucide-react';

export default function CodeGuardianPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleCreateUser = async () => {
    // Your server action logic here
    console.log('Creating user...');
    alert('Server Action triggered: Creating user John, 30, john@example.com');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, role });
    alert('User registration submitted!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Code Guardian
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Security</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Analytics</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </a>
            </nav>
            
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5">
              Deploy
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Secure Your Code
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A demonstration of Next.js features and components with advanced security monitoring and protection.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5">
              Primary Button
            </button>
            <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-secondary/40 hover:-translate-y-0.5">
              Secondary Button
            </button>
            <button className="border border-border text-foreground px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 hover:bg-card hover:shadow-lg">
              Outline Button
            </button>
            <button className="bg-destructive text-destructive-foreground px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 hover:opacity-90 hover:shadow-lg">
              Destructive
            </button>
          </div>
        </section>

        {/* Cards Section */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Create User Card */}
          <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-primary">Create a User</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Clicking this button will trigger a Server Action to create a hard-coded user (John, 30, 'john@example.com') in the database.
            </p>
            <button 
              onClick={handleCreateUser}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/40"
            >
              Create User
            </button>
          </div>

          {/* Security Status Card */}
          <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-1 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-secondary" />
                <h3 className="text-xl font-semibold text-secondary">Security Status</h3>
              </div>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Threat Level</span>
                <span className="text-primary font-medium">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Shields</span>
                <span className="text-primary font-medium">7/7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Scan</span>
                <span className="text-muted-foreground">2 min ago</span>
              </div>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-semibold text-accent">Analytics</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Code Coverage</span>
                  <span className="text-foreground font-medium">94%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: '94%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Security Score</span>
                  <span className="text-foreground font-medium">87%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-secondary h-2 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: '87%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alert Section */}
        <section className="bg-card border border-destructive/20 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-2">Security Alert</h3>
              <p className="text-muted-foreground mb-4">
                We've detected 3 potential vulnerabilities in your recent deployment. 
                Review and address these issues to maintain optimal security.
              </p>
              <div className="flex space-x-3">
                <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:opacity-90">
                  View Details
                </button>
                <button className="border border-border text-foreground px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-muted">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-card border border-border rounded-lg p-8 max-w-md mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            User Registration
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input 
                id="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                Role
              </label>
              <select 
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select a role</option>
                <option value="admin">Administrator</option>
                <option value="developer">Developer</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="text-center text-muted-foreground mt-16 py-8 border-t border-border">
          <p>&copy; 2024 Code Guardian. Protecting your code, securing your future.</p>
        </footer>
      </main>
    </div>
  );
}