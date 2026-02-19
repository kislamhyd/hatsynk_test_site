import { ArrowRight, ShoppingCart, Building2, Network, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import CTASection from '@/components/home/CTASection';

const products = [
  {
    icon: ShoppingCart,
    title: 'Online Platforms',
    description: 'Custom-built online platforms for e-commerce, booking systems, and digital marketplaces. Scalable architecture for high-traffic applications.',
    features: ['E-Commerce Solutions', 'Booking & Reservation Systems', 'Payment Gateway Integration', 'Analytics Dashboard'],
    status: 'Available',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Building2,
    title: 'Marketplaces',
    description: 'Multi-vendor marketplace platforms connecting buyers and sellers. Complete with vendor management, commission systems, and dispute resolution.',
    features: ['Multi-Vendor Support', 'Commission Management', 'Review & Rating System', 'Vendor Analytics'],
    status: 'Available',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Network,
    title: 'Aggregator Systems',
    description: 'Comprehensive aggregator platforms for services, products, or content. Unified dashboards with powerful search and filtering capabilities.',
    features: ['Data Aggregation', 'Advanced Search & Filters', 'Comparison Tools', 'API Integrations'],
    status: 'Available',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Settings,
    title: 'Custom Enterprise Software',
    description: 'Bespoke enterprise solutions tailored to your specific business processes. ERP, CRM, HRM, and specialized industry applications.',
    features: ['ERP Systems', 'CRM Solutions', 'Workflow Automation', 'Business Intelligence'],
    status: 'Custom Build',
    color: 'from-green-500 to-emerald-500',
  },
];

const Products = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            badge="Our Products"
            title={
              <>
                Powerful <span className="gradient-text">Digital Platforms</span> & Solutions
              </>
            }
            description="Ready-to-deploy and customizable software products designed to accelerate your digital transformation journey."
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <GlassCard
                key={product.title}
                className={`group animate-fade-in-up delay-${Math.min((index + 1) * 100, 400)}`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <product.icon className="w-8 h-8 text-white" />
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        product.status === 'Available'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold mb-4">{product.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <GlassCard className="text-center py-12 md:py-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Need a <span className="gradient-text">Custom Solution</span>?
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              We specialize in building tailored software solutions that perfectly fit your unique business requirements.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              Discuss Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </GlassCard>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Products;
