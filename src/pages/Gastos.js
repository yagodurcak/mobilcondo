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

function Gastos() {

  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const [dataProperty, setDataProperty] = useState({})
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [Start, setStart] = useState("");
const [End, setEnd] = useState("");
const [mesSelected, setMesSelected] = useState(null);
const [añoSelected, setAñoSelected] = useState(null);
const fecha = new Date()
const fecha1 =  moment(fecha).format("YYYY-MM-DD")
const fecha2 =  moment(fecha).format("MM")



const [info, setInfo] = useState({
  propertyId: 106,
  year: 2022,
  month:2
});



    const buscarTipo = async(e) => {

      e.preventDefault();
          
      const url = `https://back2.tinpad.com.pe/public/api/get-receipt`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.post(url,{
        propertyId: 106,
        year: añoSelected,
        month:mesSelected
      }, {headers})
      setData(rtdo.data.data)
      console.log(rtdo.data.data);
    }
    useEffect(() => {
      setdataUser(JSON.parse(localStorage.getItem('user')))
      setDataProperty(JSON.parse(localStorage.getItem('propiedad')))
     }, []);

  useEffect(() => {
   buscarTipo()

  }, [dataUser]);


        const mes = [
            { value: 1, label: 'Enero' },
            { value: 2, label: 'Febrero' },
            { value: 3, label: 'Marzo' },
            { value: 4, label: 'Abril' },
            { value: 5, label: 'Mayo' },
            { value: 6, label: 'Junio' },
            { value: 7, label: 'Julio' },
            { value: 8, label: 'Agosto' },
            { value: 9, label: 'Septiembre' },
            { value: 10, label: 'Octubre' },
            { value: 11, label: 'Noviembre' },
            { value: 12, label: 'Diciembre' }
           
          ]

        const Año = [
            { value: 2022, label: '2022' },
            { value: 2023, label: '2023' },
            { value: 2024, label: '2024' },
            { value: 2025, label: '2025' },
            { value: 2026, label: '2026' },
            { value: 2027, label: '2027' },
            { value: 2028, label: '2028' },
            { value: 2029, label: '2029' },
            { value: 2030, label: '2030' },
            { value: 2031, label: '2031' }
     
          ]

    return <div className="Contenedor" >

      <div className='verde text-center'><h1>Mis Gastos</h1></div>


  
        <div className='blanco '>

          <div className="pt-3 bg-secondary text-white">
            <div className="container">
              <h3>Propietario: {dataUser.name} {dataUser.lastName}</h3>
              <div className="d-flex justify-content-between">
                <h6>Manzana: {dataProperty.block}</h6>
                <h6>Lote:{dataProperty.lot}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Area (m2): {dataProperty.area}</h6>
                <h6>Participacion(%): {dataProperty.participation}</h6>
                        </div>
            </div>

          </div>
          <div>
              <form action="" className="formstyle py-4" onSubmit={buscarTipo}>
              <select name="type" className=" selectstyle" onChange={(e)=> setMesSelected(e.target.value)}>

                <option value=""> Mes</option>
                {mes.map(fbb =>
                    <option key={fbb.value} value={fbb.value}>{fbb.label}</option>
                )};
                </select>
              <select name="type" className=" selectstyle" onChange={(e)=> setAñoSelected(e.target.value)}>

                <option value=""> Año</option>
                {Año.map(fbb =>
                    <option key={fbb.value} value={fbb.value}>{fbb.label}</option>
                )};
                </select>
                <button className="btn1" type="submit">Ver</button>
              </form>
            </div>
             <div className="d-flex justify-content-between container">
            <h6>Periodo</h6>
            <h6>Total</h6>
            <h6>Estado</h6>
            <h6>Recibo</h6>
          </div>


{/*       
    {data.map(casa => (  <div>
        <div className="seccion">
          <div className="row mt-3">
            <h3>{casa.space.description}</h3>

            <div className="row mt-3">
       
                <p className="Item-Title">Inicio de reserva: <span className="Item-Description">{moment(data.start).format('LLL')} hs</span></p>
                <p className="Item-Title">Fin de reserva: <span className="Item-Description">{moment(data.end).format('LLL')} hs</span></p>


            </div>
            <div className="row">
            <h6 className="Item-Title">Normas de uso:</h6>
            <p className="Item-Description">{ casa.space.rulesOfUse }</p>
            </div>
         
          </div>
          
        </div>
        <hr className="linea-seccion2"></hr>
    </div> ))} */}



    
    </div>
    
  </div>;
}

export default Gastos;
