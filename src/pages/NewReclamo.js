import "../pages/general.css"

import {Button, Modal, TextField} from '@material-ui/core';
import {
  Link,
  NavLink,
} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from 'react';

import AgregarEvento from '../components/AgregarEvento'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import ModalDetails2 from "../components/ModalDetails2";
import {Redirect} from 'react-router-dom';
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
      height: "100%",
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

function NewReclamo() {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const calendarRef = useRef(null)
  const [dataProperty, setDataProperty] = useState({})
  const { dataUser, setdataUser } = useContext(userContext);
  const [respuesta, setRespuesta] = useState("");
  const [showModalInsertar, setShowModalInsertar] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedFilesPost, setSelectedFilesPost] = useState();
  const [error, setError] = useState(false);
  const [projectId, setprojectId] = useState("");
  const [processId, setProcessId] = useState("");
  const [listoProyecto, setListoProyecto] = useState(false);
  const [listoProyecto2, setListoProyecto2] = useState(false);
  const [redirect, setRedirect] = useState(false);
const [exito, setExito] = useState(false);
// const [dataProperty, setDataProperty] = useState({}) 
  const [info, setInfo] = useState({
    name: "",
    description: "",
    type:"" 

  })

  useEffect(() => {
    setdataUser(JSON.parse(localStorage.getItem('user')))
    setDataProperty(JSON.parse(localStorage.getItem('propiedad')))

   }, []);

  const fechaActual = new Date
const fechaActual1 = moment(fechaActual).format("YYYY-MM")
const fechaActual2 = moment(fechaActual).format("YYYY-MM-DD")


  const{description, name} = info;

  console.log(info);

   


  const styles= useStyles();



  const handleChangeInsert = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
  })

  }
  const peticionPost=async()=>{
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

  }



      await axios.post("https://back2.tinpad.com.pe/public/api/project", {...info, propertyId:dataProperty.id}, {headers})
      .then(response=>{
        console.log(response.data.data.id);
        // abrirCerrarModalInsertar();
        setprojectId(response.data.data.id)
        setListoProyecto(true)
      }).catch(error=>{
        console.log(error);
      })

    }

    


    
    const proyectoID = projectId
    console.log(proyectoID);

  const peticionPost2=async()=>{
    console.log("post2");
  
    const f = new FormData()   
  
  
    
    console.log(projectId);    // console.log(selectedFilesPost.length > 0);
      

  
  
        // f.append("propertyId", null)
        f.append("title", info.name)
        f.append("proyectDate", info.publicationDate)
        f.append("description", info.description)
        f.append("proyectId", projectId)
        f.append("stateId", "3")
        f.append("type", info.type)
        
  
   
   
  
      const headers = {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
  
      const url1= "https://back2.tinpad.com.pe/public/api/owner-process"
        await axios.post(url1, f, {headers})
        .then(response=>{
          // setdata(data.concat(response.data));
          setProcessId(response.data.data.id)
          setListoProyecto2(true)

          console.log("exito -1");
        }).catch(error=>{
          console.log(error);

        })
     
    }
  const peticionPost3=async()=>{
    console.log("post3");
  
    const f = new FormData()   

        f.append("file", selectedFilesPost)
        f.append("subject", info.name)
        f.append("description", info.description)
        f.append("propertyId", dataProperty.id)
        f.append("stateId", "3")
        f.append("type", info.type)
      const headers = {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
  
      const url1= "https://back2.tinpad.com.pe/public/api/complaint-claim"
        await axios.post(url1, f, {headers})
        .then(response=>{
          // setdata(data.concat(response.data));
          setRespuesta(response.data.message)
          console.log(response.data.message);
          setSelectedFilesPost()
          console.log("exito -1");
          setExito(true)
          setTimeout(() => {
            setExito(false)
          }, 2000);
          setTimeout(() => {
            
            setRedirect(true)
          }, 2000);
        }).catch(error=>{
          console.log(error);
  
          setSelectedFilesPost()
        })

        setListoProyecto2(false)
        setListoProyecto(false)
        
  
    }


    const onSubmitInsertar = (e) => {

      e.preventDefault();

      if (name.trim() === ""  ) {
      
       setError(true);
       return
      }else {
          setError(false);

          peticionPost3()  


      }      
  }
//   useEffect(() => {
//     peticionPost2()
//   }, [listoProyecto]);
//   useEffect(() => {
//     peticionPost3()
//   }, [listoProyecto2]);



  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      console.log(e.target.files[0]);
      setSelectedFilesPost(e.target.files[0])
    }
};

const removeSelectedImage = () => {
  setSelectedImage();
};

const gustos = [
  { value:'Queja', label: 'Queja' },
  { value: 'Reclamo' , label: 'Reclamo' }
]


if (redirect) {
  return <Redirect to="/TramitesyQuejas"/>;
}


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

    <div className='verde text-center'>  <h1>Registrar Queja o Reclamo</h1></div>
    <div className='blanco'>


      <form action="" onSubmit={onSubmitInsertar}>
        <div className="px-5 pt-4" >

          {error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null}
          <TextField className={styles.inputMaterial} name="name" onChange={handleChangeInsert} label="Titulo*" />
          <br />
          <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} label="Descripción*" />

          <br />
          <select name="type" className="mt-4" onChange={handleChangeInsert}>

            <option value=""> Seleccione queja o reclamo</option>
            {gustos.map(fbb =>
              <option key={fbb.value} value={fbb.value}>{fbb.label}</option>
            )};
          </select>

         
          <div className='mt-5'>

            <input type="file" onChange={imageChange} id="file" name='file' />
            <div className="label-holder">
              <label htmlFor="file" className="label1">
                <i className="material-icons">attach_file</i>
              </label>
            </div>
          </div> <br />


          {selectedImage && (
            <div className='eliminarImg'>
              <h6 ><span className="detailsInfo">{info && info.title}</span></h6>
              <img
                src={URL.createObjectURL(selectedImage)}
                className='foto1'
                alt="Thumb"
              />
              <button onClick={removeSelectedImage} style={styles.delete}>
                Eliminar
              </button>
            </div>
          )}
          <br /><br />
          <div className="d-flex justify-content-between" >
            <button className="btn1" type="submit" >REGISTRAR</button >
            <button className="btn1">     <Link to="/Reclamos" style={{ textDecoration: 'none' }}>
                <NavLink className="text-white" to="/Reclamos" activeClassName='is-active' style={{ textDecoration: 'none' }}>
                 CANCELAR
               
                </NavLink>
              </Link></button>
          </div>
        </div>
      </form>





    </div>


  </div>;
}

export default NewReclamo;
