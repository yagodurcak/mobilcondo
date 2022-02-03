import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import React, {useContext, useEffect, useRef, useState} from 'react';

import Calendario from '../components/Calendario'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import axios from 'axios'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list'; //For List View
import moment from "moment"
import timeGridPlugin from '@fullcalendar/timegrid';
import { userContext } from '../context/UserContext';

function Calendar() {


    
    const [data, setdata] = useState([]);

    const [modalOpen, setModalOpen] = useState(false)
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null)
    const { dataUser, setdataUser } = useContext(userContext);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        }
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


    return ( <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Reserva espacios y registra visitas  </h1></div>
    <div className='blanco'>

        <div >
            <div className='container'>

            {/* <button onClick={()=> setModalOpen(true)}>Agregar Evento</button> */}
      
                <FullCalendar
                locale={esLocale}
                ref={calendarRef}
                events={data}
                plugins={[ dayGridPlugin, listPlugin ]}                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridWeek,dayGridDay,listWeek'
                  }}
                    defaultView="dayGridWeek"
                  
                    // datesSet={(date )=> handleDateSet(date)}
                />
        
        

            {/* <AgregarEvento isOpen={modalOpen} onClose={()=> setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/> */}
        </div>
        </div>
        </div>
  
                {/* <Calendario/> */}
             
        </div>
    )
}

export default Calendar
