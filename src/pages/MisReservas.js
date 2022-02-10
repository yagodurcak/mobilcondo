import "../pages/general.css"
import 'moment/locale/es';

import {
  Link,
  NavLink,
} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from 'react';

import AgregarEvento from '../components/AgregarEvento'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import axios from "axios"
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import deportivo from "../IMG/deportivo.png"
import esLocale from '@fullcalendar/core/locales/es';
import espacios from "../IMG/espacioscomunes.png"
import esparcimiento   from "../IMG/esparcimiento.png"
import listPlugin from '@fullcalendar/list'; //For List View
import moment from "moment"
import recreativos from "../IMG/recreativos.png"
import { set } from "date-fns";
import { userContext } from '../context/UserContext';
import visitas from "../IMG/VISITAS.png"

function MisReservas() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [Start, setStart] = useState("");
const [End, setEnd] = useState("");
const [existe, setExiste] = useState(false);



    const buscarTipo = async() => {
          
      const url = `https://back2.tinpad.com.pe/public/api/reservation`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      }
  
  
      const rtdo = await axios.get(url, {headers})
     
      setData((rtdo.data.data).filter(artista=> artista.user.id === dataUser.id));
    }
    useEffect(() => {
      setdataUser(JSON.parse(localStorage.getItem('user')))
    }, []);

  useEffect(() => {
   buscarTipo()

  }, [dataUser]);

  useEffect(() => {
  if (data.length >= 1) {
    setExiste(true)
  } else {
    setExiste(false)
  }
  }, [data]);

  console.log(data);


    return <div className="Contenedor" >

      <div className='verde text-center'>  <h1>Mis Reservas</h1></div>
      <div className='blanco'>

        { existe ? <div>

    {data.map(casa => (  <div>
        <div className="seccion">
          <div className="row mt-3">
            <h3>{casa.space.description}</h3>

            <div className="row mt-3">
       
                <p className="Item-Title">Inicio de reserva: <span className="Item-Description">{moment(casa.start).format('LLL')} hs</span></p>
                <p className="Item-Title">Fin de reserva: <span className="Item-Description">{moment(casa.end).format('LLL')} hs</span></p>

                {/* <p className="Item-Title">Fin de reserva: <span className="Item-Description">{End} hs</span></p> */}

            </div>
            <div className="row">
            <h6 className="Item-Title">Normas de uso:</h6>
            <p className="Item-Description">{ casa.space.rulesOfUse }</p>
            </div>
         
          </div>
          
        </div>
        <hr className="linea-seccion2"></hr>
    </div> ))}
        </div>

    : <div className="pt-5 text-center">
      <h3>No tienes reservas para mostrar</h3>
    </div>

        }
      



    
    </div>
    
  </div>;
}

export default MisReservas;
