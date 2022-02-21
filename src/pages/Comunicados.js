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
      width: 400,
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

function Comunicados() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [respuesta, setRespuesta] = useState("");
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
    const buscarTipo = async() => {

      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000);
        
          
      const url = `https://back2.tinpad.com.pe/public/api/new-release`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.get(url, {headers})
      setdataUser(JSON.parse(localStorage.getItem('user')))
      console.log(rtdo.data.data)
      setData((rtdo.data.data).filter(artista=> artista.typeReleaseId === "11"))

    //   setData(rtdo.data)
    }
    
    console.log(data); 
  useEffect(() => {
   buscarTipo()
  }, []);


  const styles= useStyles();

  
  const bodyDetails =(
    <div className={styles.modal}>
        <div className="estilosmodalDetails">
   
            <h2 className="text-center">{info&&info.title}</h2>
            <div className="mt-4 text-gray-600">
              <h6 >Fecha: {moment(info&&info.publicationDate).format("DD-MM-YYYY")}</h6>
              <h6 className="mt-3"> Descripción: {info&&info.description}</h6>
            </div>
            <div className="mt-3 text-center">
              <a href={"https://back2.tinpad.com.pe/public/" + info.file} target="_blank"  className="linkdownload" >
                  <i className="material-icons file_download">file_download</i></a>
            </div>


        </div>

        <div className="d-flex justify-content-center mt-3"><button className="btn1" onClick={()=>abrirCerrarModalDetails()}>Volver</button></div>

    </div>
    )

    const seleccionarUser=(user, caso)=>{

        setInfo(user);
        // console.log(info.property.block);
        abrirCerrarModalDetails()
    
      }
// console.log(info);

    return <div className="Contenedor" >

      <div className='verde text-center'>  <h1>Comunicados</h1></div>
      <div className='blanco'>
      { loading ?  <Box sx={{ position: 'absolute' , left: 170, top:400, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}

    {data.map(casa => (  <div>
        <div className="seccion">
          <div className="row mt-3">
          <h5>Fecha: {moment(casa.publicationDate).format("DD-MM-YYYY")} </h5>
         

            <div className="row mt-3">
                   
                <div className="row ">
                <div className="d-flex justify-content-between">
                    <h3 className="Item-Title">{casa.title}</h3>
               <button className="linkdownload" onClick={()=>seleccionarUser(casa) }><i className="material-icons visibility">visibility</i></button>
               <a href={"https://back2.tinpad.com.pe/public/" + casa.file} target="_blank"  className="linkdownload" ><i className="material-icons file_download">file_download</i></a>
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

export default Comunicados;
