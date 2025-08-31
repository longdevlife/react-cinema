import React from "react";
import { useInView } from "react-intersection-observer";

const Section = ({ children, titleSection, subtitle, bgColor = "bg-white" }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className={`py-20 ${bgColor} relative overflow-hidden`}>
      {/* Enhanced Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
        >
          {/* Enhanced Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {titleSection}
          </h2>
          
          {/* Subtitle if provided */}
          {subtitle && (
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          
          {/* Enhanced Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-red-500 rounded-full"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
          </div>
        </div>
        
        {/* Content with stagger animation */}
        <div 
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {children}
        </div>
      </div>

      {/* Bottom gradient for seamless section transitions */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
    </section>
  );
};

export default Section;