import { motion } from 'framer-motion';
import { Hero } from './Hero';
import { Button } from './ui/button';
import { ChevronRight, Award, Target, Microscope, Shield } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const highlights = [
    {
      icon: Award,
      title: '20+ Years',
      description: 'Industry Experience',
      color: '#4B7BE5',
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Accurate Testing',
      color: '#10B981',
    },
    {
      icon: Microscope,
      title: 'Advanced',
      description: 'Technology',
      color: '#F59E0B',
    },
    {
      icon: Shield,
      title: 'Trusted',
      description: 'Certified Lab',
      color: '#EF4444',
    },
  ];

  return (
    <>
      <Hero onNavigate={onNavigate} />
      
      {/* Quick Overview Section */}
      <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: '#718096' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 font-poppins text-white">
              Why Choose Bombay Lab?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Your trusted partner in analytical and metallurgical testing since 2003
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: '#E2E8F0' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-2 font-poppins" style={{ color: '#2C5282' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#212529' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button
              onClick={() => onNavigate('services')}
              size="lg"
              className="group text-white hover:shadow-xl transition-all duration-300 text-base sm:text-lg px-8 py-6"
              style={{ backgroundColor: '#4B7BE5' }}
            >
              Explore Our Services
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => onNavigate('about')}
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-8 py-6 bg-white hover:bg-white/90"
              style={{ borderColor: '#4B7BE5', color: '#2C5282' }}
            >
              Learn More About Us
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
