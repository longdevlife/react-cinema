import React from "react";
import { useInView } from "react-intersection-observer";

const StatsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    {
      number: "500+",
      label: "Phim Hot",
      icon: "🎬",
      color: "from-red-500 to-pink-500",
    },
    {
      number: "50+",
      label: "Rạp Chiếu",
      icon: "🏢",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "1M+",
      label: "Khách Hàng",
      icon: "👥",
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "99%",
      label: "Hài Lòng",
      icon: "⭐",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center group cursor-pointer transform transition-all duration-500 hover:scale-110 ${
                inView ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                {stat.number}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;