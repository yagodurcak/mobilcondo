import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";

import Proveedores from './Proveedores';
import React from 'react';
import espacios from "../IMG/espacioscomunes.png"
import proveedores from "../IMG/IngresoProveedor1.svg"
import reserva from "../IMG/reserva1.svg"
import visitas from "../IMG/IngresoVisitas1.svg"

function Espacios() {

 



  return <div className="Contenedor" >
    <div className='verde text-center mx-5'>  <h2>SUS RESERVACIONES, INVITADOS Y PROVEEDORES  </h2></div>
    <div className='blanco'>
      {/* <div className="seccion ">
        <div className="row mt-3">
          <div div className="d-flex justify-content-between">
            <button className="btn6">
            <Link to="/EspaciosDeportivos" style={{ textDecoration: 'none' }}>
                  <NavLink className="logoContainter1 text-white" to="/EspaciosDeportivos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
            
                  <h3> <span class="material-icons mr-3 mt-1"> date_range</span> RESERVA DE ESPACIOS</h3>
            
                  </NavLink>
                </Link>
            
            </button>
          </div>
       
        </div>
      </div>
      <hr className="linea-seccion"></hr>

      <div className="seccion">
        <div className="row mt-3">
          <div className="d-flex justify-content-between">
            <button className="btn5">
            <Link to="/Visitas" style={{ textDecoration: 'none' }}>
                  <NavLink className="logoContainter1 text-white" to="/Visitas" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                  <h3> <span class="material-icons mr-3 mt-1">
                  group_add
                      </span>  INGRESO DE VISITAS </h3>
            
                  </NavLink>
                </Link>
            </button>

       
          </div>

        </div>
      </div>
      <hr className="linea-seccion"></hr>

<div className="seccion ">
  <div className="row mt-3">
    <button className="btn6">
    <Link to="/Proveedores" style={{ textDecoration: 'none' }}>
          <NavLink className="logoContainter1 text-white" to="/Proveedores" activeClassName='is-active' style={{ textDecoration: 'none' }}>
            
          <h3><span class="material-icons mr-3 mt-1"> assignment_ind</span> INGRESO PROVEEDORES</h3>
         
          </NavLink>
        </Link>
     
    </button>
 
  </div>
</div>
<hr className="linea-seccion"></hr> */}
{/* ----------------seccion --------------- */}
    

<div className="seccion ">
  <div className="row mt-3">
    <div className="botonMenu">
      <button>
      <Link to="/EspaciosDeportivos" style={{ textDecoration: 'none' }}>
            <NavLink className="logoContainter1 text-black" to="/EspaciosDeportivos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
              <img src={reserva} alt="" />
      
            </NavLink>
          </Link>
      </button>
      <h6>Reserva de espacios</h6>
    </div>
 
  </div>
</div>
<hr className="linea-seccion"></hr>
{/* ----------------seccion --------------- */}

<div className="seccion ">
  <div className="row mt-3">
    <div className="d-flex justify-content-between">
      <div className="botonMenu">
        <button>
        <Link to="/Visitas" style={{ textDecoration: 'none' }}>
              <NavLink className="logoContainter1 text-black" to="/Visitas" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <img src={visitas} alt="" />
      
              </NavLink>
            </Link>
        </button>
        <h6>Ingreso de visitas</h6>
      </div>
      <div className="botonMenu">
        <button>
        <Link to="/Proveedores" style={{ textDecoration: 'none' }}>
              <NavLink className="logoContainter1 text-black" to="/Proveedores" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <img src={proveedores} alt="" />
      
              </NavLink>
            </Link>
        </button>
        <h6>Ingreso de proveedores</h6>
      </div>
    </div>
 
  </div>
</div>
<hr className="linea-seccion"></hr>
{/* ----------------seccion --------------- */}
      
    </div>
    
  </div>;
}

export default Espacios;
