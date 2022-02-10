import "../pages/general.css"

import React, {useContext, useEffect, useRef, useState} from 'react';

import AgregarEvento from '../components/AgregarEvento'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
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

function EspaciosRecreativos() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [respuesta, setRespuesta] = useState("");
  const [loading, setLoading] = useState(false);
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
  const handleEventAdd = async (data) => {
    console.log(data.event.title);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
    axios.post("https://back2.tinpad.com.pe/public/api/reservation", {
        start: moment(data.event.start).format('YYYY-MM-DD HH:MM:SS'),
        end: moment(data.event.end).format('YYYY-MM-DD HH:MM:SS'),
        title: info.description,
        spaceId: info.id,
        userId: dataUser.id
      }, {headers}) .then(response=>{
        // setdata(data.concat(response.data));
        // abrirCerrarModalInsertar();
        console.log(response);
        setRespuesta(response.data.message)
        console.log("exito -1");
        setExito(true)
        setTimeout(() => {
          setExito(false)
        }, 2000);
      }).catch(error=>{
        console.log(error);
      
      })
        
}

    const buscarTipo = async() => {

        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000);
          
      const url = `https://back2.tinpad.com.pe/public/api/space-image`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      }
  
  
      const rtdo = await axios.get(url, {headers})
      setdataUser(JSON.parse(localStorage.getItem('user')))
      setData((rtdo.data.data).filter(artista=> artista.space.spaceTypeId === "31"));
    }
    
    console.log(data); 
  useEffect(() => {
   buscarTipo()
  }, []);

  const [info, setInfo] = useState({

    description: "",
    spaceId: ""
  })



  const DatosEspDep = (casa) => {
    setModalOpen(true)
    console.log(casa);
    setInfo(casa)
  }
console.log(info);

    return <div className="Contenedor" >
      {exito ? <div classs="container p-5">
	<div class="row no-gutters fixed-top">
		<div class="col-lg-5 col-md-12">
			<div class="alert alert-primary fade show" role="alert">
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			    	<span aria-hidden="true">&times;</span>
			  	</button>
			 	<h4 class="alert-heading text-center">{respuesta}</h4>
			</div>
		</div>
	</div>
</div>: null}
      <div className='verde text-center'>  <h1>Reservar Espacio Recreativo</h1></div>
      <div className='blanco'>
      <div className='FullCalendar blind'>
                <FullCalendar
                locale={esLocale}
                ref={calendarRef}
                events={data}
                plugins={[ dayGridPlugin, listPlugin ]}                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
                  }}
                    defaultView="dayGridMonth"
                    eventAdd={event=>handleEventAdd(event)}
                    // datesSet={(date )=> handleDateSet(date)}
                />
            </div>
            { loading ?  <Box sx={{ position: 'absolute' , left: 170, top:400, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}
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
            </div>
            <div className="row">
            <h6 className="Item-Title">Normas de uso:</h6>
            <p className="Item-Description">{ casa.space.rulesOfUse }</p>
            </div>
            
            {/* <div className="boton-centrar"><button className="btn1">     <Link to="/Calendario" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Calendario" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                  
                  RESERVAR
               
                </NavLink>
              </Link></button></div> */}
            <div className="boton-centrar">
              <button className="btn1" onClick={()=> DatosEspDep(casa.space)}>    RESERVAR </button>
    
              </div>
                          <AgregarEvento info={info} isOpen={modalOpen} onClose={()=> setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
          </div>
          
        </div>
        <hr className="linea-seccion2"></hr>
    </div> ))}



    
    </div>
    
  </div>;
}

export default EspaciosRecreativos;
