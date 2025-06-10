import React, { useState, useEffect } from 'react';
import '../styles/Informacion.css'; // Usaremos este CSS unificado y mejorado

// Importa tus imágenes para la galería y las tarjetas
import img1 from '../assets/img1.jpg'; 
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';

import sueloArenosoImg from "../assets/sueloarenoso.jpg"; 
import sueloArcillosoImg from "../assets/sueloarcilloso.jpg"; 
import sueloFrancoImg from "../assets/suelofranco.webp"; 

const cardData = [
  {
    id: 'importanciaSuelo',
    title: 'La Importancia del Suelo',
    colorClass: 'card-border-red', // Clase para borde/acento de color
    shortDescription: "Base de la agricultura, sustenta el crecimiento y afecta la productividad.",
    content: (
      <>
        <p>El suelo es un recurso vital para la agricultura, ya que es la base que sustenta el crecimiento de las plantas. Su composición, estructura y nutrientes afectan directamente el desarrollo de los cultivos. Un suelo saludable contribuye a una mayor productividad y a la sostenibilidad de las prácticas agrícolas.</p>
        <p>La identificación precisa del tipo de suelo y su correcto manejo son esenciales para maximizar el rendimiento de los cultivos y asegurar la salud a largo plazo del ecosistema agrícola.</p>
        <h4>Beneficios de Identificar el Tipo de Suelo</h4>
        <ul>
          <li><strong>Optimización de la Productividad:</strong> Permite seleccionar los cultivos más adecuados y aplicar prácticas de manejo que mejoren el rendimiento (fertilizantes, riego, etc.).</li>
          <li><strong>Mejora de la Sostenibilidad:</strong> Ayuda a preservar sus propiedades y reducir problemas como la erosión y la degradación, promoviendo la salud del suelo.</li>
          <li><strong>Beneficios Económicos:</strong> Aumentar la productividad puede mejorar los ingresos y contribuir al desarrollo económico regional.</li>
        </ul>
      </>
    )
  },
  {
    id: 'tecnologiaAgricultura',
    title: 'La Tecnología en la Agricultura',
    colorClass: 'card-border-blue',
    shortDescription: "Herramientas avanzadas para la gestión del suelo y el cultivo.",
    content: (
      <>
        <p>La tecnología ha revolucionado la agricultura al proporcionar herramientas avanzadas para la gestión del suelo y el cultivo. Las plataformas digitales, sensores de suelo y análisis de datos permiten a los agricultores:</p>
        <ul>
          <li><strong>Monitoreo en Tiempo Real:</strong> Usar sensores para obtener datos precisos sobre humedad, temperatura y composición del suelo para tomar decisiones informadas.</li>
          <li><strong>Análisis de Datos:</strong> Para predecir rendimientos, identificar patrones y ajustar estrategias de manejo.</li>
          <li><strong>Optimización de Recursos:</strong> Aplicar riego por goteo y fertilización de precisión para usar recursos eficientemente.</li>
        </ul>
      </>
    )
  },
  {
    id: 'nuestraPlataforma',
    title: 'Nuestra Plataforma AgroVision',
    colorClass: 'card-border-green',
    shortDescription: "Identifica tu suelo y recibe recomendaciones para Medellín.",
    content: (
      <p>Nuestra plataforma AgroVision está diseñada para ayudarte a identificar el tipo de suelo a través de preguntas sencillas sobre sus características. Con esta información y considerando el clima de Medellín, te ofrecemos recomendaciones personalizadas sobre los cultivos más adecuados, técnicas de manejo y prácticas agrícolas. Nuestro objetivo es mejorar la productividad en los huertos urbanos de Medellín, optimizar el uso de recursos y contribuir a una agricultura más eficiente y sostenible en nuestra ciudad.</p>
    )
  },
  {
    id: 'sueloArenoso',
    title: 'Suelo Arenoso',
    colorClass: 'card-border-yellow', 
    image: sueloArenosoImg,
    shortDescription: "Ligero, drena rápido. Ideal para raíces, requiere materia orgánica.",
    content: (
      <>
        <p>El suelo arenoso es ligero, fácil de trabajar y drena el agua rápidamente. No retiene bien los nutrientes. Es ideal para vegetales de raíz como zanahorias y rábanos.</p>
        <p><strong>En Medellín:</strong> Es crucial añadirle abundante materia orgánica (compost, humus de lombriz) para mejorar su estructura, capacidad de retención de agua y nutrientes. El riego debe ser frecuente pero ligero.</p>
        <h4>Características:</h4>
        <ul>
          <li>Textura granular y suelta.</li>
          <li>Baja retención de agua y nutrientes.</li>
          <li>Buen drenaje y aireación.</li>
          <li>Se calienta rápidamente en primavera.</li>
        </ul>
      </>
    )
  },
  {
    id: 'sueloArcilloso',
    title: 'Suelo Arcilloso',
    colorClass: 'card-border-brown', 
    image: sueloArcillosoImg,
    shortDescription: "Pesado, retiene agua y nutrientes. Necesita buen drenaje.",
    content: (
      <>
        <p>El suelo arcilloso es pesado, está compuesto por partículas muy finas, retiene bien el agua y suele ser rico en nutrientes. Sin embargo, puede ser difícil de trabajar (pegajoso cuando está húmedo, duro cuando está seco) y compactarse fácilmente, dificultando el drenaje y la aireación.</p>
        <p><strong>En Medellín:</strong> Dada la humedad del clima, es vital mejorar su estructura con abundante materia orgánica para hacerlo más friable. Considerar bancales elevados o camas de cultivo elevadas es una excelente estrategia para cultivos que no toleran el encharcamiento. La arena puede añadirse con precaución y bien mezclada para mejorar la textura, pero en exceso puede empeorar la compactación.</p>
        <h4>Características:</h4>
        <ul>
          <li>Textura fina, pegajosa cuando está mojada.</li>
          <li>Alta retención de agua y nutrientes.</li>
          <li>Drenaje y aireación deficientes si no se mejora.</li>
          <li>Se calienta lentamente y puede ser frío y húmedo en invierno.</li>
        </ul>
      </>
    )
  },
  {
    id: 'sueloFranco',
    title: 'Suelo Franco',
    colorClass: 'card-border-lime', 
    image: sueloFrancoImg,
    shortDescription: "Equilibrado, ideal para muchos cultivos. ¡El sueño del agricultor!",
    content: (
      <>
        <p>El suelo franco es una mezcla equilibrada de arena, limo y arcilla, combinando las mejores propiedades de cada uno. Se considera el tipo de suelo ideal para la mayoría de los cultivos debido a su buena textura, drenaje adecuado, y excelente capacidad para retener nutrientes y humedad.</p>
        <p><strong>En Medellín:</strong> Es el tipo de suelo más deseable. Aún así, se beneficia de la adición regular de materia orgánica para mantener su fertilidad y estructura a largo plazo.</p>
        <h4>Características:</h4>
        <ul>
          <li>Buena textura, fácil de trabajar.</li>
          <li>Excelente equilibrio entre retención de humedad y drenaje.</li>
          <li>Buena aireación.</li>
          <li>Fértil y rico en nutrientes si se maneja bien.</li>
        </ul>
      </>
    )
  },
  {
    id: 'factoresClimaticosMedellin',
    title: 'Clima de Medellín y Cultivos',
    colorClass: 'card-border-sky', 
    shortDescription: "Tropical húmedo, temperaturas de 22-28°C, favorable para muchos cultivos.",
    content: (
      <>
        <p>Medellín goza de un clima "tropical húmedo" o "templado de montaña", caracterizado por temperaturas agradables durante todo el año (promedio 22-28°C) y una buena distribución de lluvias, aunque con temporadas más secas y más lluviosas. Estas condiciones son muy favorables para una amplia gama de cultivos hortícolas y frutales.</p>
        <ul>
          <li><strong>Temperatura:</strong> Las temperaturas constantes son ideales para hortalizas de clima cálido-templado, muchas frutas tropicales y subtropicales, y legumbres. Esto reduce la necesidad de infraestructuras como invernaderos para muchos cultivos comunes.</li>
          <li><strong>Precipitaciones:</strong> Generalmente adecuadas, pero es vital asegurar un buen drenaje del suelo, especialmente en suelos arcillosos, para evitar problemas de pudrición de raíces. En las temporadas más secas, el riego suplementario será necesario para mantener la productividad.</li>
          <li><strong>Luz Solar:</strong> Medellín recibe una buena cantidad de horas de luz solar, esencial para la fotosíntesis. Sin embargo, la nubosidad puede ser frecuente. Es importante considerar la orientación del huerto para maximizar la exposición solar de las plantas.</li>
        </ul>
        <p>Adaptar las elecciones de cultivo a las variaciones estacionales de lluvia y luz puede optimizar los resultados.</p>
      </>
    )
  },
  {
    id: 'practicasSostenibles',
    title: 'Prácticas Sostenibles en el Huerto',
    colorClass: 'card-border-teal', 
    shortDescription: "Compostaje, rotación, asociación de cultivos y más para un huerto saludable.",
    content: (
      <>
        <p>Implementar prácticas agrícolas sostenibles en tu huerto urbano no solo mejora la salud de tus plantas y la calidad de tus cosechas, sino que también contribuye al medio ambiente. Aquí algunas clave:</p>
        <ul>
          <li><strong>Compostaje:</strong> Transforma tus desechos orgánicos de cocina y jardín en un abono rico en nutrientes. El compost mejora la estructura del suelo, la retención de agua y la actividad biológica.</li>
          <li><strong>Rotación de Cultivos:</strong> Evita plantar el mismo tipo de cultivo en el mismo lugar temporada tras temporada. Esto ayuda a prevenir el agotamiento de nutrientes específicos del suelo y reduce la incidencia de plagas y enfermedades.</li>
          <li><strong>Asociación de Cultivos (Cultivos Compañeros):</strong> Algunas plantas se benefician mutuamente al crecer juntas. Por ejemplo, ciertas hierbas aromáticas pueden repeler plagas de hortalizas vecinas, o leguminosas pueden fijar nitrógeno que beneficia a otras plantas.</li>
          <li><strong>Manejo Integrado de Plagas (MIP):</strong> Prioriza métodos preventivos (plantas sanas, barreras físicas) y biológicos (atraer insectos benéficos) antes de considerar el uso de pesticidas, optando siempre por opciones orgánicas y de bajo impacto.</li>
          <li><strong>Conservación del Agua:</strong> Utiliza técnicas como el acolchado o mulching (con paja, hojas secas, corteza) para reducir la evaporación del agua del suelo y controlar malezas. Riega eficientemente, preferiblemente temprano en la mañana o al atardecer.</li>
          <li><strong>No Labranza o Labranza Mínima:</strong> Reduce la alteración del suelo para proteger su estructura y la vida microbiana.</li>
        </ul>
      </>
    )
  }
];

