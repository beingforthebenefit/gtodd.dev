import React, { useState, useEffect } from 'react';
import logo from '../images/logo-large.png';

function Navbar() {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full z-10 transition-all duration-300 ${isShrunk ? 'shrink' : 'expand'}`}>
      <nav className="bg-gray-700 text-gray-300 shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <a href="#top">
            <img src={logo} alt="Gerald Todd" className={`transition-all duration-300 ${isShrunk ? 'h-8' : 'h-20'}`} />
          </a>
          <p className="text-gray-300 text-lg mt-2 transition-opacity duration-500">Mathematician | Developer | Educator | Musician</p>
          <ul className="flex space-x-4">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#devprojects" className="hover:text-white">Dev Projects</a></li>
              <li><a href="#mathematical-journey" className="hover:text-white">Math Portfolio</a></li>
              <li><a href="#music" className="hover:text-white">Music</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
