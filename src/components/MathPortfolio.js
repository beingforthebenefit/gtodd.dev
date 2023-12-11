import React from 'react';
import dissertationPdf from '../documents/gerald-todd-dissertation.pdf'; // Adjust the path as needed
import dissertationImage from '../images/gerald-todd-dissertation.svg';

function MathPortfolio() {
  return (
    <section id="mathematical-journey" className="py-12 bg-gray-800 text-white" data-aos="fade-up">
      <div className="container mx-auto px-6">
        <a href={dissertationPdf} target="_blank" rel="noopener noreferrer">
            <img src={dissertationImage} alt="Mathematical Concepts" className="float-right ml-6 mb-4 w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-lg bg-white"/>
        </a>
        <h2 className="text-3xl font-bold text-center mb-8">My Mathematical Journey</h2>

        <div className="flex flex-col md:flex-row">
          <div className="md:flex-1 text-lg text-gray-300">
            <p>
              My academic path in mathematics has been a thrilling adventure, rooted in a deep passion for combinatorics and the intricate beauty of mathematical patterns. One of my greatest inspirations has been the legendary mathematician Leonard Euler, whose profound contributions have left an indelible mark on the field.
            </p>
          
            <p>
                At the University of Montana, Missoula, I pursued a Master's in Combinatorics & Optimization and Applied Mathematics & Analysis. This period was marked by intense research and exploration, culminating in my dissertation on "Automorphism Groups and the Fixing Number of the Dowling Geometry."
            </p>

            <p>
                As an instructor at the University of Montana, I had the privilege of teaching a range of subjects to hundreds of students. This experience was not only about imparting knowledge but also about kindling a curiosity and appreciation for mathematics in others.
            </p>

            <div className="mt-4">
                <a href={dissertationPdf} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition">
                Read My Dissertation
                </a>
            </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default MathPortfolio;
