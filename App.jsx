import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Home from './pages/Home.jsx';   
import Perfil from './pages/Perfil.jsx';    
import Recomendacion from './pages/Recomendacion.jsx';
import Login2 from './pages/Login2.jsx';
import Perfilmod from './pages/Perfilmod.jsx'; 
// Info.jsx y su ruta /info deben eliminarse si consolidaste su contenido en Informacion.jsx

function App() {
  return (
    <Router>
      <Routes>
        {/* Esta es la línea clave: La ruta raíz "/" ahora renderiza Login2 */}
        <Route path="/" element={<Login2 />} /> 
        
        {/* Mantener /login por si hay enlaces directos, aunque "/" ya cumple */}
        <Route path="/login" element={<Login2 />} />

        {/* Home ahora está en /home */}
        <Route path="/home" element={<Home />} /> 
        
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/recomendacion" element={<Recomendacion />} />
        <Route path="/perfilmod" element={<Perfilmod />} />

        {/* Puedes añadir una ruta catch-all para páginas no encontradas si lo deseas */}
        {/* <Route path="*" element={<div>Página no encontrada</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;