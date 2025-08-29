import React from "react";

// các component luôn luôn có props là children
const Section = ({ children, titleSection }) => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-red-600 to-purple-600 bg-clip-text text-transparent">
            {titleSection}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
