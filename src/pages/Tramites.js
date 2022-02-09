import "../pages/general.css"

import {
  Link,
  NavLink,
} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from 'react';

import AgregarEvento from '../components/AgregarEvento'
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
        height: "80%",
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

  function Tramites() {
    const [modalOpen, setModalOpen] = useState(false)
    const [data, setData] = useState([])
    const calendarRef = useRef(null)
    const { dataUser, setdataUser } = useContext(userContext);
    const [respuesta, setRespuesta] = useState("");
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [dataProperty, setDataProperty] = useState({})
    const [dataProject, setDataProject] = useState({});

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
      publicationDate: "",     

    })

    // console.log(info);
      
    const abrirCerrarModalDetails=()=>{
      setShowModalDetails(!showModalDetails);
    }
    // const buscarRespuesta = async() => {
            
    //   const url = `https://back2.tinpad.com.pe/public/api/process-observation`;
  
    //   const headers = {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' +  localStorage.getItem('Authorization')
    //   } 
  
    //   const rtdo = await axios.get(url, {headers})
    //   console.log(rtdo.data.data)
    //   setData((rtdo.data.data).filter(artista=> artista.proyect.propertyId === (dataProperty.id).toString()))

    // }
      const buscarTipo = async() => {
            
        const url = `https://back2.tinpad.com.pe/public/api/owner-process`;
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
        } 
    
        const rtdo = await axios.get(url, {headers})
        // setdataUser(JSON.parse(localStorage.getItem('user')))
        // console.log(rtdo.data.data)
        setData((rtdo.data.data).filter(artista=> artista.proyect.propertyId === (dataProperty.id).toString()))

      //   setData(rtdo.data)
      }

      
      console.log(data); 
      console.log(dataProperty.id); 
      useEffect(() => {
        setdataUser(JSON.parse(localStorage.getItem('user')))
        setDataProperty(JSON.parse(localStorage.getItem('propiedad')))
      }, []);
    useEffect(() => {
    buscarTipo()
    }, [dataUser]);



    const styles= useStyles();

    
    const bodyDetails =(
      <div className={styles.modal}>
          <div className="estilosmodalDetails">
    
              <h1 className="text-center mt-5">{info.proyect&&info.proyect.name}</h1>
              <div className="text-gray-600 mt-5">
                <h5 className="mt-4" >Descripción: {info.proyect&&info.proyect.description}</h5>
                <h5 className="mt-3" >Estado: {info.state&&info.state.name}</h5>
                <h5 className="mt-3" >Fecha: {info&&info.proyectDate}</h5>
                {/* <h5 className="mt-3" >Adjunto: {info.attachments[0]&&info.attachments.id}.path</h5> */}
                <div className="mt-4 text-center d-flex justify-content-between">

                </div>
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

        <div className='verde text-center'>  <h1>Tramites</h1></div>
        <div className='blanco'>

        <div className="d-flex justify-content-between">
          <div className="mx-3 py-3 text-end">
            <button className="btn2">
              <Link to="/NewTramite" style={{ textDecoration: 'none' }}>
                  <NavLink className="logoContainter1 text-white" exact to="/NewTramite" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
          
                    REGISTRAR TRAMITE
          
                  </NavLink>
                </Link></button></div>
          <div className="mx-3 py-3 text-end">
            <button className="btn2">
              <Link to="/RespuestaTramites" style={{ textDecoration: 'none' }}>
                  <NavLink className="logoContainter1 text-white" exact to="/RespuestaTramites" activeClassName="linkactivo" style={{ textDecoration: 'none' }}>
          
                    RESPUESTAS A TRAMITES
          
                  </NavLink>
                </Link></button></div>
        </div>


      {data.map(casa => (  <div>
          <div className="seccion">
            <div className="row mt-3 ">
              <div className="d-flex justify-content-between">
                <h6>Fecha: {casa.proyectDate}</h6>
              </div>

              <div className="row mt-3">
        
          
                  <div className="row ">
                  <div className="d-flex justify-content-between">
                      <h5 className="Item-Title">Titulo: {casa.proyect.name}</h5>
                      <button className="linkdownload " onClick={()=>seleccionarUser(casa) }><i className="material-icons visibility">visibility</i></button>
                                {/* <a href={"https://back2.tinpad.com.pe/public/" + casa.file} target="_blank"  className="linkdownload" ><i className="material-icons file_download">file_download</i></a> */}
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

  export default Tramites;
