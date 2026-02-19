import { Target, Eye, Users, Award, TrendingUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import CTASection from '@/components/home/CTASection';

const values = [
  {
    icon: Eye,
    title: 'Client First',
    description: 'Your success is our priority. We build long-term partnerships based on trust and mutual growth.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We deliver nothing but the best. Quality, performance, and reliability define every project.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We embrace cutting-edge technologies to create future-proof solutions for your business.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with you at every step, ensuring transparency and alignment with your vision.',
  },
];

const stats = [
  { value: '20+', label: 'Projects Delivered' },
  { value: '10+', label: 'Team Members' },
  { value: '10+', label: 'Years Experience' },
  { value: '99%', label: 'Client Satisfaction' },
];

const About = () => {
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
            badge="About Us"
            title={
              <>
                Building the <span className="gradient-text">Future</span> of Digital Innovation
              </>
            }
            description="HatSynk Software Pvt Ltd is a service-based IT company dedicated to delivering scalable, secure, and innovative software solutions."
          />
        </div>
      </section>

      {/* Company Story */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Your Trusted Technology Partner
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At HatSynk Software, we believe technology should empower businesses to achieve more. 
                  Founded with a vision to bridge the gap between innovative ideas and robust software solutions, 
                  we've grown into a trusted partner for startups and enterprises alike.
                </p>
                <p>
                  Our team of 10+ skilled engineers, designers, and architects brings together deep technical 
                  expertise with industry knowledge to deliver solutions that truly make a difference. From 
                  SaaS platforms to enterprise systems, we've successfully delivered over 20 projects.
                </p>
                <p>
                  We're not just developers—we're partners in your digital journey. Our approach combines 
                  agile methodologies with a relentless focus on quality, ensuring every project exceeds 
                  expectations.
                </p>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <GlassCard key={stat.label} className={`text-center delay-${(index + 1) * 100}`}>
                    <div className="font-display text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-background via-secondary/30 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="animate-fade-in-up delay-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-2xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with innovative, scalable, and secure software solutions that drive 
                digital transformation and sustainable growth. We strive to be the catalyst that turns 
                your vision into reality through technology excellence and unwavering commitment to quality.
              </p>
            </GlassCard>

            <GlassCard className="animate-fade-in-up delay-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-2xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the globally recognized leader in enterprise software development, known for our 
                innovative solutions, exceptional quality, and lasting client partnerships. We envision 
                a future where every business has access to world-class technology solutions.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            badge="Core Values"
            title={
              <>
                Principles That <span className="gradient-text">Guide</span> Us
              </>
            }
            description="Our values define who we are and how we work with every client."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`group p-6 rounded-2xl border border-border hover:border-primary/50 hover:bg-card transition-all animate-fade-in-up delay-${(index + 1) * 100}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;
