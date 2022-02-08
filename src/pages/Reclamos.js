import "../pages/general.css"

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
  const [dataProperty, setDataProperty] = useState({})
  const [dataProject, setDataProject] = useState({});


  const [info, setInfo] = useState({
    subject: "",
    description: "",
    attached:""     

  })

  // console.log(info);
    
  const abrirCerrarModalDetails=()=>{
    setShowModalDetails(!showModalDetails);
  }
    const buscarTipo = async() => {
          
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



  const styles= useStyles();

  
  const bodyDetails =(
    <div className={styles.modal}>
        <div className="estilosmodalDetails">
    
                <h1 className="text-center">{info&&info.subject}</h1>
                <h5>Descripción: {info&&info.description}</h5>
                <h5 >Estado: {info.state&&info.state.name}</h5>
                {/* <h5 >Actualización: {(info.state&&info.state.updated_at).slice(0,10).split(" ")[0].split("-").reverse().join("-")}</h5> */}
                <div className="d-flex">
                    <h5>Descargar: </h5>
                    <a href={"https://back2.tinpad.com.pe/public/" + info.attached} target="_blank"  className="linkdownload" >
                        <i className="material-icons file_download">file_download</i></a>
                </div>
                <div className="text-center mt-3">
                <button className="btn1 text-center">Ver Respuesta</button>

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

    {data.map(casa => (  <div key={casa.id}>
        <div className="seccion">
          <div className="row mt-3 ">
            <div className="d-flex justify-content-between">
              <h3 key={casa.id}>{casa.subject}</h3>
                <button className="linkdownload mr-5" onClick={()=>seleccionarUser(casa) }><i className="material-icons visibility">visibility</i></button>
            </div>

            <div className="row mt-3">
      
        
                <div className="row ">
                <div className="d-flex justify-content-between">
                    <h6 className="Item-Title">Fecha: {(casa.created_at).slice(0,10).split(" ")[0].split("-").reverse().join("-")}</h6>
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
    
  </div>;
}

export default Reclamos;
