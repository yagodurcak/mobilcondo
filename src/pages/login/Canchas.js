import "../../pages/general.css"

import {
    Link,
    NavLink,
} from "react-router-dom";
import React, {useEffect, useState} from 'react';

import axios from "axios"
import deportivo from "../../IMG/deportivo.png"
import espacios from "../../IMG/espacioscomunes.png"
import esparcimiento   from "../../IMG/esparcimiento.png"
import recreativos from "../../IMG/recreativos.png"
import visitas from "../../IMG/VISITAS.png"

function Canchas() {

    const [spaceTypes, setSpaceTypes] = useState([])

    const buscarTipo = async() => {
          
      const url = `https://back2.tinpad.com.pe/public/api/space-type`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      }
  
  
      const rtdo = await axios.get(url, {headers})
  
      // console.log(rtdo.data.data);
    
      setSpaceTypes(rtdo.data.data)
  
  }
  
  useEffect(() => {
   buscarTipo()
  }, []);
  
  console.log(spaceTypes);


  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Reserva de espacios</h1></div>
    <div className='blanco'>
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-center mt-3">
                    <div className="col-8 ml-2">
                        <h1>Elige el tipo de espacio</h1>
                    </div>
                    <div className="col-4 mr-2"><button className="btn2">MIS RESERVAS</button></div>
                </div>
            </div>
        </div>
      <div className="seccion">
        <div className="row mt-3">
          <h3>Deportivo</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={deportivo} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Canchas de Futbol, tennis, basket y otros deportes disponibles en el condominio</h5>
                <div className="boton-centrar"><button className="btn1">     <Link to="/EspaciosDeportivos" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" exact to="/EspaciosDeportivos" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
                  
                  VER
               
                </NavLink>
              </Link></button></div>
            
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="linea-seccion2"></hr>
      {/* ----------------seccion --------------- */}
      <div className="seccion">
        <div className="row mt-3">
          <h3>Recreativos</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={recreativos} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Registra invitados para tus eventos o a tus proveedores de servicio</h5>
                <div className="boton-centrar"><button className="btn1">VER</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="linea-seccion2"></hr>
       {/* ----------------seccion --------------- */}
       <div className="seccion">
        <div className="row mt-3">
          <h3>Esparcimiento</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={esparcimiento} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Registra invitados para tus eventos o a tus proveedores de servicio</h5>
                <div className="boton-centrar"><button className="btn1">VER</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="linea-seccion2"></hr>
         {/* ----------------seccion --------------- */}
    </div>
    
  </div>;
}

export default Canchas;
