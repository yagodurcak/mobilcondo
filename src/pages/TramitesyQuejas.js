import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";

import React from 'react';
import espacios from "../IMG/espacioscomunes.png"
import visitas from "../IMG/VISITAS.png"
import Tramites from './Tramites';

function TramitesyQuejas() {
  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Tramites y Quejas  </h1></div>
    <div className='blanco'>
           {/* ----------------seccion --------------- */}
           <div className="seccion">
        <div className="row mt-3">
          <button className="btn6">
          <Link to="/Tramites" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Tramites" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3>Trámites</h3>
               
                </NavLink>
              </Link>
   
          </button>

        </div>
      </div>
      <hr className="linea-seccion"></hr>
      {/* ----------------seccion --------------- */}
            
            <div className="seccion">
        <div className="row mt-3">
          <button className="btn5">
          <Link to="/Reclamos" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Reclamos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3>Quejas y Reclamos</h3>
               
                </NavLink>
              </Link>
   
          </button>

        </div>
      </div>
      <hr className="linea-seccion"></hr>

      
    </div>
    
  </div>;
}

export default TramitesyQuejas;
