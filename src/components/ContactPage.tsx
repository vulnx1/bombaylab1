import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

export function ContactPage() {
  const contactDetails = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '26, 1st Floor, Vishnu Industrial Estate, Masrani Lane, Halav Pool, Kurla (W), Mumbai – 400 070',
      link: 'https://www.google.com/maps/search/?api=1&query=Vishnu+Industrial+Estate+Kurla+Mumbai',
      iconColor: '#EA4335',
      bgColor: 'rgba(234, 67, 53, 0.1)',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '022 – 2503 8842\n9869534396\n9004370942',
      link: 'tel:+912225038842',
      iconColor: '#4285F4',
      bgColor: 'rgba(66, 133, 244, 0.1)',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'bombaylab.vishwakarma@gmail.com',
      link: 'mailto:bombaylab.vishwakarma@gmail.com',
      iconColor: '#EA4335',
      bgColor: 'rgba(234, 67, 53, 0.1)',
    },
    {
      icon: Clock,
      title: 'Established',
      content: 'Since 2003\nTrusted for 20+ Years',
      link: null,
      iconColor: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
  ];

  const quickActions = [
    {
      title: 'WhatsApp Chat',
      description: 'Instant messaging support',
      icon: MessageCircle,
      color: '#25D366',
      link: 'https://wa.me/919869534396',
    },
    {
      title: 'Call Now',
      description: 'Speak with our team',
      icon: Phone,
      color: '#4285F4',
      link: 'tel:+919869534396',
    },
    {
      title: 'Email Support',
      description: 'Send us your queries',
      icon: Mail,
      color: '#EA4335',
      link: 'mailto:bombaylab.vishwakarma@gmail.com',
    },
    {
      title: 'Get Directions',
      description: 'Navigate to our lab',
      icon: MapPin,
      color: '#34A853',
      link: 'https://www.google.com/maps/search/?api=1&query=Vishnu+Industrial+Estate+Kurla+Mumbai',
    },
  ];

  return (
    <div className="pt-20" style={{ backgroundColor: '#718096' }}>
      {/* Hero Banner */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758873263428-f4b2edb45fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc3RlZWwlMjBwcmVjaXNpb258ZW58MXx8fHwxNzYxNjU3NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Contact Us"
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
              Get In Touch
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto">
              We're here to answer your questions and support your testing needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl mb-4 font-poppins text-white">
              Quick Actions
            </h2>
            <p className="text-lg text-white/90">
              Choose your preferred way to connect with us
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {quickActions.map((action, index) => (
              <motion.a
                key={action.title}
                href={action.link}
                target={action.link.startsWith('http') ? '_blank' : undefined}
                rel={action.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: '#E2E8F0' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg"
                  style={{ backgroundColor: action.color }}
                >
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-2 font-poppins" style={{ color: '#2C5282' }}>
                  {action.title}
                </h3>
                <p className="text-sm" style={{ color: '#212529' }}>
                  {action.description}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: detail.bgColor }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg"
                  style={{ backgroundColor: detail.iconColor }}
                >
                  <detail.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-3 font-poppins" style={{ color: '#2C5282' }}>
                  {detail.title}
                </h3>
                {detail.link ? (
                  <a
                    href={detail.link}
                    target={detail.link.startsWith('http') ? '_blank' : undefined}
                    rel={detail.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="hover:underline whitespace-pre-line"
                    style={{ color: '#212529' }}
                  >
                    {detail.content}
                  </a>
                ) : (
                  <p className="whitespace-pre-line" style={{ color: '#212529' }}>
                    {detail.content}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: '#E2E8F0' }}
          >
            <div className="p-6 sm:p-8 text-center" style={{ backgroundColor: '#2C5282' }}>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#34A853' }}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-poppins text-white">
                  Our Location
                </h2>
              </div>
              <p className="text-white/90">
                Visit us at our laboratory in Kurla, Mumbai
              </p>
            </div>

            {/* Google Map Embed */}
            <div className="h-96 lg:h-[500px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bombay Lab Location"
              />
            </div>

            <div className="p-6 sm:p-8 text-center">
              <Button
                onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Vishnu+Industrial+Estate+Kurla+Mumbai', '_blank')}
                size="lg"
                className="text-white hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#34A853' }}
              >
                <MapPin className="mr-2" />
                Get Directions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Hours & Info */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl shadow-2xl p-8 sm:p-12 text-center"
            style={{ backgroundColor: '#E2E8F0' }}
          >
            <h2 className="text-3xl sm:text-4xl mb-4 font-poppins" style={{ color: '#2C5282' }}>
              Bombay Lab
            </h2>
            <p className="text-xl mb-2" style={{ color: '#212529' }}>
              Analytical and Metallurgical Testing Laboratory
            </p>
            <p className="text-lg mb-6" style={{ color: '#212529' }}>
              Established 2003 | Trusted by Industries Nationwide
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="px-6 py-3 rounded-full" style={{ backgroundColor: '#4B7BE5' }}>
                <span className="text-white">ISO Certified</span>
              </div>
              <div className="px-6 py-3 rounded-full" style={{ backgroundColor: '#10B981' }}>
                <span className="text-white">20+ Years Experience</span>
              </div>
              <div className="px-6 py-3 rounded-full" style={{ backgroundColor: '#F59E0B' }}>
                <span className="text-white">Trusted Partner</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
