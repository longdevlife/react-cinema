import React from "react";

const Section = ({ children, titleSection }) => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            {titleSection}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded-full"></div>
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Section;