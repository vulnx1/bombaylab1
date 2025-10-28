import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const metalsTests = [
    {
      title: 'Spectroscopy Analysis',
      description: 'Advanced optical emission and X-ray fluorescence spectroscopy for precise elemental composition',
      image: 'https://images.unsplash.com/photo-1693932038683-7c35401f5307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjdHJvc2NvcHklMjBhbmFseXNpcyUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzYxNjU4ODIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#4B7BE5',
    },
    {
      title: 'Gravimetric Methods',
      description: 'High-precision weighing techniques for accurate determination of metal content and composition',
      image: 'https://images.unsplash.com/photo-1627817471035-3333a9ece240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF2aW1ldHJpYyUyMGxhYm9yYXRvcnklMjBzY2FsZXxlbnwxfHx8fDE3NjE2NTg4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#10B981',
    },
    {
      title: 'Wet Chemical Analysis',
      description: 'Traditional titration and colorimetric methods for reliable chemical composition analysis',
      image: 'https://images.unsplash.com/photo-1575467678971-7cd5c2937dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMGFuYWx5c2lzJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NjE2NDQxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#F59E0B',
    },
    {
      title: 'Alloy Composition Testing',
      description: 'Comprehensive testing of steel alloys, non-ferrous metals, and specialty alloy materials',
      image: 'https://images.unsplash.com/photo-1575305842946-0e807ce6f3fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGFsbG95JTIwdGVzdGluZ3xlbnwxfHx8fDE3NjE2NTg4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#8B5CF6',
    },
    {
      title: 'Metallic Salts Analysis',
      description: 'Detailed chemical analysis of metallic salts, compounds, and industrial chemicals',
      image: 'https://images.unsplash.com/photo-1760651913970-98e38bd28f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbGxpYyUyMHNhbHRzJTIwY2hlbWlzdHJ5fGVufDF8fHx8MTc2MTY1ODgyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#EC4899',
    },
    {
      title: 'Steel Grade Verification',
      description: 'Verification and certification of steel grades according to international standards',
      image: 'https://images.unsplash.com/photo-1760378105099-968c06b9b4bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMG1hbnVmYWN0dXJpbmclMjBxdWFsaXR5fGVufDF8fHx8MTc2MTY1ODgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#EF4444',
    },
  ];

  const mineralsTests = [
    {
      title: 'Ash Residue Analysis',
      description: 'Precise determination of ash content and residue composition in mineral samples',
      image: 'https://images.unsplash.com/photo-1574020115486-070f11927af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2glMjByZXNpZHVlJTIwYW5hbHlzaXN8ZW58MXx8fHwxNzYxNjU4ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#6366F1',
    },
    {
      title: 'Oxide Content Testing',
      description: 'Comprehensive analysis of oxide minerals and their chemical composition',
      image: 'https://images.unsplash.com/photo-1562411403-f583472c8e87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxveGlkZSUyMG1pbmVyYWwlMjB0ZXN0aW5nfGVufDF8fHx8MTc2MTY1ODgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#14B8A6',
    },
    {
      title: 'Ceramic Material Analysis',
      description: 'Testing of ceramic materials for composition, purity, and quality control',
      image: 'https://images.unsplash.com/photo-1673436765927-2c94b9705f5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwbWF0ZXJpYWwlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc2MTY1ODgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#F59E0B',
    },
    {
      title: 'Refractory Testing',
      description: 'Analysis of refractory materials for heat resistance and chemical stability',
      image: 'https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZyYWN0b3J5JTIwbWF0ZXJpYWwlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2MTY1ODgyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#F97316',
    },
    {
      title: 'Mineral Composition',
      description: 'Detailed geological and chemical analysis of mineral samples',
      image: 'https://images.unsplash.com/photo-1694827892434-959b93b06aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lcmFsJTIwY29tcG9zaXRpb24lMjBnZW9sb2d5fGVufDF8fHx8MTc2MTY1ODgyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#8B5CF6',
    },
    {
      title: 'Ore Grade Analysis',
      description: 'Accurate determination of ore quality and metal content for mining operations',
      image: 'https://images.unsplash.com/photo-1647485938389-91df46750f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmUlMjBncmFkZSUyMG1pbmluZ3xlbnwxfHx8fDE3NjE2NTg4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#06B6D4',
    },
  ];

  return (
    <div className="pt-20" style={{ backgroundColor: '#718096' }}>
      {/* Hero Banner */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1627704671340-0969d7dbac25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbGx1cmd5JTIwbGFib3JhdG9yeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjE2NTc0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Laboratory Equipment"
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
              Our Testing Services
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto">
              Comprehensive analytical solutions for metals, minerals, and materials
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metals Testing Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-6 py-2 rounded-full mb-4" style={{ backgroundColor: '#4B7BE5' }}>
              <span className="text-white">Metals Department</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 font-poppins text-white">
              Metals Testing Services
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Advanced metallurgical analysis for steel, alloys, and metallic compounds
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {metalsTests.map((test, index) => (
              <motion.div
                key={test.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none group">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={test.image}
                      alt={test.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: test.color }}
                    >
                      <span className="text-white">✓</span>
                    </div>
                  </div>
                  <CardHeader style={{ backgroundColor: '#E2E8F0' }}>
                    <CardTitle className="font-poppins" style={{ color: '#2C5282' }}>
                      {test.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent style={{ backgroundColor: '#E2E8F0', color: '#212529' }}>
                    <p>{test.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minerals Testing Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-6 py-2 rounded-full mb-4" style={{ backgroundColor: '#10B981' }}>
              <span className="text-white">Minerals Department</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 font-poppins text-white">
              Minerals & Ores Testing
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Specialized testing for minerals, ceramics, and refractory materials
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mineralsTests.map((test, index) => (
              <motion.div
                key={test.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none group">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={test.image}
                      alt={test.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: test.color }}
                    >
                      <span className="text-white">✓</span>
                    </div>
                  </div>
                  <CardHeader style={{ backgroundColor: '#E2E8F0' }}>
                    <CardTitle className="font-poppins" style={{ color: '#2C5282' }}>
                      {test.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent style={{ backgroundColor: '#E2E8F0', color: '#212529' }}>
                    <p>{test.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 sm:p-12 text-center shadow-2xl"
            style={{ backgroundColor: '#E2E8F0' }}
          >
            <h2 className="text-3xl sm:text-4xl mb-4 font-poppins" style={{ color: '#2C5282' }}>
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#212529' }}>
              Submit your sample today and receive accurate, reliable test results
            </p>
            <Button
              onClick={() => onNavigate('submit')}
              size="lg"
              className="group text-white hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
              style={{ backgroundColor: '#4B7BE5' }}
            >
              Submit Your Sample
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
