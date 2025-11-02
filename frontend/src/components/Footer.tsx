export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8" style={{ backgroundColor: '#2C5282' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-white text-sm sm:text-base">
            © {currentYear} Bombay Lab | All Rights Reserved
          </p>
          <p className="text-white/80 text-xs sm:text-sm mt-2">
            Analytical and Metallurgical Testing Laboratory
          </p>
        </div>
      </div>
    </footer>
  );
}
