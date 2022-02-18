import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from 'react';

import AgregarEvento from '../components/AgregarEvento'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import ModalDetails2 from "../components/ModalDetails2";
import axios from "axios"
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import deportivo from "../IMG/deportivo.png"
import esLocale from '@fullcalendar/core/locales/es';
import espacios from "../IMG/espacioscomunes.png"
import esparcimiento   from "../IMG/esparcimiento.png"
import listPlugin from '@fullcalendar/list'; //For List View
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment"
import recreativos from "../IMG/recreativos.png"
import { set } from "date-fns";
import { userContext } from '../context/UserContext';
import visitas from "../IMG/VISITAS.png"

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: "100%",
    // height: "100%", 
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  //   display: "grid"
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function EspaciosDeportivos() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [respuesta, setRespuesta] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkList, setCheckList] = useState(false);
  const [availableInfo, setavAilableInfo] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
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

  const abrirCerrarModalDetails=()=>{
    setShowModalDetails(!showModalDetails);
    setCheckList(false)
    setavAilableInfo(true)
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
      setData((rtdo.data.data).filter(artista=> artista.space.visibility==="1"));
    }
    
    console.log(data); 
  useEffect(() => {
   buscarTipo()
  }, []);

  const [info, setInfo] = useState({
    space:"",
    
    spaceId: ""
  })

  const seleccionarUser=(user, caso)=>{

    setInfo(user);
    // console.log(info.property.block);
    abrirCerrarModalDetails()

  }



  const DatosEspDep = (casa) => {
    setModalOpen(true)
    console.log(casa);
    abrirCerrarModalDetails()
    setInfo(casa)
  }

  const cambiarEstado = () => {
    setCheckList(!checkList)
  }
console.log(info);

const styles= useStyles();

const bodyDetails =(
  <div className={styles.modal}>

     
      <div className="estilosmodalDetails">

      {availableInfo &&  <h3>{info.description}</h3>}
     
      <h6>Terminos y Condiciones</h6>
      {availableInfo &&  <h6 className="grisdesc">{info.rulesOfUse}</h6>}
      
      <div className="d-flex justify-content-start">
        <h6>Tiempo previo de reserva: <span className="grisdesc"> {info.previusReservationTime} hs</span> </h6>
     
      </div>
      <div className="d-flex justify-content-start">
        <h6>Horas máximas de reserva: <span className="grisdesc">{info.maximiunReservationTime} horas por mes</span> </h6>

      </div>
      </div>
      <div className="topping" onChange={cambiarEstado}>
    <input type="checkbox" /> Estoy de acuerdo
  </div>

      <div className="d-flex justify-content-around mt-3">
  {checkList && <button className="btn2" onClick={()=> DatosEspDep(info)} >Reservar</button>}
        <button className="btn2" onClick={()=>abrirCerrarModalDetails()}>Volver</button>
        </div>

  </div>
  )

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
      <div className='verde text-center'>  <h1>Reservar Espacio</h1></div>
      <div className='blanco'>
      { loading ?  <Box sx={{ position: 'absolute' , left: 170, top:400, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}
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

            <div className="row">
                <div className="d-flex justify-content-center mt-3">
                    <div className="col-8 ml-2">
                    </div>
                    <div className="col-4 mr-2 d-flex align-items-center"><button className="btn2"><Link to="/MisReservas" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" exact to="/MisReservas" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
                  
                  <h6>MIS RESERVAS</h6>
               
                </NavLink>
              </Link></button></div>
                </div>
            </div>
    {data.map(casa => (  <div>
        <div className="seccion">
          <div className="row mt-3">


            <div className="row mt-3">
              <div className="col-6">
                <img src={"https://back2.tinpad.com.pe/public/" + casa.path} alt="" className="foto" />
              </div>
              <div className="col-6">
                <div className="row">
                
                  <h6>{casa.space.description}</h6>
                  <div className="d-flex justify-content-end">
                   
                    <button className="btn2a mt-5" onClick={()=>seleccionarUser(casa.space) }>  RESERVAR</button></div>
                </div>
              </div>
            </div>

            {/* onClick={()=> DatosEspDep(casa.space)} */}
            {/* <div className="boton-centrar"><button className="btn1">     <Link to="/Calendario" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1 text-white" to="/Calendario" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                  
                  RESERVAR
               
                </NavLink>
              </Link></button></div> */}

                          <AgregarEvento info={info} isOpen={modalOpen} onClose={()=> setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
          </div>
          
        </div>
        <hr className="linea-seccion2"></hr>
    </div> ))}



    
    </div>
    <ModalDetails2
            showModalDetails={showModalDetails}
            functionShow= {abrirCerrarModalDetails}
            // handleChangeInsert={handleChangeInsert}
            // onSubmitEditar={onSubmitEditar}
            info={info}
            bodyDetails={bodyDetails}
            />
    
  </div>;
}

export default EspaciosDeportivos;
