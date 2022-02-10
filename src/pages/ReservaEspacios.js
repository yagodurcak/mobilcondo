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
import otros from "../IMG/ZonaDeportes1 1otros.png"
import recreativos from "../IMG/recreativos.png"
import salas from "../IMG/ZonaDeportes1 1usomultiple.png"
import visitas from "../IMG/VISITAS.png"

function ReservaEspacios() {

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
                    </div>
                    <div className="col-4 mr-2"><button className="btn2"><Link to="/MisReservas" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" exact to="/MisReservas" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
                  
                  MIS RESERVAS
               
                </NavLink>
              </Link></button></div>
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
                <div className="boton-centrar"><button className="btn1">     <Link to="/EspaciosDeportivos" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" exact to="/EspaciosRecreativos" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
                  
                  VER
               
                </NavLink>
              </Link></button></div>              </div>
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
                <div className="boton-centrar"><button className="btn1">     <Link to="/EspaciosEsparcimiento" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" exact to="/EspaciosEsparcimiento" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
                  
                  VER
               
                </NavLink>
              </Link></button></div>              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="linea-seccion2"></hr>
         {/* ----------------seccion --------------- */}
       <div className="seccion">
        <div className="row mt-3">
          <h3>Salas de uso multiple</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={salas} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Sala de conferencias, eventos, reuniones y exposiciones, cine y otras salas disponibles
</h5>
<div className="boton-centrar"><button className="btn1">     <Link to="/EspaciosUsoMultiple" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" exact to="/EspaciosUsoMultiple" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
                  
                  VER
               
                </NavLink>
              </Link></button></div>                 </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="linea-seccion2"></hr>
         {/* ----------------seccion --------------- */}
       <div className="seccion">
        <div className="row mt-3">
          <h3>Otros espacios disponibles</h3>
          <div className="row mt-3">
            <div className="col-6">
              <img src={otros} alt="" className="foto" />
            </div>
            <div className="col-6">
              <div className="row ">
                <h5 className="Item-Description">Zonas y espacios de uso común exclusivos de tu condominio
</h5>
<div className="boton-centrar"><button className="btn1">     <Link to="/EspaciosOtros" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" exact to="/EspaciosOtros" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
                  
                  VER
               
                </NavLink>
              </Link></button></div>              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="linea-seccion2"></hr>
         {/* ----------------seccion --------------- */}
    </div>
    
  </div>;
}

export default ReservaEspacios;
