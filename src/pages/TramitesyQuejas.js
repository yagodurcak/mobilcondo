import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";

import React from 'react';
import Tramites from './Tramites';
import espacios from "../IMG/espacioscomunes.png"
import visitas from "../IMG/VISITAS.png"

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
                <h3><span class="material-icons mr-3 mt-1 "> difference</span>Trámites</h3>
               
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
                <h3><span class="material-icons mr-3 mt-1 "> thumb_down_alt</span>Quejas y Reclamos</h3>
               
                </NavLink>
              </Link>
   
          </button>

        </div>
      </div>
      <hr className="linea-seccion"></hr>
      <div className="botonMenu">
        <button>
        <Link to="/Noticias" style={{ textDecoration: 'none' }}>
              <NavLink className="logoContainter1 text-black" to="/Noticias" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <img src="" alt="" />
      
              </NavLink>
            </Link>
        </button>
        <h6>Noticias</h6>
      </div>
      

    </div>
    
  </div>;
}

export default TramitesyQuejas;
