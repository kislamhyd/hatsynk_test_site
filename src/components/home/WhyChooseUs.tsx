import { Shield, Zap, Users, Award, Clock, Lightbulb } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security protocols and compliance standards for your peace of mind.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance and rapid development cycles to accelerate your growth.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: '10+ skilled developers, designers, and architects with deep domain expertise.',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Rigorous testing and QA processes ensure bug-free, reliable deliverables.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock support and maintenance to keep your systems running.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Cutting-edge technologies and methodologies for future-proof solutions.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="Why HatSynk"
          title={
            <>
              Building <span className="gradient-text">Trust</span> Through Excellence
            </>
          }
          description="We combine technical expertise with a client-first approach to deliver exceptional results every time."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group p-6 rounded-2xl transition-all duration-300 hover:bg-card hover:shadow-lg animate-fade-in-up delay-${(index + 1) * 100}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
