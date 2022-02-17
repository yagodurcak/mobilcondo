import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";

import React from 'react';
import espacios from "../IMG/espacioscomunes.png"
import visitas from "../IMG/VISITAS.png"

function TramitesyQuejas() {
  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Tramites y Quejas  </h1></div>
    <div className='blanco'>
    <div className="seccion">     
                <div className="boton-centrar">   
                  <button className="btn-yellow" >     
                  <Link to="/Tramites" style={{ textDecoration: 'none' }}>
                   Tramites
                  </Link>
              </button>    
        </div>
      </div>

      <div className="seccion">     
                <div className="boton-centrar">   
                  <button className="btn-dark-blue" >     
                  <Link to="/Reclamos" style={{ textDecoration: 'none' }}>
                   Quejas
                  </Link>
              </button>    
        </div>
      </div>


      <hr className="linea-seccion"></hr>

      
    </div>
    
  </div>;
}

export default TramitesyQuejas;
