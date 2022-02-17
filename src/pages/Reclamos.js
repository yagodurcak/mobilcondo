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
import ModalDetails5 from "../components/ModalDetails5";
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

function Reclamos() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [respuesta, setRespuesta] = useState("");
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModalDetails5, setShowModalDetails5] = useState(false);
  const [dataProperty, setDataProperty] = useState({})
  const [dataProject, setDataProject] = useState({});
  const [loading, setLoading] = useState(false);
 const [asoc, setAsoc] = useState({
  subject: "",
  description: ""     

});

  const [info, setInfo] = useState({
    subject: "",
    description: "",
    attached:""     

  })

  // console.log(info);
    
  const abrirCerrarModalDetails=()=>{
    setShowModalDetails(!showModalDetails);
  }
  const abrirCerrarModalDetails5=()=>{
    setShowModalDetails5(!showModalDetails5);
  }
    const buscarTipo = async() => {

      
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000);
        
          
      const url = `https://back2.tinpad.com.pe/public/api/complaint-claim`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.get(url, {headers})
      // setdataUser(JSON.parse(localStorage.getItem('user')))
      console.log(rtdo.data.data)
      setData(rtdo.data.data)

    //   setData(rtdo.data)
    }

    

    useEffect(() => {
      setdataUser(JSON.parse(localStorage.getItem('user')))
      setDataProperty(JSON.parse(localStorage.getItem('propiedad')))
    }, []);
  useEffect(() => {
  buscarTipo()
  }, [dataUser]);

  const buscarRespuesta = async () => {
    abrirCerrarModalDetails5()
  

      const url = `https://back2.tinpad.com.pe/public/api/response-association`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.get(url, {headers})
      setAsoc((rtdo.data.data).filter(artista=> artista.complaintClaimId === (info.id).toString()))
      console.log(rtdo.data.data)
      // setData(rtdo.data.data)

  }
  const buscarRespuesta2 = async () => {
    
  

      const url = `https://back2.tinpad.com.pe/public/api/response`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.get(url, {headers})
      const rtdo2 = ((rtdo.data.data).filter(artista=> artista.id === parseInt(asoc[0].responseComplaintClaimId)  ))
      setRespuesta(rtdo2[0])
      console.log(rtdo.data.data)
      // setData(rtdo.data.data)

  }
console.log(respuesta);
  const styles= useStyles();
 useEffect(() => {
  buscarRespuesta2()
 }, [asoc]);
  
  const bodyDetails5 =(
    <div className={styles.modal}>
        <div className="estilosmodalDetails">
    
                <h1 className="text-center">Respuesta</h1>
                <div className="text-gray-600">
               
                  <h5>Descripcións: {respuesta&&respuesta.subject}</h5>
                
                  {/* <h5 >Actualización: {(info.state&&info.state.updated_at).slice(0,10).split(" ")[0].split("-").reverse().join("-")}</h5> */}
                  <div className="d-flex">
                      <h5>Descargar: </h5>
                      
                      {/* <a href={"https://back2.tinpad.com.pe/public/" + respuesta.attached} target="_blank"  className="linkdownload" >
                          <i className="material-icons file_download">file_download</i></a> */}
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                <button className="btn1 text-center" onClick={()=>abrirCerrarModalDetails5()} >Volver</button>
                {/* <button className="btn1 text-center" >Ver respuesta</button> */}

                </div>


        </div>
    </div>
    )
  const bodyDetails =(
    <div className={styles.modal}>
        <div className="estilosmodalDetails">
    
                <h1 className="text-center">{info&&info.subject}</h1>
                <div className="text-gray-600">
               
                  <h5>Descripción: {info&&info.description}</h5>
                  <h5 >Estado: {info.state&&info.state.name}</h5>
                  {/* <h5 >Actualización: {(info.state&&info.state.updated_at).slice(0,10).split(" ")[0].split("-").reverse().join("-")}</h5> */}
                  <div className="d-flex">
                      <h5>Descargar: </h5>
                      <a href={"https://back2.tinpad.com.pe/public/" + info.attached} target="_blank"  className="linkdownload" >
                          <i className="material-icons file_download">file_download</i></a>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                <button className="btn1 text-center" onClick={()=>abrirCerrarModalDetails()} >Volver</button>
                <button className="btn1 text-center" onClick={()=>buscarRespuesta()} >Ver respuesta</button>

                </div>


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

      <div className='verde text-center'>  <h1>Quejas y Reclamos</h1></div>
      <div className='blanco'>
      { loading ?  <Box sx={{ position: 'absolute' , left: 170, top:400, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}
      <div className="d-flex justify-content-between">
          <div className="mx-3 py-3 text-end">
            <button className="btn2">
              <Link to="/NewReclamo" style={{ textDecoration: 'none' }}>
                  <NavLink className="logoContainter1 text-white" exact to="/NewReclamo" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
          
                    REALIZAR QUEJA O RECLAMO
          
                  </NavLink>
                </Link></button></div>
 
        </div>

    {data.map(casa => (  <div key={casa.id}>
        <div className="seccion">
          <div className="row mt-3 ">
            <div className="d-flex justify-content-between">
              
                    <h3 className="Item-Title">Fecha: {(casa.created_at).slice(0,10).split(" ")[0].split("-").reverse().join("-")}</h3>
                <button className="linkdownload mr-5" onClick={()=>seleccionarUser(casa) }><i className="material-icons visibility">visibility</i></button>
            </div>

            <div className="row mt-3">
      
        
                <div className="row ">
                <div className="d-flex justify-content-between">
              <h6 key={casa.id}>{casa.subject}</h6>
                    <h6 className="Item-Title">Estado: {casa.state.name}</h6>
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
    <ModalDetails5
            showModalDetails={showModalDetails5}
            functionShow= {abrirCerrarModalDetails5}
            // handleChangeInsert={handleChangeInsert}
            // onSubmitEditar={onSubmitEditar}
            info={asoc}
            bodyDetails={bodyDetails5}
            />
    
  </div>;
}

export default Reclamos;
