import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";

import React from 'react';
import espacios from "../IMG/espacioscomunes.png"
import visitas from "../IMG/VISITAS.png"

function Espacios() {

 



  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Reserva espacios y registra visitas  </h1></div>
    <div className='blanco' >

      <div className="seccion">     
                <div className="boton-centrar">
                  
                  <button className="btn-yellow-heavy" >     
                  <Link to="/ReservaEspacios" style={{ textDecoration: 'none' }}>
                   Espacios Comunes
                  </Link>
              </button>    
        </div>
      </div>
      <hr className="linea-seccion"></hr>
      {/* ----------------seccion --------------- */}
      <div className="seccion">     
                <div className="boton-centrar">
                  
                  <button className="btn-dark-blue-heavy" >     
                  <Link to="/ElegirTipoVisita" style={{ textDecoration: 'none' }}>
                   Registro de visitas
                  </Link>
              </button>    
        </div>
      </div>
   
      <hr className="linea-seccion"></hr>

      
    </div>
    
  </div>;
}

export default Espacios;
