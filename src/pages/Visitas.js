import "../pages/general.css"
import "react-datepicker/dist/react-datepicker.css";

import {Button, Modal, TextField} from '@material-ui/core';
import DatePicker, { registerLocale }  from 'react-datepicker';
import {
  Link,
  NavLink,
} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ModalDetails from "../components/ModalDetails";
import ModalDetails2 from "../components/ModalDetails2";
import axios from "axios"
import es from "date-fns/locale/es"; // the locale you want
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment";
import { userContext } from "../context/UserContext"
import { format } from 'date-fns';
// i    mport Visita from "../IMG/Visitacomunes.png"
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
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

function Visitas() {

    const styles= useStyles();
    const { dataUser, setdataUser } = useContext(userContext);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalInsertar2, setShowModalInsertar2] = useState(false);
    const [data, setData] = useState(null);
    const [propietario, setPropietario] = useState({});
    const [listo, setListo] = useState(false);
    const [error, setError] = useState(false);
    const [startDate, setStartDate] = useState();
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({

        name: "",
        lastName: "",
        document:"",
        licensePlate:"",
 
        quantity: "10"
        
      })

      const{document, lastName,  name, date } = info;

      const dataUserFn = () => {
          setdataUser(JSON.parse(localStorage.getItem('user')))
          
      }
      useEffect(() => {
     dataUserFn()
      }, []);

      const buscarTipo = async() => {

        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000);
          
        const url = `https://back2.tinpad.com.pe/public/api/guest`;
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
            }
    
    
        const rtdo = await axios.get(url, {headers})
    
      
        console.log(rtdo.data.data);
        setData((rtdo.data.data).filter(artista=> artista.propertyId === propietario.propertyId));
        // setData(rtdo.data.data)
        setListo(true)
      }
