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

function Telefonos() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
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
          
      const url = `https://back2.tinpad.com.pe/public/api/useful-information`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.get(url, {headers})
      setdataUser(JSON.parse(localStorage.getItem('user')))
      console.log(rtdo.data.data)
      setData((rtdo.data.data).filter(artista=> (artista.phone !== null && artista.phone !== "1")));

    //   setData(rtdo.data)
    }
    
    console.log(data); 
  useEffect(() => {
   buscarTipo()
  }, []);


  const styles= useStyles();

  
  const bodyDetails =(
    <div className={styles.modal}>
        <div className="estilosmodalDetails text-center">
   
            <h2 className="text-center">{info&&info.title}</h2>
            <h6 className="text-center">{info&&info.publicationDate}</h6>
            <h6 className="text-center">{info&&info.description}</h6>
            <a href={"https://back2.tinpad.com.pe/public/" + info.attached} target="_blank"  className="linkdownload" >
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

    return <div className="Contenedor" >

      <div className='verde text-center'>  <h1>Teléfonos</h1></div>
      <div className='blanco'>
      <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Concepto</th>
                      <th scope="col">Teléfono</th>
                     
              
                    </tr>
                  </thead>
                  <tbody>
                  {data.map(casa => (

                    <tr>
                      <th scope="row"> <p className="text-gray-600">{casa.description}:</p></th>
                      <td>{casa.phone}</td>

                   
                    </tr>

))}
              
                  </tbody>
                </table>

                    



    
   
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

export default Telefonos;
