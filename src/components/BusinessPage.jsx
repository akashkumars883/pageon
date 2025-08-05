"use client";
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Star,
  ArrowRight,
  Users,
  Award,
  Clock,
  Shield,
  CheckCircle,
  Eye,
  ZoomIn,
} from "lucide-react";

// Constants
const NAVIGATION_ITEMS = ["home", "about", "services", "gallery", "contact"];

// Custom Hooks
const useScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of NAVIGATION_ITEMS) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { activeSection, scrollToSection };
};

// Components
const NavigationButton = ({ item, isActive, onClick }) => (
  <button
    onClick={() => onClick(item)}
    className={`text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-300 relative hover:text-black ${
      isActive
        ? "text-black after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:bg-black after:w-full"
        : "text-gray-600 hover:text-black"
    }`}
  >
    {item}
  </button>
);

const MobileNavigationItem = ({ item, isActive, onClick }) => (
  <button
    onClick={() => onClick(item)}
    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 capitalize font-medium ${
      isActive
        ? "text-black bg-gray-100"
        : "text-gray-600 hover:bg-gray-50 hover:text-black"
    }`}
  >
    {item}
  </button>
);

const ServiceCard = ({ service, index }) => (
  <div className="group relative bg-white hover:bg-gradient-to-br hover:from-black hover:to-black rounded-xl p-4 sm:p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-gray-100 hover:border-transparent">
    <div className="relative z-10">
      <div className="mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black group-hover:bg-white rounded-lg flex items-center justify-center transition-all duration-300">
          <Star
            className="text-white group-hover:text-black transition-colors duration-300"
            size={16}
          />
        </div>
      </div>
      <h3 className="text-gray-900 group-hover:text-white font-bold text-base sm:text-lg mb-2 transition-colors duration-300 leading-tight">
        {service}
      </h3>
      <p className="text-gray-600 group-hover:text-gray-100 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
        Professional service delivered with expertise and quality.
      </p>
    </div>
  </div>
);

const GalleryItem = ({ image, index, onClick }) => (
  <div
    className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer transition-all duration-300 hover:shadow-lg"
    onClick={() => onClick(image, index)}
  >
    <div className="aspect-square">
      <img
        src={image.url}
        alt={image.title || `Gallery image ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentElement.style.display = "none";
        }}
      />
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ZoomIn className="text-white" size={20} />
      </div>
    </div>
    {image.title && (
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 sm:p-3">
        <p className="text-white text-xs sm:text-sm font-medium truncate">
          {image.title}
        </p>
      </div>
    )}
  </div>
);