console.log(data);

      const buscarPropietario = async() => {
          
        const url = `https://back2.tinpad.com.pe/public/api/property-user`;
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
            }
    
    
        const rtdo = await axios.get(url, {headers})
            const rtdo2 = ((rtdo.data.data).filter(artista=> artista.user.id === dataUser.id));
            // setData(rtdo.data.data)
            setPropietario(rtdo2[0])
   


      }
      console.log(propietario);
      useEffect(() => {
        buscarPropietario()
      }, [dataUser]);
      
      useEffect(() => {
       buscarTipo()
      }, [propietario]);
      const abrirCerrarModalInsertar = () => {
          
        setShowModalInsertar(!showModalInsertar)
      }
      const abrirCerrarModalInsertar2 = () => {
          
        setShowModalInsertar2(!showModalInsertar2)
      }




    const peticionPost=async()=>{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }


      const fechas = moment(startDate).format("YYYY-MM-DD")
          await axios.post("https://back2.tinpad.com.pe/public/api/guest", {...info, propertyId: propietario.propertyId, date: fechas}, {headers})
          .then(response=>{
            // setdata(data.concat(response.data));
            // abrirCerrarModalInsertar();
          }).catch(error=>{
            console.log(error);
          })
    
      
      
        }

        const handleChangeInsert = (e) => {
            setInfo({
              ...info,
              [e.target.name]: e.target.value
          })
      
          }
        const onSubmitInsertar = (e) => {
    
            e.preventDefault();
    
            if (document.trim() === "" || lastName.trim() === "" ||name.trim() === "") {
            
             setError(true);
             return
            }else {
                setError(false);
    
                peticionPost()
                setInfo({
       
                  name: "",
                  lastName: "",
                  document:"",
                  licensePlate:"",
                  quantity: "10"
                });
    
                // set1
                // setTimeout(() => {
                //   window.location.reload();
                // }, 1000);
                abrirCerrarModalInsertar()
                dataUserFn()
            }
            
        }

        const gustos = [
            { value: '3', label: 'Visita' },
            { value: '7', label: 'Proveedor' }
          ]
          registerLocale("es", es); // register it with the name you want

          const bodyAgregar=(
            <div className={styles.modal}>
              <form action="" onSubmit={onSubmitInsertar}>
                <div className="grid1 mt-4">

                  {error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null}
                  <TextField name="name" onChange={handleChangeInsert} label="Nombres*" />
                  <br />
                  <TextField name="lastName" onChange={handleChangeInsert} label="Apellidos*" />
                  <br />
                  <TextField name="document" onChange={handleChangeInsert} label="Doc. de Identidad*" />
                  <br />
                  <TextField name="licensePlate" onChange={handleChangeInsert} label="Patente*" />

                  <div>
                              <label htmlFor="" className='mt-3 label'>Fecha</label>  
                              <div className="border">
                              <DatePicker 
                              selected={startDate} 
                         
                              onChange={(date) => setStartDate(date)} 
                              inline />
                                                  </div>
                          </div>


          
                  {/* <input type="text" className={styles.inputMaterial} name="role" value="2" className="hide" onChange={handleChangeInsert}/> */}
                  {/* <input type="text" className={styles.inputMaterial} name="role" value="2" className="hide" onChange={handleChangeInsert}/> */}
                  <br /><br />
                  <div align="right">
                    <Button color="primary" type="submit" >Insertar</Button>
                    <Button onClick={()=>abrirCerrarModalInsertar()}> Cancelar</Button>
                  </div>
                </div>
              </form>

            </div>
          )

            
  const bodyDetails =(
    <div className={styles.modal}>
        <div className="estilosmodalDetails">
            <h1 className="text-center">Detalle de Visita</h1>
            <div className="mt-4 text-gray-600">
              <h4>Fecha de Visita: {moment(info&&info.date).format("DD-MM-YYYY")}</h4>
              <h4>Nombre: {info&&info.name}</h4>
              <h4>Apellido: {info&&info.lastName}</h4>
              <h4>Placa: {info&&info.licensePlate}</h4>
              <h4>Documento: {info&&info.document}</h4>
            </div>
            <div className="d-flex justify-content-center mt-5"><button className="btn1" onClick={()=>abrirCerrarModalInsertar2()}>Volver</button></div>
        </div>
    </div>
    )

    
    const seleccionarUser=(user, caso)=>{

      setInfo(user);
      // console.log(info.property.block);
      abrirCerrarModalInsertar2()
  
    }

  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Registra tus visitas  </h1></div>
    <div className='blanco'>
    { loading ?  <Box sx={{ position: 'absolute' , left: 170, top:400, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}
      <div className="container">
      <h1 className="text-center pt-5">Historial de Invitados</h1>

        <div className="d-flex justify-content-end"><button className="btn2 mt-3" onClick={()=>abrirCerrarModalInsertar()}>Agregar Invitado</button></div>
          {listo ?
            <div>
              {data.map(casa => (<div>
                <div className="seccion">
                  <div className="row mt-3">

                  </div>
                  <div className="row mt-3">

                    <div className="d-flex justify-content-between">

                      <h5 > Fecha: <span className="grisdesc">{moment(casa.date).format("DD-MM-YYYY")}</span></h5>
                      <button className="linkdownload"  onClick={()=>seleccionarUser(casa)}><i className="material-icons visibility">visibility</i></button>
                    </div>
                      <h5 > Nombre: <span className="grisdesc">{casa.name}  {casa.lastName}</span></h5>

                    <div>

                    </div>
                    <div className="d-flex justify-content-around">
                    </div>


                  </div>

                </div>
                <hr className="linea-seccion2"></hr>
              </div>))}
            </div>

            : null}
      </div>

    </div>
    <ModalDetails
            showmodalInsertar={showModalInsertar}
            functionShow= {abrirCerrarModalInsertar}
            handleChangeInsert={handleChangeInsert}
            onSubmitInsertar={onSubmitInsertar}
            error={error}
            bodyAgregar={bodyAgregar} 
            
            />
        <ModalDetails2
            showModalDetails={showModalInsertar2}
            functionShow= {abrirCerrarModalInsertar2}
            // handleChangeInsert={handleChangeInsert}
            // onSubmitEditar={onSubmitEditar}
            info={info}
            bodyDetails={bodyDetails}
            />
  </div>;
}

export default Visitas;
