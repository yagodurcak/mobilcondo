// import "react-datepicker/dist/react-datepicker.css";

import "react-datepicker/dist/react-datepicker.css"

import React, {useContext, useEffect, useRef, useState} from 'react';

import AgregarEvento from './AgregarEvento'
import DatePicker from "react-datepicker";
import axios from 'axios'
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
    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title}
        )
    }
    const handleCheckInDate = (date) => {
        setCheckInDate(date);
        setCheckOutDate(null);
      };
    
      const handleCheckOutDate = (date) => {
        setCheckOutDate(date);
      };

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
              <h4 className='DateItem pt-3'>Reserva desde:</h4>
              <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        onChange={handleCheckInDate}
              />
                     </div>
                     <div>
                     <h4 className='DateItem pt-3'>Reserva hasta: </h4>
              <DatePicker
                   selected={startDate}
                   onChange={(date) => setStartDate(date)}
                   showTimeSelect
                   timeFormat="HH:mm"
                   timeIntervals={15}
                   timeCaption="time"
                   dateFormat="MMMM d, yyyy h:mm aa"
                selected={checkOutDate}
                minDate={checkInDate}
                onChange={handleCheckOutDate}
              />
                     </div>
                   </div>
                   {checkInDate && checkOutDate && (
                     <div className="summary">
              <p>
                You book a hotel from {moment(checkInDate).format("LL")} to{" "}
                {moment(checkOutDate).format("LL")}.
              </p>
                     </div>
                   )}

                   <div className='botonCentrar pt-3'>
         <button className='btn1 mt-2' onClick={()=> setModalOpen(true)}>Agregar Evento</button>
                       <button className='btn1 mt-5' onClick={handleEventAdd()}>Reservar</button></div>
         </div>
         <AgregarEvento isOpen={modalOpen} onClose={()=> setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>

      </div>
      </div>

    )
}

export default Calendario
