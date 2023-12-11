import './App.css';
import {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from './components/About';
import DevProjects from './components/DevProjects';
import Navbar from './components/Navbar';
import MathPortfolio from './components/MathPortfolio';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="App bg-gray-700">
      <Navbar />
      <About />
      <DevProjects />
      <MathPortfolio />
    </div>
  );
}

export default App;
