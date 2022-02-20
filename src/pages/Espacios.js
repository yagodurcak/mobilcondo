import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";

import Proveedores from './Proveedores';
import React from 'react';
import espacios from "../IMG/espacioscomunes.png"
import visitas from "../IMG/VISITAS.png"

function Espacios() {

 



  return <div className="Contenedor" >
    <div className='verde text-center mx-5'>  <h1>Reserva espacios y registra invitados  </h1></div>
    <div className='blanco'>
      <div className="seccion ">
        <div className="row mt-3">
          <button className="btn6">
          <Link to="/EspaciosDeportivos" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/EspaciosDeportivos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                  
                <h3>Espacios Comunes</h3>
               
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
          <Link to="/Visitas" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Visitas" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3>Registros de Visitas</h3>
               
                </NavLink>
              </Link>
   
          </button>

        </div>
      </div>
      <hr className="linea-seccion"></hr>

<div className="seccion ">
  <div className="row mt-3">
    <button className="btn6">
    <Link to="/Proveedores" style={{ textDecoration: 'none' }}>
          <NavLink className="logoContainter1 text-white" to="/Proveedores" activeClassName='is-active' style={{ textDecoration: 'none' }}>
            
          <h3>Registro de Proveedores</h3>
         
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

export default Espacios;
