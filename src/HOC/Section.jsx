import React from "react";

// các component luôn luôn có props là children
const Section = ({ children, titleSection }) => {
  return (
    <div className="mt-12">
      <h3 className="text-3xl font-bold text-center mb-3">{titleSection}</h3>

      {children}
    </div>
  );
};

export default Section;
