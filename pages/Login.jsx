import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../styles/Login.css";
import fondo from '../assets/5.jpg';

function Login() {
  return (
    <>
    <div>
      < div class="headerr">
        <nav class="navbarr">
            <a href="#">Inicio</a>
            <a href="#">Nosotros</a>
            <a href="#">Servicios</a>
            <a href="#">Beneficios</a>
            <a href="#">Contáctanos</a>
        </nav>
        <form action="" class="search-bar">
            <input type="text" placeholder="Buscar..."/>
            <button><i class='bx bx-search'></i></button>
        </form>
    </div>
    </div>
    <div></div>
    </>
  )
}

export default Login