import {
  Briefcase,
  Utensils,
  ShoppingBag,
  Heart,
  UserCheck,
  Music,
} from "lucide-react";

const businessTypes = [
  {
    icon: <Briefcase className="w-6 h-6 text-white" />,
    title: "Local Services in India",
    description: "Beauty parlours, AC repair, plumbing, home tutoring, pest control, and local maintenance services across Indian cities.",
  },
  {
    icon: <Utensils className="w-6 h-6 text-white" />,
    title: "Indian Food Businesses",
    description: "Restaurants, cloud kitchens, tiffin services, sweet shops, catering, home-made food delivery, and regional cuisine specialists.",
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    title: "Indian Retail & E-commerce",
    description: "Saree shops, mobile stores, kirana stores, jewellery shops, electronics retailers, and online marketplaces.",
  },
  {
    icon: <Heart className="w-6 h-6 text-white" />,
    title: "Health & Wellness",
    description: "Doctors, Ayurvedic practitioners, yoga studios, physiotherapy clinics, dental clinics, and wellness centers.",
  },
  {
    icon: <UserCheck className="w-6 h-6 text-white" />,
    title: "Indian Professionals",
    description: "Wedding photographers, graphic designers, digital marketers, consultants, CA services, and skilled freelancers.",
  },
  {
    icon: <Music className="w-6 h-6 text-white" />,
    title: "Creative & Events",
    description: "Wedding planners, music teachers, dance classes, makeup artists, mehendi artists, and cultural event organizers.",
  },
];

export default function BusinessType() {
  return (
    <section className="py-16 bg-gray-50" id="who-pageon-is-for">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4 sm:px-0">
          Perfect for Every Indian Business Type
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-10 px-4 sm:px-0">
          From traditional family businesses to modern startups, PageOn helps every type of Indian business establish a strong online presence. Join thousands of successful businesses across India.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {businessTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                {type.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
              <p className="text-gray-500 text-sm">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
