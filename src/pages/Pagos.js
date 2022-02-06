import "../pages/general.css"
import 'moment/locale/es';

import {
  Link,
  NavLink,
} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from 'react';

import AgregarEvento from '../components/AgregarEvento'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import Table2 from "../components/Table2";
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

const customerTableHead = [

  {
      title:"Nombres",
      field: "name"
  },
  {
      title:"Apellidos",
      field: "lastName",
      
  },
  {
      title:"Doc. de Identidad",
      field: "document"
  }
  ]

function Pagos() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [Start, setStart] = useState("");
const [End, setEnd] = useState("");



    const buscarLuz = async() => {
          
      const url = `https://back2.tinpad.com.pe/public/api/light-expenditure`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      }
  
  
      const rtdo = await axios.get(url, {headers})
      console.log(rtdo.data.data);
      setdataUser(JSON.parse(localStorage.getItem('user')))
      setData(rtdo.data.data)
      // setData((rtdo.data.data).filter(artista=> artista.user.id !== dataUser.id));
    }
    const buscarAgua = async() => {
          
      const url = `https://back2.tinpad.com.pe/public/api/water-expenditure`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      }
  
  
      const rtdo = await axios.get(url, {headers})
      console.log(rtdo.data.data);
      setdataUser(JSON.parse(localStorage.getItem('user')))
      setData(rtdo.data.data)
      // setData((rtdo.data.data).filter(artista=> artista.user.id !== dataUser.id));
    }
    const buscarCondo = async() => {
          
      const url = `https://back2.tinpad.com.pe/public/api/condominium-expense`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      }
  
  
      const rtdo = await axios.get(url, {headers})
      console.log(rtdo.data.data);
      setdataUser(JSON.parse(localStorage.getItem('user')))
      setData(rtdo.data.data)
      // setData((rtdo.data.data).filter(artista=> artista.user.id !== dataUser.id));
    }

  useEffect(() => {
   buscarLuz()

  }, []);


    return <div className="Contenedor" >

      <div className='verde text-center'>  <h1>Mis Reservas</h1></div>
      <div className='blanco'>
      
    {data.map(casa => (  <div>
        <div className="seccion">

        <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={data}               

                 /></div>
          <div className="row mt-3">
            <h3>{casa.consume}</h3>

            <div className="row mt-3">
       
                <p className="Item-Title">Inicio de reserva: <span className="Item-Description">{casa.id} hs</span></p>
                {/* <p className="Item-Title">Fin de reserva: <span className="Item-Description">{moment(data.end).format('LLL')} hs</span></p> */}

                {/* <p className="Item-Title">Fin de reserva: <span className="Item-Description">{End} hs</span></p> */}

            </div>
            <div className="row">
            <h6 className="Item-Title">Normas de uso:</h6>
            {/* <p className="Item-Description">{ casa.space.rulesOfUse }</p> */}
            </div>
         
          </div>
          
        </div>
        <hr className="linea-seccion2"></hr>
    </div> ))}



    
    </div>
    
  </div>;
}

export default Pagos;
