import React from 'react';
import iosThemerImage from '../images/ios-themer.png';
import perfectMediaServerImage from '../images/overseerr.webp';
import magicMirrorImage from '../images/magicmirror.jpg';
import tikzDocumentImage from '../images/tikz-document.png';

function DevProjects() {
  return (
    <section id="devprojects" className="py-12 bg-gray-900" data-aos="fade-up">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-8">My Projects</h2>
        
        {/* iOS Theming Engine */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 p-4">
              <img src={iosThemerImage} alt="iOS Theming Engine" className="rounded-lg shadow-lg"/>
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
              <h3 className="text-2xl font-bold text-white">iOS Theming Engine</h3>
              <p className="mt-2 text-gray-400">A free Open Source theming engine for iOS devices...</p>
              <a href="https://github.com/beingforthebenefit/iOS-Themer" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">View on GitHub</a>
            </div>
          </div>
        </div>

        {/* Perfect Media Server */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 p-4 order-2 md:order-1">
              <h3 className="text-2xl font-bold text-white">Perfect Media Server</h3>
              <p className="mt-2 text-gray-400">A self-hosted media server using Free and Open Source Software...</p>
              <a href="https://github.com/beingforthebenefit/PerfectMediaServer" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">View on GitHub</a>
            </div>
            <div className="w-full md:w-1/2 p-4 order-1 md:order-2">
              <img src={perfectMediaServerImage} alt="Perfect Media Server" className="rounded-lg shadow-lg"/>
            </div>
          </div>
        </div>

        {/* Magic Mirror & Digital Photo Frame */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 p-4">
              <img src={magicMirrorImage} alt="Magic Mirror" className="rounded-lg shadow-lg"/>
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
              <h3 className="text-2xl font-bold text-white">Magic Mirror & Digital Photo Frame</h3>
              <p className="mt-2 text-gray-400">Raspberry Pi-powered projects including a Magic Mirror...</p>
              {/* Optionally, add more description or links */}
            </div>
          </div>
        </div>

        {/* TikZ Graphs Package Tutorial */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 p-4 order-2 md:order-1">
              <h3 className="text-2xl font-bold text-white">TikZ Graphs Package Tutorial</h3>
              <p className="mt-2 text-gray-400">A comprehensive tutorial for the advanced features of the LaTeX TikZ graphs package...</p>
              <a href="https://github.com/beingforthebenefit/latex-tikz-tutorial" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">View on GitHub</a>
            </div>
            <div className="w-full md:w-1/2 p-4 order-1 md:order-2">
              <img src={tikzDocumentImage} alt="TikZ and graphs" className="rounded-lg shadow-lg"/>
            </div>
          </div>
        </div>

        {/* Additional projects can be added here */}

      </div>
    </section>
  );
}

export default DevProjects;
