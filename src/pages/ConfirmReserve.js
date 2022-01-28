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

function ConfirmReserve() {

    const [data, setData] = useState([])

    const buscarTipo = async() => {
          
      const url = `https://back2.tinpad.com.pe/public/api/space-image`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      }
  
  
      const rtdo = await axios.get(url, {headers})
      setData((rtdo.data.data).filter(artista=> artista.space.spaceTypeId === "3"));
    }
    
    console.log(data); 
  useEffect(() => {
   buscarTipo()
  }, []);



  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Espacios Deportivos</h1></div>
    <div className='blanco'>
    {data.map(casa => (  <div>
        <div className="seccion">
          <div className="row mt-3">
            <h3>{casa.space.description}</h3>

            <div className="row mt-3">
              <div className="col-6">
                <img src={"https://back2.tinpad.com.pe/public/" + casa.path} alt="" className="foto" />
              </div>
              <div className="col-6">
                <div className="row ">
                <p className="Item-Title">Tiempo previo de reserva: <span className="Item-Description">{casa.space.previusReservationTime} hs</span></p>

                <p className="Item-Title">Horas máximas de reserva: <span className="Item-Description">{casa.space.maximiunReservationTime} hs</span></p>


                </div>
              </div>
            </div>s
            <div className="row">
            <h6 className="Item-Title">Normas de uso:</h6>
            <p className="Item-Description">{ casa.space.rulesOfUse }</p>
            </div>
            <div className="boton-centrar"><button className="btn1">     <Link to="/Calendario" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" exact to="/Calendario" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
                  
                  RESERVAR
               
                </NavLink>
              </Link></button></div>
          </div>
          
        </div>
        <hr className="linea-seccion2"></hr>
    </div> ))}



    
    </div>
    
  </div>;
}

export default ConfirmReserve;
