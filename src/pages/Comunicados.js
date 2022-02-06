import "../pages/general.css"

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

function Comunicados() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [respuesta, setRespuesta] = useState("");
const [exito, setExito] = useState(false);
    const onEventAdded = event => {
      let calendarApi = calendarRef.current.getApi()
      calendarApi.addEvent({
          start: moment(event.start).toDate(),
          end: moment(event.end).toDate(),
          title: info.description,
          spaceId: info.id,
          userid: dataUser.id
         
        }
        ) 
        console.log(event.title)
  }
 

    const buscarTipo = async() => {
          
      const url = `https://back2.tinpad.com.pe/public/api/new-release`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.get(url, {headers})
      setdataUser(JSON.parse(localStorage.getItem('user')))
      console.log(rtdo.data.data)
      setData((rtdo.data.data).filter(artista=> artista.typeReleaseId === "10"))

    //   setData(rtdo.data)
    }
    
    console.log(data); 
  useEffect(() => {
   buscarTipo()
  }, []);

  const [info, setInfo] = useState({

    description: "",
    spaceId: ""
  })



// console.log(info);

    return <div className="Contenedor" >

      <div className='verde text-center'>  <h1>Reservar Espacio</h1></div>
      <div className='blanco'>

    {data.map(casa => (  <div>
        <div className="seccion">
          <div className="row mt-3">
            <h3>{casa.title}</h3>

            <div className="row mt-3">
              <div className="col-6">
                <img src={"https://back2.tinpad.com.pe/public/" + casa.path} alt="" className="foto" />
              </div>
         
                <div className="row ">
                <p className="Item-Title">{casa.description}</p>

                <p className="Item-Title">Fecha: {casa.publicationDate}</p>
                <p className="Item-Title">Descargar: <a href="https://back2.tinpad.com.pe/public/${casa.publicationDate}">ver</a></p>


                </div>
             
            </div>

            <div className="boton-centrar">
    
              </div>
          </div>
          
        </div>
        <hr className="linea-seccion2"></hr>
    </div> ))}



    
    </div>
    
  </div>;
}

export default Comunicados;
