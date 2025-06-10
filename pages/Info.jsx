import React, { useState } from "react";
import '../styles/Info.css'; 
import img1 from "../assets/sueloarcilloso.jpg";
import img2 from "../assets/sueloarenoso.jpg";
import img3 from "../assets/suelofranco.webp";

function App() {
  // Estado para los datos del clima
  const [clima, setClima] = useState({
    temperatura: "Cargando...",
    humedad: "Cargando...",
    pronostico: "Cargando...",
  });

  // Función para alternar el contenido expandible
  const toggleContent = (e) => {
    const content = e.target.nextElementSibling;
    content.classList.toggle("show");
  };

  return (
    <div className="bg-gray-100 font-sans">

      <header >
        <div >
          <h1 >
            AgroVision: Recurso de Agricultura Sostenible
          </h1>
        </div>
      </header>

      <nav className="navbar">
        <div >
          <ul>
            <li>
              <a href="#tipos-de-suelo" className="hover:text-green-300">
                Tipos de Suelo
              </a>
            </li>
            <li>
              <a href="#factores-climaticos" >
                Factores Climáticos
              </a>
            </li>
            <li>
              <a href="#practicas-sostenibles" >
                Prácticas Sostenibles
              </a>
            </li>
            <li>
              <a href="#herramientas" className="hover:text-green-300">
                Herramientas Interactivas
              </a>
            </li>
            <li>
              <a href="#casos-de-exito" className="hover:text-green-300">
                Casos de Éxito
              </a>
            </li>
          </ul>
        </div>
      </nav>

        <section id="weather-widget" className="bg-green-100 border border-green-200 rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-bold mb-4">Clima Local</h2>
          <div className="infoclima">
            <p>Temperatura: <span className="font-bold">{clima.temperatura}</span></p>
            <p>Humedad: <span className="font-bold">{clima.humedad}</span></p>
            <p>Pronóstico: <span className="font-bold">{clima.pronostico}</span></p>
          </div>
        </section>

            <h1 className="titulo">Tipos de suelo</h1>
        <section className="cards">
  <div className="ca">
    <img src={img1} alt="suelo" />
    <div className="ca-content">
      <h3>Suelo Arenoso</h3>
      <p>El suelo arenoso es ligero y drena rápidamente. Es ideal para vegetales de raíz pero puede requerir riego y fertilización frecuentes.</p>
      <button>Leer más</button>
    </div>
  </div>

  <div className="ca">
    <img src={img2} alt="suelo2" />
    <div className="ca-content">
      <h3>Suelo Arciloso</h3>
      <p>El suelo arcilloso es pesado y retiene bien el agua. Es rico en nutrientes pero puede ser difícil de trabajar debido a su pobre drenaje.</p>
      <button>Leer más</button>
    </div>
  </div>

  <div className="ca">
    <img src={img3} alt="suelo3" />
    <div className="ca-content">
      <h3>Suelo Franco</h3>
      <p>El suelo franco es una mezcla equilibrada de arena, limo y arcilla. Se considera ideal para muchos cultivos debido a su buen drenaje y retención de nutrientes.</p>
      <button>Leer más</button>
    </div>
  </div>
</section>
<h1 className="titulo">Factores Climáticos</h1>
        <section className="cards">
  <div className="ca">
    <div className="ca-content">
      <h3>Temperatura</h3>
      <p>La temperatura afecta las tasas de crecimiento de las plantas y determina qué cultivos pueden prosperar en un área determinada. Considere tanto las temperaturas promedio como las extremas altas y bajas.</p>
      <button>Leer más</button>
    </div>
  </div>

  <div className="ca">
    
    <div className="ca-content">
      <h3>Precipitaciones</h3>
      <p>El agua adecuada es crucial para el crecimiento de los cultivos. Diferentes cultivos tienen requisitos de agua variables, por lo que es esencial comprender los patrones de lluvia locales.</p>
      <button>Leer más</button>
    </div>
  </div>

  <div className="ca">
    
    <div className="ca-content">
      <h3>Luz Solar</h3>
      <p>La cantidad e intensidad de la luz solar afectan la fotosíntesis y el crecimiento de las plantas. Algunos cultivos requieren sol pleno, mientras que otros pueden tolerar sombra parcial.</p>
      <button>Leer más</button>
    </div>
  </div>
</section>
<h1 className="titulo">Prácticas Sostenibles</h1>
        <section className="cards">
  <div className="ca">
    <div className="ca-content">
      <h3>Rotación de Cultivos</h3>
      <p>La rotación de cultivos ayuda a mantener la salud del suelo, previene la acumulación de plagas y puede mejorar los rendimientos. Planifique sus rotaciones cuidadosamente para maximizar los beneficios.</p>
      <button>Leer más</button>
    </div>
  </div>

  <div className="ca">
    
    <div className="ca-content">
      <h3>Compostaje</h3>
      <p>El compostaje recicla los desechos orgánicos en valioso fertilizante, mejorando la estructura del suelo y el contenido de nutrientes mientras reduce los desechos en vertederos.</p>
      <button>Leer más</button>
    </div>
  </div>

  <div className="ca">
    
    <div className="ca-content">
      <h3>Conservación del Agua</h3>
      <p>Implemente sistemas de riego eficientes, use mantillo y cultivos resistentes a la sequía para conservar agua y mejorar la sostenibilidad.</p>
      <button>Leer más</button>
    </div>
  </div>
</section>





    </div>
  );
}

export default App;
