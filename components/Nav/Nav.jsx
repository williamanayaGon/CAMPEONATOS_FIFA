import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Nav.css';

function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('agrovision_token');
    setIsLoggedIn(!!token);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('agrovision_token');
    setIsLoggedIn(false);
    alert('Has cerrado sesión.');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenuAndNavigate = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };
  
  // Array de enlaces sin "Información"
  const navLinks = [
    { path: "/home", text: "Inicio" },
    { path: "/recomendacion", text: "Tipo de Suelo" },
  ];
  
  return (
    <nav className='nav-main-container'>
      <div className='nav-content-wrapper'>
        <Link to="/home" className='nav-logo'>AgroVision</Link>

        <button className='nav-mobile-menu-button' onClick={toggleMobileMenu} aria-expanded={isMobileMenuOpen}>
          {isMobileMenuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
        </button>

        {/* Enlaces de Escritorio */}
        <ul className='nav-desktop-links'>
          {navLinks.map(link => (
            <li key={link.text}><Link to={link.path}>{link.text}</Link></li>
          ))}
          {isLoggedIn && (
            <li><Link to="/perfil">Perfil</Link></li>
          )}
          {isLoggedIn ? (
            <li><button onClick={handleLogout} className="nav-logout-btn">Cerrar Sesión</button></li>
          ) : (
            <li><Link to="/login" className="nav-login-btn">Iniciar Sesión</Link></li>
          )}
        </ul>
      </div>

      {/* Menú Desplegable Móvil */}
      <ul className={`nav-mobile-links ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <li key={link.path}><button onClick={() => closeMenuAndNavigate(link.path)}>{link.text}</button></li>
        ))}
        {isLoggedIn && (
          <li><button onClick={() => closeMenuAndNavigate('/perfil')}>Perfil</button></li>
        )}
        <li className="nav-mobile-separator"></li>
        {isLoggedIn ? (
          <li><button onClick={handleLogout} className="nav-logout-btn-mobile">Cerrar Sesión</button></li>
        ) : (
          <li><button onClick={() => closeMenuAndNavigate('/login')} className="nav-login-btn-mobile">Iniciar Sesión</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;