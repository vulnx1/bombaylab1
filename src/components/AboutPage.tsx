import { motion } from 'motion/react';
import { Award, Users, Target, TrendingUp, CheckCircle2, Zap, Globe, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutPage() {
  const features = [
    {
      icon: Award,
      title: '20+ Years',
      description: 'Of Excellence',
      color: '#4B7BE5',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Certified Analysts',
      color: '#10B981',
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Accurate Results',
      color: '#F59E0B',
    },
    {
      icon: TrendingUp,
      title: 'Trusted',
      description: 'By Industries',
      color: '#EF4444',
    },
  ];

  const values = [
    {
      icon: CheckCircle2,
      title: 'Quality Assurance',
      description: 'Rigorous testing protocols and certified methodologies',
      color: '#10B981',
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Quick and reliable test results without compromising accuracy',
      color: '#F59E0B',
    },
    {
      icon: Globe,
      title: 'Industry Standards',
      description: 'Compliance with national and international testing standards',
      color: '#4B7BE5',
    },
    {
      icon: Heart,
      title: 'Customer Focused',
      description: 'Dedicated support and personalized service for every client',
      color: '#EF4444',
    },
  ];

  return (
    <div className="pt-20" style={{ backgroundColor: '#718096' }}>
      {/* Hero Banner */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1630959300489-63dae3a8240a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwYW5hbHlzaXMlMjBtaWNyb3Njb3BlfGVufDF8fHx8MTc2MTY1NzQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Laboratory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 font-poppins text-white">
              About Bombay Lab
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto">
              Two Decades of Scientific Excellence and Integrity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 mb-12" style={{ backgroundColor: '#E2E8F0' }}>
              <h2 className="text-3xl sm:text-4xl mb-6 font-poppins" style={{ color: '#2C5282' }}>
                Our Story
              </h2>
              
              <div className="space-y-6 text-base sm:text-lg" style={{ color: '#212529' }}>
                <p className="leading-relaxed">
                  Founded in <strong>2003</strong> by <strong>Mr. Chhotelal B. Vishwakarma</strong>, Bombay Lab emerged from a vision to provide uncompromising quality in analytical testing. What started as a small laboratory has grown into a trusted name in chemical and metallurgical analysis across India.
                </p>
                <p className="leading-relaxed">
                  Bombay Lab specializes in the comprehensive analysis of <strong>metals, minerals, oxides, ceramics, and refractories</strong>. Our state-of-the-art facility is equipped with advanced instrumentation and operated by a team of highly qualified analysts dedicated to delivering precise, reliable results.
                </p>
                <p className="leading-relaxed">
                  With over <strong>two decades of experience</strong>, we have built lasting partnerships with industrial manufacturers, research institutions, and academic organizations. Our commitment to scientific integrity, timely delivery, and customer satisfaction has made us the preferred choice for quality assurance and research testing.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: feature.color }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-poppins mb-1" style={{ color: '#2C5282' }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm" style={{ color: '#212529' }}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Our Values */}
            <div className="rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16" style={{ backgroundColor: '#E2E8F0' }}>
              <h2 className="text-3xl sm:text-4xl mb-8 text-center font-poppins" style={{ color: '#2C5282' }}>
                Our Core Values
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-4 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: value.color }}
                    >
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl mb-2 font-poppins" style={{ color: '#2C5282' }}>
                        {value.title}
                      </h3>
                      <p style={{ color: '#212529' }}>{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
