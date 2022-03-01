import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";

import React from 'react';
import {Util} from 'reactstrap';
import espacios from "../IMG/espacioscomunes.png"
import visitas from "../IMG/VISITAS.png"

function Informes() {
  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>SUS NOTICIAS Y COMUNICADOS  </h1></div>
    <div className='blanco'>
    <div className="seccion">
        <div className="row mt-3">
          <button className="btn6">
          <Link to="/Noticias" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Noticias" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3>NOTICIAS</h3>
               
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
          <Link to="/Comunicados" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Comunicados" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3>COMUNICADOS</h3>
               
                </NavLink>
              </Link>
   
          </button>

        </div>
      </div>
      <hr className="linea-seccion"></hr>
      {/* ----------------seccion --------------- */}
    <div className="seccion">
        <div className="row mt-3">
          <button className="btn6">
          <Link to="/Telefonos" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Telefonos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3>INFORMACIÓN ÚTIL</h3>
               
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
          <Link to="/Archivos" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Archivos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3>DOCUMENTOS ÚTILES</h3>
               
                </NavLink>
              </Link>
   
          </button>

        </div>
      </div>
      <hr className="linea-seccion"></hr>
      {/* ----------------seccion --------------- */}
      
    </div>
    
  </div>;
}

export default Informes;
