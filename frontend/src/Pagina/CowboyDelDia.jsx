import { useState } from 'react';

const Inicio = () => {
  const [cowboys, setCowboys] = useState(null);
  const [clicked, setClick] = useState(false);

  const click = () => {
    setClick(true);

    setTimeout(() => {
      fetchCowboys();
    }, 1000);
  };

  const fetchCowboys = async () => {
    try {
      const response = await fetch('/api/cowboys/today');
      const data = await response.json();
      setCowboys(data.name);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="cowboyDelDia">
        {
          !clicked ? (
            <button className='btn btn-dark' onClick={click}>
              ¿Quien es el Cowboy del día?
            </button>
          ) : (
            <div>
              <p>El cowboy de hoy es....</p>
              <h2>{cowboys}</h2>
            </div>
          )
        }
      </div>
  );
};

export default Inicio;
