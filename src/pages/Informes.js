import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";

import React from 'react';
import {Util} from 'reactstrap';
import comunicados from "../IMG/comunicados 1.svg"
import documentos from "../IMG/DocumentosUtiles1.svg"
import espacios from "../IMG/espacioscomunes.png"
import informacion from "../IMG/InformaciónUtil1.svg"
import noticias from "../IMG/noticias1.svg"

// import visitas from "../IMG/VISITAS.png"

function Informes() {
  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>SUS NOTICIAS Y COMUNICADOS  </h1></div>
    <div className='blanco'>
    {/* <div className="seccion">
        <div className="row mt-3">
          <button className="btn6">
          <Link to="/Noticias" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Noticias" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3><span class="material-icons mr-3 mt-1 "> feed</span>NOTICIAS</h3>
               
                </NavLink>
              </Link>
   
          </button>

        </div>
      </div>
      <hr className="linea-seccion"></hr>

      <div className="seccion">
        <div className="row mt-3">
          <button className="btn5">
          <Link to="/Comunicados" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Comunicados" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3><span class="material-icons mr-3 mt-1 "> import_contacts</span>COMUNICADOS</h3>
               
                </NavLink>
              </Link>
   
          </button>

        </div>
      </div>
      <hr className="linea-seccion"></hr>

    <div className="seccion">
        <div className="row mt-3">
          <button className="btn6">
          <Link to="/Telefonos" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Telefonos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3><span class="material-icons mr-3 mt-1 "> assignment_late</span>INFORMACIÓN ÚTIL</h3>
               
                </NavLink>
              </Link>
   
          </button>

        </div>
      </div>
      <hr className="linea-seccion"></hr>

      <div className="seccion">
        <div className="row mt-3">
          <button className="btn5">
          <Link to="/Archivos" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Archivos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <h3><span class="material-icons mr-3 mt-1 "> snippet_folder</span>DOCUMENTOS ÚTILES</h3>
               
                </NavLink>
              </Link>
   
          </button>

        </div>
      </div>
      <hr className="linea-seccion"></hr> */}
      {/* ----------------seccion --------------- */}
      {/* ----------------seccion --------------- */}

<div className="seccion ">
  <div className="row mt-3">
    <div className="d-flex justify-content-between">
      <div className="botonMenu">
        <button>
        <Link to="/Noticias" style={{ textDecoration: 'none' }}>
              <NavLink className="logoContainter1 text-black" to="/Noticias" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <img src={noticias} alt="" />
      
              </NavLink>
            </Link>
        </button>
        <h6>Noticias</h6>
      </div>
      <div className="botonMenu">
        <button>
        <Link to="/Comunicados" style={{ textDecoration: 'none' }}>
              <NavLink className="logoContainter1 text-black" to="/Comunicados" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <img src={comunicados} alt="" />
      
              </NavLink>
            </Link>
        </button>
        <h6>Comunicados</h6>
      </div>
    </div>
 
  </div>
</div>
<hr className="linea-seccion"></hr>
{/* ----------------seccion --------------- */}
      {/* ----------------seccion --------------- */}

<div className="seccion ">
  <div className="row mt-3">
    <div className="d-flex justify-content-between">
      <div className="botonMenu">
        <button>
        <Link to="/Telefonos" style={{ textDecoration: 'none' }}>
              <NavLink className="logoContainter1 text-black" to="/Telefonos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <img src={informacion} alt="" />
      
              </NavLink>
            </Link>
        </button>
        <h6>Información Útil</h6>
      </div>
      <div className="botonMenu">
        <button>
        <Link to="/Archivos" style={{ textDecoration: 'none' }}>
              <NavLink className="logoContainter1 text-black" to="/Archivos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                <img src={documentos} alt="" />
      
              </NavLink>
            </Link>
        </button>
        <h6>Documentos Útiles</h6>
      </div>
    </div>
 
  </div>
</div>
<hr className="linea-seccion"></hr>
{/* ----------------seccion --------------- */}
      
    </div>
    
  </div>;
}

export default Informes;
