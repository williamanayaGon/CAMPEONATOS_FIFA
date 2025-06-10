import React from 'react';
import '../styles/App.css'; // Mantenemos tu App.css para estilos globales si los tienes
import video from '../assets/vid.mp4';
import Informacion from './Informacion'; 
import Nav from '../components/Nav/Nav'; 
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Nav />
      
      <section className="home-hero-section"> {/* Clase para la sección principal */}
        <video 
          className="home-video-bg" /* Clase para el video */
          autoPlay 
          muted 
          loop
          playsInline
        >
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
        <div className="home-video-overlay"></div> {/* Capa para oscurecer video */}

        <div className="home-hero-content"> {/* Contenedor para el texto y botón */}
          <h1 className="home-hero-title">
            Cuidado y buen manejo del suelo
          </h1>
          <Link 
            to="/recomendacion" 
            className="home-hero-button"
          >
            Conoce tu Suelo
          </Link>
        </div>
      </section>
      
      <section className="home-informacion-section"> {/* Nueva sección para Informacion */}
        <Informacion />
      </section>
    </>
  );
}

export default Home;