import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";

import React from 'react';
import espacios from "../IMG/espacioscomunes.png"
import visitas from "../IMG/VISITAS.png"

function Informes() {

 



  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Informes y Noticias  </h1></div>
    <div className='blanco'>
      <div className="seccion">
        <div className="row mt-3">
          <h3>Noticias y Comunicados</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={espacios} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Reserva tu espacio para disfrutar en familia</h5>

         

                <div className="boton-centrar"><button className="btn1">     <Link to="/NoticiasyComunicados" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/NoticiasyComunicados" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                  
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
          <h3>Información Util</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={visitas} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Registra invitados para tus eventos o a tus proveedores de servicio</h5>
                <div className="boton-centrar"><button className="btn1">     <Link to="/ElegirTipoVisita" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/ElegirTipoVisita" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                  
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

export default Informes;
