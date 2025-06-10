import React, { useState } from 'react';
import '../styles/Recomendacion.css';
import img7 from '../assets/img7.jpg';
import Nav from '../components/Nav/Nav';

function Recomendacion() {
  const [textura, setTextura] = useState('');
  const [humedad, setHumedad] = useState('');
  const [color, setColor] = useState('');

  const [tipoDeSueloIdentificado, setTipoDeSueloIdentificado] = useState('');
  const [cultivosSugeridos, setCultivosSugeridos] = useState([]);
  const [consejosAdicionales, setConsejosAdicionales] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMostrarResultado(false);
    setCargando(true);

    if (!textura || !humedad || !color) {
      alert("Por favor, completa todos los campos del formulario.");
      setCargando(false);
      return;
    }
    
    const datosParaEnviar = { textura, humedad, color };

    // --- ¡AQUÍ ESTÁ LA CORRECCIÓN CLAVE! ---
    // 1. Obtenemos el token del almacenamiento local
    const token = localStorage.getItem('agrovision_token');

    // 2. Creamos los encabezados de la petición
    const headers = {
      'Content-Type': 'application/json',
    };

    // 3. Si existe un token, lo añadimos al encabezado de Autorización
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      // 4. Hacemos la llamada 'fetch' usando los nuevos encabezados
      const response = await fetch('http://localhost:5000/api/suelo/analizar', {
        method: 'POST',
        headers: headers, // <-- Usamos los encabezados que acabamos de crear
        body: JSON.stringify(datosParaEnviar),
      });

      const resultado = await response.json();

      if (resultado.success) {
        const { tipoSueloIdentificado, cultivosSugeridos, consejos } = resultado.data;
        setTipoDeSueloIdentificado(tipoSueloIdentificado);
        setCultivosSugeridos(cultivosSugeridos);
        setConsejosAdicionales(consejos);
      } else {
        setConsejosAdicionales(resultado.message || "No se pudo obtener una recomendación del servidor.");
        setCultivosSugeridos([]);
        setTipoDeSueloIdentificado("Error en el análisis");
      }
    } catch (error) {
      console.error("Error al conectar con la API de suelo:", error);
      setConsejosAdicionales("No se pudo conectar con el servidor de AgroVision. Inténtalo más tarde.");
      setCultivosSugeridos([]);
      setTipoDeSueloIdentificado("Error de Conexión");
    } finally {
      setMostrarResultado(true);
      setCargando(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="cultivo-page-wrapper">
        <div className="cultivo-container">
          <div className="cultivo-box">
            <h1 className="cultivo-title">¿Qué sembrar en mi tierra de Medellín?</h1>

            <form className="cultivo-form" onSubmit={handleSubmit}>
              {/* El resto del formulario se mantiene igual */}
              <div className="cultivo-group">
                <label htmlFor="textura">1. Textura del suelo: ¿Cómo se siente al tacto?</label>
                <select id="textura" value={textura} onChange={(e) => setTextura(e.target.value)} required>
                  <option value="">-- Selecciona una opción --</option>
                  <option value="arenoso">Arenoso (suelto, como arena, no forma bola)</option>
                  <option value="limoso">Limoso (suave, sedoso, forma bola frágil)</option>
                  <option value="arcilloso">Arcilloso (pegajoso, forma bola resistente)</option>
                  <option value="franco">Franco (equilibrio, forma bola pero se deshace)</option>
                </select>
                <p className="cultivo-help">Toma un puñado de tierra ligeramente húmeda y apriétala en tu mano.</p>
                {textura && (<img src={img7} alt={`Ejemplo visual de tierra ${textura}`} className="cultivo-img" />)}
              </div>
              <div className="cultivo-group">
                <label htmlFor="humedad">2. Humedad habitual del suelo:</label>
                <select id="humedad" value={humedad} onChange={(e) => setHumedad(e.target.value)} required>
                  <option value="">-- Selecciona una opción --</option>
                  <option value="seca">Seca (drena muy rápido)</option>
                  <option value="humeda">Húmeda (retiene bien el agua)</option>
                </select>
              </div>
              <div className="cultivo-group">
                <label htmlFor="color">3. Color predominante del suelo (seco):</label>
                <select id="color" value={color} onChange={(e) => setColor(e.target.value)} required>
                  <option value="">-- Selecciona una opción --</option>
                  <option value="negro">Oscuro (negro o marrón muy oscuro)</option>
                  <option value="claro">Claro (rojizo, amarillento, grisáceo)</option>
                </select>
              </div>
              <button type="submit" className="cultivo-btn" disabled={cargando}>
                {cargando ? 'Analizando...' : 'Obtener Recomendación'}
              </button>
            </form>

            {mostrarResultado && (
              <div id="resultado" className="cultivo-result-mejorado">
                {/* ... La sección de resultados se mantiene igual ... */}
                <h2 className="resultado-titulo">¡Aquí tienes tu recomendación para Medellín!</h2>
                <div className="resultado-seccion">
                  <strong className="resultado-subtitulo">Análisis de tu Suelo:</strong>
                  <p>{tipoDeSueloIdentificado}</p>
                </div>
                {cultivosSugeridos.length > 0 && (
                  <div className="resultado-seccion">
                    <strong className="resultado-subtitulo">Cultivos Sugeridos:</strong>
                    <ul className="resultado-lista-cultivos">
                      {cultivosSugeridos.map((cultivo, index) => <li key={index}>{cultivo}</li>)}
                    </ul>
                  </div>
                )}
                <div className="resultado-seccion">
                  <strong className="resultado-subtitulo">Consejos Adicionales:</strong>
                  <p className="resultado-consejos-texto">{consejosAdicionales}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Recomendacion;