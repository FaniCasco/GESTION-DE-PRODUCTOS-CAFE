//Footer.js
import React, { useEffect, useRef } from 'react'; // Importamos useEffect y useRef
import { TbHeart } from "react-icons/tb";
import '../Styles/Footer.css';

function Footer() {
  const yearSpan = useRef(null); // Creamos una referencia al elemento span

  useEffect(() => {
    if (yearSpan.current) {
      yearSpan.current.textContent = new Date().getFullYear(); // Actualizamos el contenido del span
    }
  }, []);

  return (
    <footer className="footer">
      <p>
        Desarrollado por FANI <TbHeart />
      </p>
      <p>Copyright © <span id="currentYear" ref={yearSpan}></span></p> 
    </footer>
  );
}

export default Footer;