function Informacion() {
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);

  const openCardModal = (card) => {
    setSelectedCardData(card);
    document.body.classList.add('modal-open'); // Para evitar scroll del fondo
  };

  const closeCardModal = () => {
    setSelectedCardData(null);
    document.body.classList.remove('modal-open');
  };

  useEffect(() => {
    const galleryImages = document.querySelectorAll('.gallery-container-custom img');
    const handleGalleryImageClick = (event) => {
      setOverlayImage(event.target.getAttribute('src'));
      document.body.classList.add('modal-open');
    };
    galleryImages.forEach(image => image.addEventListener('click', handleGalleryImageClick));
    return () => {
      galleryImages.forEach(image => image.removeEventListener('click', handleGalleryImageClick));
    };
  }, []);

  const closeGalleryOverlay = () => {
    setOverlayImage(null);
    document.body.classList.remove('modal-open');
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (selectedCardData) closeCardModal();
        if (overlayImage) closeGalleryOverlay();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedCardData, overlayImage]);


  return (
    <section className="info-page-container">
      <h2 className="info-page-main-title">Información Clave para tu Huerto en Medellín</h2>
      
      <div className="info-cards-grid">
        {cardData.map(card => (
          <div
            key={card.id}
            className={`info-card-summary ${card.colorClass}`}
            onClick={() => openCardModal(card)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openCardModal(card)}
          >
            {card.image && (
              <div className="info-card-summary-image-wrapper">
                <img src={card.image} alt={card.title} className="info-card-summary-image" />
              </div>
            )}
            <div className="info-card-summary-content">
              <h3 className="info-card-summary-title">{card.title}</h3>
              <p className="info-card-summary-description">{card.shortDescription}</p>
              <span className="info-card-summary-cta">Conocer más <i className="fas fa-arrow-right cta-icon"></i></span>
            </div>
          </div>
        ))}
      </div>

      {selectedCardData && (
        <div className="info-modal-overlay" onClick={closeCardModal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="info-modal-close-button" onClick={closeCardModal} aria-label="Cerrar detalle">
              <i className="fas fa-times"></i>
            </button>
            {selectedCardData.image && (
                 <img src={selectedCardData.image} alt={selectedCardData.title} className="info-modal-image" />
            )}
            <h2 id="modal-title" className="info-modal-title">{selectedCardData.title}</h2>
            <div className="info-modal-body">
              {selectedCardData.content}
            </div>
          </div>
        </div>
      )}

      <section className="gallery-section-custom" id="tu-suelo-tu-futuro">
        <h2 className="gallery-section-title">Tu Suelo - Tu Futuro</h2>
        <div className="gallery-container-custom">
          {[img1, img2, img3, img4, img5].map((imgSrc, index) => (
            <div className="gallery-item-custom" key={index} onClick={() => { setOverlayImage(imgSrc); document.body.classList.add('modal-open'); }}>
              <img src={imgSrc} alt={`Ejemplo de suelo ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {overlayImage && (
        <div className="gallery-image-overlay" onClick={closeGalleryOverlay} role="dialog" aria-modal="true">
          <div className="gallery-image-overlay-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-modal-close-button" onClick={closeGalleryOverlay} aria-label="Cerrar imagen">
              <i className="fas fa-times"></i>
            </button>
            <img src={overlayImage} alt="Imagen ampliada" />
          </div>
        </div>
      )}
    </section>
  );
}

export default Informacion;