const LightboxModal = ({ image, isOpen, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
      >
        <X size={24} />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2"
      >
        <ChevronDown className="rotate-90" size={24} />
      </button>

      <button
        onClick={onNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2"
      >
        <ChevronDown className="-rotate-90" size={24} />
      </button>

      <div className="max-w-full max-h-full px-8 sm:px-12">
        <img
          src={image.url}
          alt={image.title || "Gallery image"}
          className="max-w-full max-h-full object-contain"
        />
        {image.title && (
          <div className="text-center mt-2 sm:mt-4">
            <p className="text-white text-sm sm:text-lg">{image.title}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactForm = ({ whatsappNumber }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!whatsappNumber) {
      alert("WhatsApp number not available.");
      return;
    }

    const phone = whatsappNumber.replace(/\D/g, ""); // clean phone number
    const message = `Hello, my name is ${formData.name}.\nEmail: ${formData.email}\n${formData.message}`;
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-white placeholder-white/70 border-b border-white/30 focus:border-white focus:outline-none transition-colors duration-200 text-sm sm:text-base"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-white placeholder-white/70 border-b border-white/30 focus:border-white focus:outline-none transition-colors duration-200 text-sm sm:text-base"
        required
      />
      <textarea
        name="message"
        placeholder="Tell us about your requirements..."
        rows="4"
        value={formData.message}
        onChange={handleInputChange}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-white placeholder-white/70 border-b border-white/30 focus:border-white focus:outline-none resize-none transition-colors duration-200 text-sm sm:text-base"
        required
      />
      <button
        type="submit"
        className="w-full bg-white text-black hover:bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base"
      >
        Send via WhatsApp
      </button>
    </form>
  );
};

// Main Component
export default function BusinessPage({ business = {} }) {
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { activeSection, scrollToSection } = useScrollNavigation();

  // Close mobile menu when scrolling to section
  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  // Default business data - all content fetched from database
  const businessData = {
    name: "Your Business Name",
    description: "Professional services delivered with excellence and quality",
    address: "123 Business Street, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "contact@yourbusiness.com",
    website: "https://yourbusiness.com",
    whatsapp: "1234567890",
    logo_url: "",
    services: [
      "Web Development",
      "Digital Marketing",
      "SEO Optimization",
      "Brand Strategy",
      "Social Media Management",
      "Content Creation",
      "Graphic Design",
      "E-commerce Solutions",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        title: "Project 1",
      },
      {
        url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400",
        title: "Project 2",
      },
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
        title: "Project 3",
      },
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
        title: "Project 4",
      },
      {
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        title: "Project 5",
      },
      {
        url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400",
        title: "Project 6",
      },
    ],
    ...business,
  };

  // Gallery functionality
  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    if (businessData.gallery && businessData.gallery.length > 0) {
      const nextIndex = (lightboxIndex + 1) % businessData.gallery.length;
      setLightboxIndex(nextIndex);
      setLightboxImage(businessData.gallery[nextIndex]);
    }
  };

  const prevImage = () => {
    if (businessData.gallery && businessData.gallery.length > 0) {
      const prevIndex =
        lightboxIndex === 0
          ? businessData.gallery.length - 1
          : lightboxIndex - 1;
      setLightboxIndex(prevIndex);
      setLightboxImage(businessData.gallery[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg font-medium text-gray-900 truncate">
                {businessData.name || "Business Name"}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {NAVIGATION_ITEMS.map((item) => (
                <NavigationButton
                  key={item}
                  item={item}
                  isActive={activeSection === item}
                  onClick={handleScrollToSection}
                />
              ))}
              <button
                onClick={() => handleScrollToSection("contact")}
                className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 text-xs sm:text-sm"
              >
                <MessageCircle size={14} />
                <span className="hidden sm:inline">Contact</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <MobileNavigationItem
                  key={item}
                  item={item}
                  isActive={activeSection === item}
                  onClick={handleScrollToSection}
                />
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative pt-14 sm:pt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>

        {/* Simple dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #374151 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight px-2">
              {businessData.name || "Your Business Name"}
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              {businessData.description ||
                "Professional services delivered with excellence"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 px-4">
              <button
                onClick={() => handleScrollToSection("services")}
                className="bg-black text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base"
              >
                Our Services
              </button>
              <button
                onClick={() => handleScrollToSection("contact")}
                className="border-2 border-black text-black px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-300 text-sm sm:text-base"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              About Us
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 px-2">
              {businessData.description ||
                "We are committed to providing exceptional services with quality and reliability."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-3 sm:p-4">
                <CheckCircle
                  className="mx-auto mb-2 sm:mb-3 text-black"
                  size={28}
                />
                <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  Quality Service
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Committed to excellence
                </p>
              </div>
              <div className="text-center p-3 sm:p-4">
                <Users className="mx-auto mb-2 sm:mb-3 text-black" size={28} />
                <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  Expert Team
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Skilled professionals
                </p>
              </div>
              <div className="text-center p-3 sm:p-4">
                <Clock className="mx-auto mb-2 sm:mb-3 text-black" size={28} />
                <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  Reliable Support
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Always available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {businessData.services && businessData.services.length > 0 && (
        <section id="services" className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Our Services
              </h2>
              <p className="text-base sm:text-lg text-gray-600 px-2">
                Professional services tailored to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
              {businessData.services
                .slice(0, showAllServices ? businessData.services.length : 6)
                .map((service, index) => (
                  <ServiceCard key={index} service={service} index={index} />
                ))}
            </div>

            {businessData.services.length > 6 && (
              <div className="text-center mt-6 sm:mt-8">
                <button
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base"
                >
                  <span>
                    {showAllServices
                      ? "Show Less"
                      : `View All ${businessData.services.length} Services`}
                  </span>
                  {showAllServices ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {businessData.gallery && businessData.gallery.length > 0 && (
        <section id="gallery" className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Gallery
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Take a look at our work
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 max-w-7xl mx-auto">
              {businessData.gallery
                .slice(0, showAllGallery ? businessData.gallery.length : 8)
                .map((image, index) => (
                  <GalleryItem
                    key={index}
                    image={image}
                    index={index}
                    onClick={openLightbox}
                  />
                ))}
            </div>

            {businessData.gallery.length > 8 && (
              <div className="text-center mt-6 sm:mt-8">
                <button
                  onClick={() => setShowAllGallery(!showAllGallery)}
                  className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base"
                >
                  <span>
                    {showAllGallery
                      ? "Show Less"
                      : `View All ${businessData.gallery.length} Images`}
                  </span>
                  {showAllGallery ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-8 sm:py-10 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto bg-white/10 px-4 sm:px-8 lg:px-12 py-6 sm:py-8 rounded-lg">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Get In Touch
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                Ready to work with us? Send us your enquiry
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Contact Information
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {businessData.address && (
                    <div className="flex items-start space-x-3">
                      <MapPin size={18} className="mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base break-words">
                        {businessData.address}
                      </span>
                    </div>
                  )}
                  {businessData.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone size={18} className="flex-shrink-0" />
                      <a
                        href={`tel:${businessData.phone}`}
                        className="hover:text-gray-300 text-sm sm:text-base"
                      >
                        {businessData.phone}
                      </a>
                    </div>
                  )}
                  {businessData.email && (
                    <div className="flex items-center space-x-3">
                      <Mail size={18} className="flex-shrink-0" />
                      <a
                        href={`mailto:${businessData.email}`}
                        className="hover:text-gray-300 text-sm sm:text-base break-all"
                      >
                        {businessData.email}
                      </a>
                    </div>
                  )}
                  {businessData.website && (
                    <div className="flex items-center space-x-3">
                      <Globe size={18} className="flex-shrink-0" />
                      <a
                        href={businessData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300 text-sm sm:text-base break-all"
                      >
                        {businessData.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <ContactForm whatsappNumber={businessData.whatsapp} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        image={lightboxImage}
        isOpen={!!lightboxImage}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                {businessData.name || "Business Name"}
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                {businessData.description || "Professional services"}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                Quick Links
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleScrollToSection(item)}
                      className="text-neutral-400 hover:text-white text-sm sm:text-base capitalize transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <div className="space-y-2">
                {businessData.address && (
                  <>
                    <iframe
                      title="Google Map"
                      width="100%"
                      height="280"
                      frameBorder="0"
                      style={{ border: 0, borderRadius: "0.5rem" }}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        businessData.address
                      )}&output=embed`}
                      allowFullScreen
                    ></iframe>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-600 pt-4 sm:pt-6 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-neutral-400 text-xs sm:text-sm">
                © {new Date().getFullYear()}{" "}
                {businessData.name || "Business Name"}. All rights reserved.
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Powered by{" "}
                <span className="text-white font-medium">PageOn</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
