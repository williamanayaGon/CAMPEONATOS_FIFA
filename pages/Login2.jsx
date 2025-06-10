import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login'; // Tu componente de cabecera
import fondo from '../assets/5.jpg';
import '../styles/Login2.css';
import 'boxicons/css/boxicons.min.css';

function Login2() {
  const navigate = useNavigate();
  // Estado para manejar la vista de registro/login
  const [isRegisterView, setIsRegisterView] = React.useState(false);

  // --- Handler para el INICIO DE SESIÓN ---
  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Prevenir que la página se recargue

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      // Hacemos la llamada (fetch) a nuestro endpoint de login en el backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Le decimos al backend que estamos enviando JSON
        },
        body: JSON.stringify({ email, password }), // Convertimos nuestros datos a un string JSON
      });

      const data = await response.json(); // Convertimos la respuesta del backend a un objeto JavaScript

      if (data.success) {
        // Si el backend nos dice que todo fue exitoso...
        localStorage.setItem('agrovision_token', data.token); // Guardamos el token en el navegador
        alert('Inicio de sesión exitoso!');
        navigate('/home'); // Redirigimos al home
      } else {
        // Si el backend nos devuelve un error (ej. credenciales inválidas)
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      // Si hay un error de conexión (ej. el backend no está corriendo)
      console.error('Error de conexión:', error);
      alert('No se pudo conectar al servidor. Asegúrate de que el backend esté funcionando e inténtalo de nuevo.');
    }
  };

  // --- Handler para el REGISTRO ---
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    
    const name = event.target.newName.value;
    const email = event.target.newEmail.value;
    const password = event.target.newPassword.value;
    
    try {
      // Hacemos la llamada (fetch) a nuestro endpoint de registro
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Enviamos los 3 campos
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('agrovision_token', data.token);
        alert('¡Registro exitoso! Ya puedes usar la aplicación.');
        navigate('/home');
      } else {
        alert(`Error de registro: ${data.message}`);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('No se pudo conectar al servidor. Asegúrate de que el backend esté funcionando e inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <Login /> 
      <div className="fondo">
        <img src={fondo} alt="Fondo decorativo de la página de login" />
      </div>
      
      <div className="container">
        <div className="item">
          <h2 className="logo"><i className='bx bxs-building'></i>AGROVISION</h2>
          <div className="text-item">
            <h2>¡Bienvenido! <br /><span>Estamos encantados de tenerte de nuevo.</span></h2>
            <p>Gracias a ti, estamos creciendo más allá de nuestras expectativas. Compartamos el éxito cada día.</p>
            <div className="social-icon">
              <a href="#"><i className='bx bxl-facebook'></i></a>
              <a href="#"><i className='bx bxl-twitter'></i></a>
              <a href="#"><i className='bx bxl-instagram'></i></a>
              <a href="#"><i className='bx bxl-tiktok'></i></a>
            </div>
          </div>
        </div>

        {/* Usamos una clase condicional para mostrar el formulario correcto */}
        <div className={`login-section ${isRegisterView ? 'show-register' : ''}`}>
          {/* Formulario de Login */}
          <div className="form-box login">
            <form onSubmit={handleLoginSubmit}> 
              <h2>Iniciar Sesión</h2>
              <div className="input-box">
                <span className="icon"><i className='bx bxs-envelope'></i></span>
                <input type="email" name="email" required />
                <label>Correo Electrónico</label>
              </div>
              <div className="input-box">
                <span className="icon"><i className='bx bxs-lock-alt'></i></span>
                <input type="password" name="password" required />
                <label>Contraseña</label>
              </div>
              <div className="remember-password">
                <label><input type="checkbox" />Recuérdame</label>
                <a href="#">Olvidaste tu contraseña</a>
              </div>
              <button className="btn" type="submit">Ingresar</button>
              <div className="create-account">
                <p>¿Aún no tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegisterView(true); }}>Registrarse</a></p>
              </div>
            </form>
          </div>

          {/* Formulario de Registro */}
          <div className="form-box register">
            <form onSubmit={handleRegisterSubmit}>
              <h2>Registro</h2>
              <div className="input-box">
                <span className="icon"><i className='bx bxs-user'></i></span>
                <input type="text" name="newName" required />
                <label>Nombre de Usuario</label>
              </div>
              <div className="input-box">
                <span className="icon"><i className='bx bxs-envelope'></i></span>
                <input type="email" name="newEmail" required />
                <label>Correo Electrónico</label>
              </div>
              <div className="input-box">
                <span className="icon"><i className='bx bxs-lock-alt'></i></span>
                <input type="password" name="newPassword" required />
                <label>Contraseña</label>
              </div>
              <div className="remember-password">
                <label><input type="checkbox" required/>Estoy de acuerdo con los términos</label>
              </div>
              <button className="btn" type="submit">Registrarse</button>
              <div className="create-account">
                <p>¿Ya tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegisterView(false); }}>Iniciar Sesión</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login2;