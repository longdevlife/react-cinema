import React from "react";

// các component luôn luôn có props là children
const Section = ({ children, titleSection }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">
          {titleSection}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
