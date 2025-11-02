import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

// ✅ Use local images from /public/assets
const heroImages = ["/assets/p1.avif", "/assets/p2.avif", "/assets/p3.jpg", "/assets/p4.jpg"];

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto slideshow every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Preload the next image
  useEffect(() => {
    const nextImage = new Image();
    nextImage.src = heroImages[(currentImageIndex + 1) % heroImages.length];
  }, [currentImageIndex]);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[650px] overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Background slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt={`Hero background ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectFit: "cover" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            loading={currentImageIndex === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </AnimatePresence>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-br from-black/80 via-black/60 to-transparent" />

        {/* Subtle blue glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(75,123,229,0.25),transparent_60%)]" />

        {/* Fade at bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Hero content */}
      <motion.div
        key={currentImageIndex}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6 sm:px-10 max-w-4xl"
      >
        <h1 className="text-white font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight drop-shadow-lg">
          Precision Through Science <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500 animate-pulse">
            and Integrity
          </span>
        </h1>

        <p className="mt-6 text-gray-100 text-lg sm:text-xl md:text-2xl font-open-sans max-w-3xl mx-auto">
          Analytical Testing of Metals, Minerals, Ceramics & Refractories
        </p>

        <p className="mt-2 text-gray-200 text-base sm:text-lg">
          Trusted Since 2003
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => onNavigate("submit")}
            size="lg"
            className="group bg-[#4B7BE5] hover:bg-[#3A68C9] hover:scale-105 text-white text-lg px-8 py-5 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
            aria-label="Submit a Sample"
          >
            Submit a Sample
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            onClick={() => onNavigate("about")}
            size="lg"
            className="group bg-[#4B7BE5] hover:bg-[#3A68C9] hover:scale-105 text-white text-lg px-8 py-5 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
            aria-label="Learn More About Us"
          >
            Learn More
          </Button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
          }}
          className="mt-14 text-white/80 text-sm"
        >
          ↓ Scroll Down
        </motion.div>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
