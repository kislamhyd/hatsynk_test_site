import { ArrowRight, Play, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import GradientButton from '@/components/ui/GradientButton';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Trusted by 20+ Happy Customers
              </span>
            </div>

            <h1 className="animate-fade-in-up delay-100 font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Transform Your{' '}
              <span className="gradient-text">Digital Ideas</span> Into Scalable Solutions
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We craft enterprise-grade SaaS, Web, Desktop, Mobile & Cloud solutions that drive innovation and accelerate your business growth.
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <GradientButton href="/contact" size="lg">
                Get Started <ArrowRight className="w-5 h-5" />
              </GradientButton>
              <GradientButton href="/services" variant="outline" size="lg">
                <Play className="w-5 h-5" /> Explore Services
              </GradientButton>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up delay-400 mt-12 grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">20+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">99%</div>
                <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">5-10</div>
                <div className="text-sm text-muted-foreground mt-1">Tech Experts</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="animate-fade-in-up delay-200 relative">
              {/* Main Visual Container */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Floating Cards */}
                
                {/* Card 1: SaaS Platform UI Mockup */}
                <div className="absolute top-0 left-0 w-48 h-32 glass-card rounded-xl p-4 animate-float delay-100 shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
                    <div className="text-sm font-medium">SaaS Platform</div>
                  </div>
                  <div className="h-2 w-3/4 bg-primary/20 rounded-full">
                    <div className="h-full w-2/3 bg-gradient-to-r from-primary to-accent rounded-full" />
                  </div>
                </div>

                {/* Card 2: System Uptime (Replaces Active Users) */}
                <div className="absolute top-20 right-0 w-44 h-28 glass-card rounded-xl p-4 animate-float delay-300 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-green-500" />
                    <div className="text-xs text-muted-foreground">System Uptime</div>
                  </div>
                  <div className="font-display text-2xl font-bold gradient-text">99.99%</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <div className="text-xs text-green-500">Operational</div>
                  </div>
                </div>

                {/* Card 3: Performance/Optimization (Replaces Revenue) */}
                <div className="absolute bottom-20 left-10 w-44 h-24 glass-card rounded-xl p-3 animate-float delay-500 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                    <div className="font-display text-xl font-bold gradient-text">Fast</div>
                  </div>
                </div>

                {/* Card 4: Code Lines/Structure */}
                <div className="absolute bottom-0 right-10 w-52 h-32 glass-card rounded-xl p-4 animate-float delay-700 shadow-xl">
                  <div className="flex gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-full bg-primary/10 rounded" />
                    <div className="h-2 w-4/5 bg-accent/10 rounded" />
                    <div className="h-2 w-3/5 bg-primary/10 rounded" />
                  </div>
                </div>

                {/* Center Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full blur-2xl opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;