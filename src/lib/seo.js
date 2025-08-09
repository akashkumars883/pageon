// SEO utilities for PageOn - Optimized for Indian market

export const seoConfig = {
  defaultTitle: "PageOn - Best Website Builder for Small Businesses in India",
  titleTemplate: "%s | PageOn - India's #1 Website Builder",
  defaultDescription: "Create stunning business websites in India with PageOn - No coding required! Perfect for Indian small businesses, startups, local services. Get online in 2 minutes with mobile-optimized, SEO-friendly websites.",
  siteUrl: "https://pageon.in",
  ogImage: "/og-image.jpg",
  twitterHandle: "@PageOnIndia",
};

// Indian city-specific SEO data
export const indianCities = {
  mumbai: {
    name: "Mumbai",
    title: "Website Builder for Mumbai Businesses | PageOn India",
    description: "Create professional websites for your Mumbai business. Perfect for local shops, restaurants, services in Mumbai. Mobile-optimized, SEO-friendly websites in minutes.",
    keywords: ["website builder Mumbai", "Mumbai business website", "local website Mumbai", "small business Mumbai"]
  },
  delhi: {
    name: "Delhi",
    title: "Website Builder for Delhi Businesses | PageOn India",
    description: "Build stunning websites for Delhi businesses. From Connaught Place to Karol Bagh, help your Delhi business get online in 2 minutes.",
    keywords: ["website builder Delhi", "Delhi business website", "local website Delhi", "small business Delhi"]
  },
  bangalore: {
    name: "Bangalore",
    title: "Website Builder for Bangalore Businesses | PageOn India",
    description: "Create modern websites for Bangalore startups and businesses. Perfect for tech companies, local services in Silicon Valley of India.",
    keywords: ["website builder Bangalore", "Bangalore business website", "startup website Bangalore", "tech business Bangalore"]
  },
  chennai: {
    name: "Chennai",
    title: "Website Builder for Chennai Businesses | PageOn India",
    description: "Professional websites for Chennai businesses. From T. Nagar shops to IT services, get your Chennai business online quickly.",
    keywords: ["website builder Chennai", "Chennai business website", "local website Chennai", "small business Chennai"]
  },
  hyderabad: {
    name: "Hyderabad",
    title: "Website Builder for Hyderabad Businesses | PageOn India",
    description: "Build beautiful websites for Hyderabad businesses. Perfect for local services, restaurants, and IT companies in Cyberabad.",
    keywords: ["website builder Hyderabad", "Hyderabad business website", "local website Hyderabad", "IT business Hyderabad"]
  },
  pune: {
    name: "Pune",
    title: "Website Builder for Pune Businesses | PageOn India",
    description: "Create professional websites for Pune businesses. From traditional shops to modern startups, get online in minutes.",
    keywords: ["website builder Pune", "Pune business website", "local website Pune", "startup website Pune"]
  }
};

// Indian business type SEO data
export const indianBusinessTypes = {
  restaurants: {
    title: "Restaurant Website Builder India | Menu, Online Orders | PageOn",
    description: "Create stunning restaurant websites in India. Perfect for dhabas, cafes, fine dining. Add menus, online ordering, delivery info. Mobile-optimized for Indian food businesses.",
    keywords: ["restaurant website India", "food business website", "menu website India", "online ordering website", "dhaba website", "cafe website India"]
  },
  retail: {
    title: "Retail Store Website Builder India | E-commerce | PageOn",
    description: "Build professional retail websites in India. Perfect for clothing stores, electronics shops, kirana stores. Showcase products, contact info, store hours.",
    keywords: ["retail website India", "shop website builder", "store website India", "kirana store website", "clothing store website", "electronics shop website"]
  },
  services: {
    title: "Service Business Website Builder India | Local Services | PageOn",
    description: "Create professional websites for service businesses in India. Perfect for salons, repairs, consultants, home services. Show services, contact, booking.",
    keywords: ["service business website India", "salon website India", "repair service website", "consultant website India", "home service website", "local service website"]
  },
  healthcare: {
    title: "Healthcare Website Builder India | Doctors, Clinics | PageOn",
    description: "Professional healthcare websites in India. Perfect for doctors, clinics, Ayurvedic practitioners, dental clinics. Show services, timings, contact.",
    keywords: ["doctor website India", "clinic website builder", "healthcare website India", "medical website", "Ayurvedic website", "dental clinic website"]
  },
  education: {
    title: "Education Website Builder India | Schools, Coaching | PageOn",
    description: "Create educational websites in India. Perfect for schools, coaching institutes, tutors, online classes. Show courses, admissions, contact.",
    keywords: ["school website India", "coaching website builder", "education website India", "tutor website", "institute website", "online classes website"]
  }
};

// Generate structured data for business
export const generateBusinessStructuredData = (business) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": business.name,
  "description": business.description,
  "url": business.website || `https://pageon.in/${business.slug}`,
  "telephone": business.phone,
  "email": business.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": business.address,
    "addressCountry": "IN"
  },
  "geo": business.coordinates && {
    "@type": "GeoCoordinates",
    "latitude": business.coordinates.lat,
    "longitude": business.coordinates.lng
  },
  "openingHours": business.hours || "Mo-Su 09:00-21:00",
  "priceRange": business.priceRange || "₹₹",
  "paymentAccepted": ["Cash", "UPI", "Card", "Net Banking"],
  "currenciesAccepted": "INR"
});

// Generate FAQ structured data
export const generateFAQStructuredData = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Common Indian business FAQs
export const indianBusinessFAQs = [
  {
    question: "How quickly can I create a website for my Indian business?",
    answer: "With PageOn, you can create a professional website for your Indian business in just 2 minutes. Simply provide your business details through WhatsApp, and we'll build your mobile-optimized website instantly."
  },
  {
    question: "Do I need technical knowledge to use PageOn?",
    answer: "No technical knowledge required! PageOn is designed specifically for Indian small business owners. We handle all the technical aspects including hosting, domain setup, and SSL certificates."
  },
  {
    question: "Can I add Indian payment methods to my website?",
    answer: "Yes! PageOn websites support popular Indian payment methods including UPI, PhonePe, Google Pay, Paytm, and traditional banking options. Perfect for Indian customers."
  },
  {
    question: "Is PageOn suitable for traditional Indian businesses?",
    answer: "Absolutely! PageOn works great for all types of Indian businesses - from traditional family shops and kirana stores to modern startups and service providers."
  },
  {
    question: "Do you provide support in Hindi and other Indian languages?",
    answer: "Yes! We provide customer support in both Hindi and English to help Indian business owners. Our team understands the unique needs of Indian businesses."
  },
  {
    question: "How much does it cost to build a website with PageOn?",
    answer: "PageOn offers a free forever plan to get you started. Our paid plans start from just ₹299/month with advanced features like custom domains and enhanced SEO for Indian markets."
  }
];

// SEO meta tags generator
export const generateSEOTags = (page, customData = {}) => {
  const baseUrl = seoConfig.siteUrl;
  const title = customData.title || seoConfig.defaultTitle;
  const description = customData.description || seoConfig.defaultDescription;
  const keywords = customData.keywords || [];
  const image = customData.image || seoConfig.ogImage;
  const url = `${baseUrl}${page === '/' ? '' : page}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    canonical: url,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_IN',
      siteName: 'PageOn'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${image}`],
      creator: seoConfig.twitterHandle
    }
  };
};
