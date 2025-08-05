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
    title: "Local Services",
    description: "Salons, plumbers, repair services, tutors, and more.",
  },
  {
    icon: <Utensils className="w-6 h-6 text-white" />,
    title: "Food Businesses",
    description: "Restaurants, cloud kitchens, home chefs, bakers, etc.",
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    title: "Retail & E-commerce",
    description: "Boutiques, mobile stores, grocery shops, and more.",
  },
  {
    icon: <Heart className="w-6 h-6 text-white" />,
    title: "Health & Wellness",
    description: "Doctors, yoga instructors, physiotherapists, etc.",
  },
  {
    icon: <UserCheck className="w-6 h-6 text-white" />,
    title: "Freelancers & Creators",
    description: "Photographers, designers, developers, and coaches.",
  },
  {
    icon: <Music className="w-6 h-6 text-white" />,
    title: "Creative Businesses",
    description: "Event planners, musicians, makeup artists, and more.",
  },
];

export default function BusinessType() {
  return (
    <section className="py-16 bg-gray-50" id="who-pageon-is-for">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Who is Pageon For?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Pageon is built for small and local businesses who want a professional
          website quickly—without any coding or design skills.
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
