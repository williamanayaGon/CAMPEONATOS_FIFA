import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../styles/Perfil.css";
import Nav from "../components/Nav/Nav";
import defaultAvatar from "../assets/avatar.png";

const PerfilUsuario = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para obtener los datos del perfil
  const fetchProfileData = async () => {
    const token = localStorage.getItem('agrovision_token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Fallo al obtener los datos del perfil');
      const data = await response.json();
      if (data.success) {
        setUserData(data.data);
      } else {
        localStorage.removeItem('agrovision_token');
        navigate('/login');
      }
    } catch (error) {
      console.error("Error al cargar el perfil:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    fetchProfileData();
  }, [navigate]);

  // Función para eliminar un registro del historial
  const handleDeleteHistory = async (historyId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este registro?")) return;
    const token = localStorage.getItem('agrovision_token');
    try {
      const response = await fetch(`http://localhost:5000/api/auth/history/${historyId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        // Actualiza el estado para reflejar la eliminación sin recargar la página
        setUserData(prevUserData => ({
          ...prevUserData,
          recommendationHistory: prevUserData.recommendationHistory.filter(item => item._id !== historyId)
        }));
      } else {
        alert(`Error al eliminar: ${data.message}`);
      }
    } catch (error) {
      alert("Error de conexión al eliminar.");
    }
  };
  
  // Funciones placeholder para los botones de edición de imagen/portada
  const handleChangeProfilePic = () => alert("Funcionalidad 'Cambiar foto' aún no implementada.");
  const handleChangeCoverPhoto = () => alert("Funcionalidad 'Cambiar portada' aún no implementada.");

  // Guardianes de renderizado
  if (loading) {
    return (
      <div className="perfil-page-container loading-container">
        <Nav />
        <p>Cargando perfil...</p>
      </div>
    );
  }
  if (!userData) {
    return (
      <div className="perfil-page-container loading-container">
        <Nav />
        <p>No se pudieron cargar los datos del perfil. <Link to="/login" className="link-reintentar">Por favor, inicia sesión de nuevo</Link>.</p>
      </div>
    );
  }

  // Si todo está bien, renderizamos la página completa
  return (
    <>
      <Nav />
      <div className="perfil-page-container">
        <section className="perfil-usuario">
          <div className="contenedor-perfil">
            <div
              className="portada-perfil"
              style={{ backgroundImage: `url('${userData.coverImageUrl || 'https://via.placeholder.com/1024x300'}')` }}
              aria-label={`Foto de portada de ${userData.name}`}
            >
              <div className="sombra-portada"></div>
              <div className="avatar-perfil-container">
                <img src={userData.avatarUrl || defaultAvatar} alt={`Avatar de ${userData.name}`} className="avatar-imagen" />
                <button type="button" className="cambiar-foto-btn" onClick={handleChangeProfilePic}>
                  <i className="fas fa-camera"></i>
                  <span>Cambiar foto</span>
                </button>
              </div>
              <div className="datos-perfil">
                <h1 className="titulo-usuario">{userData.name}</h1>
                <p className="bio-usuario">{userData.bio}</p>
                {userData.tags && userData.tags.length > 0 && (
                  <ul className="lista-tags-perfil">
                    {userData.tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                )}
              </div>
              {/* Este es el bloque de botones que había desaparecido */}
              <div className="opciones-perfil-portada">
                <button type="button" onClick={handleChangeCoverPhoto} className="btn-opcion-portada">
                  <i className="fas fa-image"></i> Cambiar portada
                </button>
                <Link to="/perfilmod" className="btn-opcion-portada btn-modificar-datos">
                  <i className="fas fa-user-edit"></i> Modificar Datos
                </Link>
              </div>
            </div>
            
            <nav className="menu-acciones-perfil">
              <ul>
                <li><Link to="/home"><i className="fas fa-leaf"></i> AgroVision</Link></li>
                <li><Link to="/recomendacion"><i className="fas fa-seedling"></i> Test de Suelo</Link></li>
                <li><a href="#historial-busquedas" className="nav-link-historial"><i className="fas fa-history"></i> Mi Historial</a></li>
              </ul>
            </nav>
          </div>
        </section>

        {/* Esta es la sección del historial que había desaparecido */}
        <section id="historial-busquedas" className="historial-container">
          <h2 className="historial-titulo-principal">Historial de Búsquedas</h2>
          <div className="historial-lista">
            {userData.recommendationHistory && userData.recommendationHistory.length > 0 ? (
              userData.recommendationHistory.map((item) => (
                <div key={item._id} className="historial-item">
                  <button 
                    className="historial-item-delete-btn" 
                    onClick={() => handleDeleteHistory(item._id)}
                    aria-label="Eliminar este registro"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                  <div className="historial-item-fecha">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{new Date(item.createdAt).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="historial-item-cuerpo">
                    <div className="historial-item-consulta">
                      <strong>Consulta Realizada:</strong>
                      <span>{`Textura ${item.query.textura}, Humedad ${item.query.humedad}, Color ${item.query.color}`}</span>
                    </div>
                    <div className="historial-item-resultado">
                      <strong>Recomendación Principal:</strong>
                      <span>{item.result.tipoSueloIdentificado}</span>
                      <ul className="historial-item-cultivos">
                        {item.result.cultivosSugeridos.slice(0, 3).map(cultivo => <li key={cultivo}>{cultivo}</li>)}
                        {item.result.cultivosSugeridos.length > 3 && <li>...y más</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="historial-vacio">Aún no has realizado ninguna búsqueda. ¡Ve a "Test de Suelo" para empezar!</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PerfilUsuario;