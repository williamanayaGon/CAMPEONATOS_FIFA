import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import '../styles/Perfilmod.css'; 
import video from '../assets/vid.mp4';
import defaultAvatar from "../assets/avatar.png"; // Importamos el avatar por defecto

function Perfilmod() {
  const navigate = useNavigate();
  // Estado para manejar los datos del formulario, lo iniciamos en null
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect para cargar los datos del usuario
  useEffect(() => {
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
        const data = await response.json();
        if (data.success) {
          // Guardamos el objeto de usuario completo en el estado
          setFormData(data.data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error al cargar datos para editar:", error);
        setFormData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [navigate]);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Enviar las actualizaciones del perfil de texto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('agrovision_token');
    const dataToUpdate = {
        name: formData.name,
        bio: formData.bio,
        location: formData.location
    };
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(dataToUpdate)
      });
      const result = await response.json();
      if (result.success) {
        alert('¡Perfil actualizado con éxito!');
        navigate('/perfil');
      } else {
        alert(`Error al actualizar: ${result.message}`);
      }
    } catch (error) {
      alert('Error de conexión al intentar actualizar el perfil.');
    }
  };

  // Función para eliminar el perfil
  const handleDeleteProfile = async () => {
    if (!window.confirm("¿Estás ABSOLUTAMENTE SEGURO de que quieres eliminar tu cuenta? Esta acción es PERMANENTE.")) {
      return;
    }
    const confirmationText = formData.name;
    const userInput = window.prompt(`Para confirmar, escribe tu nombre de usuario exacto: "${confirmationText}"`);
    if (userInput !== confirmationText) {
      alert("La confirmación no coincide. Eliminación cancelada.");
      return;
    }
    const token = localStorage.getItem('agrovision_token');
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        alert(result.message);
        localStorage.removeItem('agrovision_token');
        navigate('/login');
      } else {
        alert(`Error al eliminar la cuenta: ${result.message}`);
      }
    } catch (error) {
      alert('Error de conexión al intentar eliminar la cuenta.');
    }
  };

  // Guardianes para evitar errores de renderizado
  if (loading) {
    return <div className="perfilmod-page-container loading-container"><Nav /><p>Cargando...</p></div>;
  }
  if (!formData) {
    return <div className="perfilmod-page-container loading-container"><Nav /><p>No se pudieron cargar tus datos. <Link to="/login">Intenta iniciar sesión de nuevo</Link>.</p></div>;
  }

  return (
    <>
      <Nav />
      <div className="perfilmod-page-container">
        <video className="perfilmod-video-bg" autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div className="perfilmod-overlay"></div>
        <div className="perfilmod-content-box">
          <h2 className="perfilmod-title">Editar Perfil</h2>

          <form className="perfilmod-form" onSubmit={handleSubmit}>
            {/* Sección del Avatar (ahora segura) */}
            <div className="perfilmod-avatar-section">
              <img 
                src={formData.avatarUrl || defaultAvatar}
                alt="Foto de Perfil Actual" 
                className="perfilmod-avatar-preview"
              />
              {/* Aquí irá la lógica para el input de archivo más adelante */}
            </div>

            <div className="perfilmod-form-group">
              <label htmlFor="name">Nombre Completo:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="perfilmod-form-group">
              <label htmlFor="email">Correo Electrónico (no se puede cambiar):</label>
              <input type="email" id="email" name="email" value={formData.email} disabled />
            </div>
            <div className="perfilmod-form-group">
              <label htmlFor="location">Ubicación:</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
            </div>
            <div className="perfilmod-form-group">
              <label htmlFor="bio">Biografía:</label>
              <textarea id="bio" name="bio" rows="5" value={formData.bio} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="perfilmod-submit-btn">
              <i className="fas fa-save"></i> Guardar Cambios
            </button>
          </form>

          <div className="perfilmod-danger-zone">
            <h3 className="danger-zone-title">Zona de Peligro</h3>
            <div className="danger-zone-content">
              <p>Eliminar tu cuenta es una acción permanente. Se borrará toda tu información, incluyendo tu perfil y tu historial de búsquedas.</p>
              <button type="button" className="perfilmod-delete-account-btn" onClick={handleDeleteProfile}>
                Eliminar Mi Cuenta Permanentemente
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfilmod;