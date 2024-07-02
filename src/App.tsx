import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
//import viteLogo from './vite.svg'; // Adjust the path to vite.svg based on your project structure
import './App.css';

interface CoffeeBlend {
  name: string;
  notes: string;
}

function App() {
  const [blends, setBlends] = useState<CoffeeBlend[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/get_coffee_blends');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blendsData = await response.json();
        setBlends(blendsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="App">
      <header className="App-header">
        <h1>Coffee Blends</h1>
        <ul>
          {blends.map((blend, index) => (
            <li key={index}>
              <strong>{blend.name}</strong> - {blend.notes}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
