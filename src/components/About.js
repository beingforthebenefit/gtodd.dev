import React from 'react';
import geraldPic from '../images/gerald-pic.jpg'; // Ensure the path is correct

function About() {
  return (
    <section id="about" className="py-12 bg-gray-900" data-aos="fade-up">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-white">About Me</h2>
            <p className="mt-4 text-gray-300">
              My career goals have always been centered around math, science, technology, and education. After earning degrees in Mathematics, I began working as a full-stack developer, leveraging my programming skills honed through academic pursuits. I'm passionate about continuous learning, evident in my personal projects ranging from iOS development to DIY Raspberry Pi endeavors.
            </p>
            {/* Add more personal bio or professional highlights as needed */}
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <img src={geraldPic} alt="Gerald Todd" className="rounded-lg shadow-lg"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
