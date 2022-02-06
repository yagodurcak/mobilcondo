import "../pages/general.css"

import {
    Link,
    NavLink,
} from "react-router-dom";
import React, {useEffect, useState} from 'react';

import axios from "axios"
import deportivo from "../IMG/deportivo.png"
import espacios from "../IMG/espacioscomunes.png"
import esparcimiento   from "../IMG/esparcimiento.png"
import recreativos from "../IMG/recreativos.png"
import visitas from "../IMG/VISITAS.png"

function ElegirTipoInformes() {

    const [spaceTypes, setSpaceTypes] = useState([])

    const buscarTipo = async() => {
          
      const url = `https://back2.tinpad.com.pe/public/api/new-release`;
  
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
    <div className='verde text-center'>  <h1>Registro de informes</h1></div>
    <div className='blanco'>
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-center mt-3">
   
                        <h1>Elige el tipo de visita</h1>
        
                </div>
            </div>
        </div>
      <div className="seccion">
        <div className="row mt-3">
          <h3>Invitados</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={deportivo} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Ver tus visitas confirmadas y da de alta nuevos invitados </h5>
                <div className="boton-centrar"><button className="btn1">     <Link to="/Visitas" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" exact to="/Visitas" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
                  
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
          <h3>Proveedores</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={recreativos} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Observa y Registra tus proveedores de servicio</h5>
                <div className="boton-centrar"><button className="btn1">     <Link to="/Proveedores" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" exact to="/Proveedores" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
                  
                  VER
               
                </NavLink>
              </Link></button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="linea-seccion2"></hr>
      
    </div>
    
  </div>;
}

export default ElegirTipoInformes;
