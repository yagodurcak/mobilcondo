import '../pages/general.css'
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";

import React, {useContext, useEffect, useRef, useState} from 'react';

import AgregarEvento from './AgregarEvento'
import DatePicker from "react-datepicker";
import Datetime from 'react-datetime';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import axios from 'axios'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list'; //For List View
import moment from "moment"
import { userContext } from '../context/UserContext';

function Calendario() {

    const [data, setdata] = useState([]);

    const [modalOpen, setModalOpen] = useState(false)
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null)
    const { dataUser, setdataUser } = useContext(userContext);
    const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [title, setTitle] = useState("")
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  const onSubmit = (e) => {
      e.preventDefault()
      onEventAdded({
          title,
          start,
          end
      })
      handleEventAdd()
     
  }
    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title}
        )
    }


    const handleEventAdd = async (data) => {
        console.log((data.event));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
        axios.post("https://back2.tinpad.com.pe/public/api/reservation", {
            start: moment(data.event.start).format('YYYY-MM-DD HH:MM:SS'),
            end: moment(data.event.end).format('YYYY-MM-DD HH:MM:SS'),
            title: data.event.title}, {headers})
    }

    const buscarCotizacion = async() => {

              
        const url = `https://back2.tinpad.com.pe/public/api/reservation`;
  
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
        }
  
        const rtdo = await axios.get(url, {headers})
        setdataUser(JSON.parse(localStorage.getItem('user')))
        console.log(rtdo.data.data);
        setdata(rtdo.data.data)
    }

    useEffect(() => {
        buscarCotizacion()
        console.log(data);

      
      }, []);


    return (
        <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Reservar Espacio</h1></div>
    <div className='blanco'>
         <div className='container'>
             <div className="input-container">
                     <div>

                     <form action="" onSubmit={onSubmit}>
                <input type="text"  onChange={e => setTitle(e.target.value)} />
                <div>
                    <label htmlFor="">Inicio</label>
                    <Datetime value={start} onChange={date => setStart(date)} />
                </div>
                <div>
                    <label htmlFor="">Final</label>
                    <Datetime value={end} onChange={date => setEnd(date)} />
                </div>
                <button className='btn1 mt-3'>Reservar Espacio</button>
            </form>
                   <div className='botonCentrar pt-3'>
   
         </div>
         <AgregarEvento onEventAdded={event => onEventAdded(event)}/>

      </div>
      </div>
      </div>
      </div>
      </div>

    )
}

export default Calendario
