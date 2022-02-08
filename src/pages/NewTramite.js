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

function NewTramite() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [respuesta, setRespuesta] = useState("");
  const [showModalInsertar, setShowModalInsertar] = useState(false);
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

  const{description, title} = info;

  console.log(info);
    
  const abrirCerrarModalDetails=()=>{
    setShowModalDetails(!showModalDetails);
  }
    const buscarTipo = async() => {
          
      const url = `https://back2.tinpad.com.pe/public/api/new-release`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.get(url, {headers})
      setdataUser(JSON.parse(localStorage.getItem('user')))
      console.log(rtdo.data.data)
      setData((rtdo.data.data).filter(artista=> artista.typeReleaseId === "10"))

    //   setData(rtdo.data)
    }
    
    console.log(data); 
  useEffect(() => {
   buscarTipo()
  }, []);

//   const onSubmitInsertar = (e) => {

//     e.preventDefault();

//     if (description.trim() === "") {
    
//      setError(true);
//      return
//     }else {
//         setError(false);

//         peticionPost2()
//         setInfo({
//           consume: "",
          
//         });

        // set1
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
    //     abrirCerrarModalInsertar()
    //     buscarCotizacion()
    //     buscarTotalLight()
    //     SaveData()
    // }
//     setTimeout(() => {
//       SaveData()
//     }, 2000);
    
// }
  const styles= useStyles();

  
  const bodyDetails =(
    <div className={styles.modal}>
        <div className="estilosmodalDetails">
   
            <h1 className="text-center mt-3">{info&&info.title}</h1>
            <h5 className="mt-3 ">Fecha: <span className="text-secondary">{info&&info.publicationDate}</span></h5>
            <h5  className="mt-3 " > Detalle: <span className="text-secondary">{info&&info.description}</span></h5>
            <a href={"https://back2.tinpad.com.pe/public/" + info.file} target="_blank"  className="linkdownload" >
                <i className="material-icons file_download">file_download</i></a>
        </div>
    </div>
    )

    const seleccionarUser=(user, caso)=>{

        setInfo(user);
        // console.log(info.property.block);
        abrirCerrarModalDetails()
    
      }
// console.log(info);
    
const abrirCerrarModalInsertar = () => {
          
    setShowModalInsertar(!showModalInsertar)
  }

  const handleChangeInsert = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
  })

  }

    return <div className="Contenedor" >

      <div className='verde text-center'>  <h1>Registrar Trámite</h1></div>
      <div className='blanco'>


      <form action="" >
          <div className={styles.modal}>
            <h3 className="my-5">Agregar detalles de Consumo y gestión</h3>
          
            <label htmlFor="">Monto total*</label> <br />
            <input type="number" name="amount" onChange={handleChangeInsert}  label="Monto total*" type="number" step="any"/>
              <br />
              <br />
              <label htmlFor="">Costo Unitario kw*</label>
            <input className={styles.inputMaterial} name="consume" onChange={handleChangeInsert} label="Costo Unitario kw*" type="number" step="any"/>
         <br />
              <br />
              
           
              
            <br /><br />
            <div align="right">
              <button color="primary" type="submit" >Insertar</button>
              <button onClick= {abrirCerrarModalInsertar}> Cancelar</button>
            </div>
          </div>
        </form>



    
   
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

export default NewTramite;
