import './App.css';
import {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';

function App() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
