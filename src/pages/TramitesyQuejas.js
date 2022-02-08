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
        <div className="row mt-3">
          <h3>Tramites</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={espacios} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Reserva tu espacio para disfrutar en familia</h5>

         

                <div className="boton-centrar"><button className="btn1">     <Link to="/Tramites" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Tramites" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                  
                  VER
               
                </NavLink>
              </Link></button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="linea-seccion"></hr>
      {/* ----------------seccion --------------- */}
      <div className="seccion">
        <div className="row mt-3">
          <h3>Quejas y Reclamos</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={visitas} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Registra invitados para tus eventos o a tus proveedores de servicio</h5>
                <div className="boton-centrar"><button className="btn1">     <Link to="/Reclamos" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Reclamos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                  
                  VER
               
                </NavLink>
              </Link></button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="linea-seccion"></hr>

      
    </div>
    
  </div>;
}

export default TramitesyQuejas;
