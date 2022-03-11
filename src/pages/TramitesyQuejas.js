import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";

import React from 'react';
import Tramites from '../IMG/Tramites 1.svg';
import documentos from "../IMG/queja 1.svg"
import espacios from "../IMG/espacioscomunes.png"
import visitas from "../IMG/VISITAS.png"

function TramitesyQuejas() {
  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Tramites y Quejas  </h1></div>
    <div className='blanco'>
          <div className="seccion">
            <div className="row mt-3">
           
                <div className="botonMenu">
                        <button>
                        <Link to="/Reclamos" style={{ textDecoration: 'none' }}>
                    <NavLink className="logoContainter1 text-black" to="/Reclamos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                      <img  src={documentos} alt="" />
                    </NavLink>
                  </Link>
                        </button>
                        <h6>Quejas</h6>
                      </div> </div>

                      <div className="row mt-3">
                        <div className="botonMenu">
                          <button>
                          <Link to="/Tramites" style={{ textDecoration: 'none' }}>
                                            <NavLink className="logoContainter1 text-black" to="/Tramites" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                        <img  src={Tramites} alt="" />
                                            </NavLink>
                                          </Link>
                          </button>
                          <h6>Tramites</h6>
                        </div>
                      </div>
            
           
          </div>
      

    </div>
    
  </div>;
}

export default TramitesyQuejas;
