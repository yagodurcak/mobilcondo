import "../pages/general.css"
import "react-datepicker/dist/react-datepicker.css";

import {Button, Modal, TextField} from '@material-ui/core';
import DatePicker, { registerLocale }  from 'react-datepicker';
import {
  Link,
  NavLink,
} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';

import ModalDetails from "../components/ModalDetails";
import axios from "axios"
import es from "date-fns/locale/es"; // the locale you want
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment";
import { userContext } from "../context/UserContext"

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
    const [data, setData] = useState(null);
    const [propietario, setPropietario] = useState({});
    const [listo, setListo] = useState(false);
    const [error, setError] = useState(false);
    const [startDate, setStartDate] = useState();
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

  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Registra tus visitas  </h1></div>
    <div className='blanco'>
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

                    <h5 > Nombre: {casa.name}  {casa.lastName}</h5>
                    <div className="d-flex justify-content-around">
                      <p className="Item-Title">Documento: <span className="Item-Description">{casa.document}</span></p>
                      <p className="Item-Title">Placa: <span className="Item-Description">{casa.licensePlate}</span></p>
                      <p className="Item-Title">Fecha: <span className="Item-Description">{moment(casa.date).format("DD-MM-YYYY")}</span></p>
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
  </div>;
}

export default Visitas;
