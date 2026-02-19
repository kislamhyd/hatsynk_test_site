import { ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

export function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Let's discuss how we can help you build scalable, secure, and innovative software solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton
                href="/contact"
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 border-0"
              >
                Start Your Project <ArrowRight className="w-5 h-5" />
              </GradientButton>
              <GradientButton
                href="/services"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Explore Solutions
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
