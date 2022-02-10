import "../pages/general.css"

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
      height: "70%",
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

function RespuestaReclamo() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [respuesta, setRespuesta] = useState("");
  const [showModalDetails, setShowModalDetails] = useState(false);
const [exito, setExito] = useState(false);
const [dataProperty, setDataProperty] = useState({})
const [loading, setLoading] = useState(false);
const [asoc, setAsoc] = useState("");

 
  const [info, setInfo] = useState({
    title: "",
    description: "",
    file:"" ,  
    publicationDate: ""     

  })

  console.log(info);
    
  const abrirCerrarModalDetails=()=>{
    setShowModalDetails(!showModalDetails);
  }
    const buscarAsociacion = async() => {
      
  
          
      const url = `https://back2.tinpad.com.pe/public/api/response-association`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.get(url, {headers})
    
      console.log(rtdo.data.data)
      setAsoc(rtdo.data.data)
      // setData((rtdo.data.data).filter(artista=> artista.owner_process.proyect.propertyId === (dataProperty.id).toString()))

    //   setData(rtdo.data)
    }
    useEffect(() => {
      buscarAsociacion()
    }, [data]);
    const buscarTipo = async() => {
      
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000);
        
          
      const url = `https://back2.tinpad.com.pe/public/api/process-observation`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.get(url, {headers})
    
      console.log(rtdo.data.data)
      setData((rtdo.data.data).filter(artista=> artista.owner_process.proyect.propertyId === (dataProperty.id).toString()))

    //   setData(rtdo.data)
    }
console.log(data);
console.log(dataProperty.id);
    useEffect(() => {
        setdataUser(JSON.parse(localStorage.getItem('user')))
        setDataProperty(JSON.parse(localStorage.getItem('propiedad')))
      }, []);
    
    console.log(data); 
  useEffect(() => {
   buscarTipo()
  }, [dataUser]);


  const styles= useStyles();

  
  const bodyDetails =(
    <div className={styles.modal}>
        <div className="estilosmodalDetails">
   
            <h1 className="text-center mt-3">{info&&info.title}</h1>
            <h5 className="mt-5 ">Fecha: <span className="text-secondary">{info&&info.publicationDate}</span></h5>
            <h5  className="mt-3 " > Detalle: <span className="text-secondary">{info&&info.description}</span></h5>
            <div className="d-flex justify-content-center mt-5">
              <a href={"https://back2.tinpad.com.pe/public/" + info.file} target="_blank"  className="linkdownload" >
                  <i className="material-icons file_download">file_download</i></a>
            </div>
            <div className="d-flex justify-content-center mt-5"><button className="btn1" onClick={()=>abrirCerrarModalDetails()}>Volver</button></div>

        </div>
    </div>
    )

    const seleccionarUser=(user, caso)=>{

        setInfo(user);
        // console.log(info.property.block);
        abrirCerrarModalDetails()
    
      }
// console.log(info);

    return <div className="Contenedor" >

      <div className='verde text-center'>  <h1>Respuestas a Quejas o Reclamos</h1></div>
      <div className='blanco'>

      { loading ?  <Box sx={{ position: 'absolute' , left: 170, top:400, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}
     {data.map(casa => (  <div>
        <div className="seccion">
          <div className="row mt-3">
            <h2>Tramite: {casa.owner_process.proyect.name}</h2>

            <div className="row mt-3">
                       <div className=" text-gray-600">
              <h6 className="Item-Title">Fecha: {moment(casa.created_at).format("YYYY-MM-DD")} </h6>
              <h6 className="Item-Title">Descripción: {casa.description}</h6>
              <div className="d-flex justify-content-center mt-3">
                <a href={"https://back2.tinpad.com.pe/public/" + casa.attached} target="_blank"  className="linkdownload" >
                    <i className="material-icons file_download">file_download</i></a>
              </div>
              </div>
            </div>

            <div className="boton-centrar">
    
              </div>
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

export default RespuestaReclamo;
