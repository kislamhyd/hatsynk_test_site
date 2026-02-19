import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Smartphone, Globe, Database, Cog, Headphones, Monitor, ShoppingBag, Brain } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

const services = [
  {
    icon: Monitor,
    title: 'Desktop Applications',
    description: 'Robust desktop solutions including School, Finance, and Loan Management systems tailored for your workflow.',
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android with exceptional UX.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Custom web solutions using cutting-edge technologies for responsive, performant applications.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cloud,
    title: 'SaaS Development',
    description: 'Build scalable, multi-tenant SaaS applications with modern architecture and seamless user experiences.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: ShoppingBag,
    title: 'SAP Commerce Cloud',
    description: 'Expert SAP Hybris implementation and support to power your enterprise-grade e-commerce platforms.',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Database,
    title: 'Cloud Solutions',
    description: 'Cloud-native infrastructure, migration, and optimization for AWS, Azure, and GCP.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Brain, // New AI Icon
    title: 'AI & Data Analytics',
    description: 'Transform your business with intelligent automation, machine learning models, and predictive analytics.',
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: Cog,
    title: 'System Integration',
    description: 'Seamlessly connect your enterprise systems, APIs, and third-party services.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Headphones,
    title: 'Support & Maintenance',
    description: '24/7 support, maintenance, and hosting services to keep your systems running smoothly.',
    color: 'from-pink-500 to-rose-500',
  },
];

export function ServicesPreview() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="Our Services"
          title={
            <>
              Comprehensive <span className="gradient-text">IT Solutions</span> for Your Business
            </>
          }
          description="From concept to deployment, we deliver end-to-end software solutions tailored to your unique business needs."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <GlassCard
              key={service.title}
              hover
              className={`animate-fade-in-up delay-${(index + 1) * 100}`}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}
              >
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary/30 hover:border-primary text-foreground font-medium transition-all hover:bg-primary/5"
          >
            View All Services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;