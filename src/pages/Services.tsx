// Added Monitor, ShoppingBag, Brain. Removed Server, Code (as we replaced those services)
import { Cloud, Smartphone, Globe, Database, Cog, Headphones, Monitor, ShoppingBag, Brain } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import CTASection from '@/components/home/CTASection';

const services = [
  {
    icon: Monitor,
    title: 'Desktop Application Development',
    description: 'Robust desktop solutions tailored for your workflow, including specialized School, Finance, and Loan Management systems. We create high-performance offline-capable software.',
    features: ['Windows & macOS', 'Offline Functionality', 'Hardware Integration', 'High Performance'],
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: Smartphone,
    title: 'Android App Development',
    description: 'High-performance native mobile applications for Android. From consumer apps to enterprise mobility solutions with exceptional user experience.',
    features: ['Android Native', 'Java & Kotlin', 'Offline Capabilities', 'Push Notifications'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Globe,
    title: 'Web Application Development',
    description: 'Custom web solutions using cutting-edge technologies including React, Angular, and Vue.js. We build responsive, performant, and SEO-optimized web platforms.',
    features: ['Modern Frameworks', 'Responsive Design', 'SEO Optimization', 'PWA Support'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cloud,
    title: 'SaaS Application Development',
    description: 'Build scalable, multi-tenant SaaS applications with modern architecture, subscription management, and seamless user experiences from MVP to enterprise scale.',
    features: ['Multi-tenancy', 'Subscription & Billing', 'API-First Design', 'Scalable Infrastructure'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: ShoppingBag,
    title: 'SAP Commerce Cloud',
    description: 'Expert SAP Hybris implementation and support to power your enterprise-grade e-commerce platforms. We handle migration, customization, and ongoing maintenance.',
    features: ['B2B & B2C Commerce', 'Hybris Implementation', 'Data Migration', 'Performance Tuning'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Database,
    title: 'Cloud-Based Solutions',
    description: 'Cloud-native infrastructure design, migration, and optimization for AWS, Azure, and GCP. Maximize scalability while minimizing costs.',
    features: ['Cloud Migration', 'Infrastructure as Code', 'Cost Optimization', 'Security & Compliance'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Brain,
    title: 'AI & Data Analytics',
    description: 'Transform your business with intelligent automation, machine learning models, and predictive analytics to drive data-backed decision making.',
    features: ['Machine Learning', 'Predictive Analytics', 'Process Automation', 'Business Intelligence'],
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: Cog,
    title: 'System Integration Services',
    description: 'Seamlessly connect your enterprise systems, APIs, and third-party services. Unified data flow and automated workflows across your organization.',
    features: ['API Development', 'Legacy Integration', 'Data Synchronization', 'Workflow Automation'],
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Headphones,
    title: 'Support & Maintenance',
    description: '24/7 support, maintenance, and managed hosting services. Keep your applications secure, updated, and performing at their best.',
    features: ['24/7 Monitoring', 'Security Updates', 'Performance Optimization', 'Managed Hosting'],
    color: 'from-pink-500 to-rose-500',
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            badge="Our Services"
            title={
              <>
                Comprehensive <span className="gradient-text">IT Solutions</span> for Every Need
              </>
            }
            description="From ideation to deployment and beyond, we provide end-to-end software development services tailored to your business goals."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <GlassCard
                key={service.title}
                hover
                className={`animate-fade-in-up delay-${Math.min((index + 1) * 100, 400)}`}
              >
                <div className="flex flex-col h-full">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Services;