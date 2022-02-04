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

function Proveedores() {

    const styles= useStyles();
    const { dataUser, setdataUser } = useContext(userContext);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [data, setData] = useState(null);
    const [propietario, setPropietario] = useState({});
    const [listo, setListo] = useState(false);
    const [error, setError] = useState(false);
    const [startDate, setStartDate] = useState(new Date);
    const [selectedPdf, setSelectedPdf] = useState();
    const [selectedPdfPost, setSelectedPdfPost] = useState([]);
    const [selectedFilesPost, setSelectedFilesPost] = useState([]);
    const [listo1, setListo1] = useState(false)
    const [info, setInfo] = useState({

        name: "",
     
        document:"",
        licensePlate:"",
        startingdate:"",
        endingdate:"",
        sctr:"",
        quantity: "",
        type:""
        
      })
      const pdfChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedPdf(e.target.files[0].name);
          console.log(e.target.files[0]);
          setSelectedPdfPost(e.target.files[0])
          setListo1(true)

        }

    };

      const{document, lastName,  name, date } = info;

      const dataUserFn = () => {
          setdataUser(JSON.parse(localStorage.getItem('user')))
          
      }
      useEffect(() => {
     dataUserFn()
      }, []);

      const buscarTipo = async() => {
          
        const url = `https://back2.tinpad.com.pe/public/api/guest-provider`;
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
            }
    
    
        const rtdo = await axios.get(url, {headers})
    
      
        console.log(rtdo.data.data);
        setData((rtdo.data.data).filter(artista=> artista.user.id === dataUser.id));
        // setData(rtdo.data.data)
        setListo(true)
      }
console.log(data);
console.log(dataUser.id);

      
      useEffect(() => {
       buscarTipo()
      }, [dataUser]);
      const abrirCerrarModalInsertar = () => {
          
        setShowModalInsertar(!showModalInsertar)
      }



  

      const peticionPost=async()=>{
        console.log(endDate);

        const fechas = moment(startDate).format("YYYY-MM-DD")
        const fechas2 = moment(endDate).format("YYYY-MM-DD")
      
        const f = new FormData()   
      
      
        

                if (listo1 === true) {
                  
                  f.append("file", selectedPdfPost)
                  f.append("startingdate", fechas)
                  f.append("endingdate", fechas2)
                  f.append("name", info.name)
                  f.append("document", parseInt(info.document) ) 
                  f.append("quantity", info.quantity) 
                  f.append("userId", dataUser.id) 
                  f.append("type", info.type) 
                  f.append("visibility", "1") 
                }else{
                    f.append("startingdate", fechas)
                    f.append("endingdate", fechas2)
                    f.append("name", info.name)
                    f.append("document", parseInt(info.document) ) 
                    f.append("quantity", info.quantity) 
                    f.append("userId", dataUser.id) 
                    f.append("type", info.type) 
    
                }
      
      
  
            
      
          // console.log(f);
      
          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
      
          const url1= "https://back2.tinpad.com.pe/public/api/guest-provider"
            await axios.post(url1, f, {headers})
            .then(response=>{
              // setdata(data.concat(response.data));
              // abrirCerrarModalInsertar();
      
              setSelectedFilesPost([])
              console.log("exito -1");
            }).catch(error=>{
              console.log(error);
      
              setSelectedFilesPost([])
            })
      
        // console.log(filesImg);
          buscarTipo()
          setListo1(false)
        }

        const handleChangeInsert = (e) => {
            setInfo({
              ...info,
              [e.target.name]: e.target.value
          })
      
          }
        const onSubmitInsertar = (e) => {
    
            e.preventDefault();
    
            if (document.trim() === "" || name.trim() === "") {
            
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
        const removeSelectedPdf = () => {
            setSelectedPdf();
        };

        // console.log(startDate);
       
        const [endDate, setEndDate] = useState(new Date);
        const onChange = (dates) => {
          const [start, end] = dates;
          setStartDate(start);
          setEndDate(end);
          console.log(endDate);
        };
        const ChangeDate = (date) => {
            setStartDate(date);
            setEndDate(date);
        }
        

        const gustos = [
            { value: 'eventual', label: 'Eventual' },
            { value: 'permanente', label: 'Permanente' }
          ]
          registerLocale("es", es); // register it with the name you want

          const bodyAgregar=(
              <div className={styles.modal}>
                  <form action="" onSubmit={onSubmitInsertar}>
                      <div className="grid1 mt-4">

                          {error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null}
                          <TextField name="name" onChange={handleChangeInsert} label="Nombre y apellido*" />



                          <TextField name="document" onChange={handleChangeInsert} label="Doc. de Identidad*" />

                          <TextField name="licensePlate" onChange={handleChangeInsert} label="Patente*" />

                          <TextField name="quantity" type="number" onChange={handleChangeInsert} label="Cantidad de personas*" />

                          <TextField name="licensePlate" onChange={handleChangeInsert} label="Patente*" />


                          <select name="type" className="mt-4" onChange={handleChangeInsert}>

                              <option value=""> Seleccione tipo de visita</option>
                              {gustos.map(fbb =>
                                  <option key={fbb.value} value={fbb.value}>{fbb.value}</option>
                              )};
                          </select>
                          {info.type === "eventual" ? (
                          <div>
                              <h4 htmlFor="" className='mt-3 font-weight-bold'>Elige el día</h4>  
                              <div className="border">
                              <DatePicker 
                              selected={startDate} 
                              endDate={startDate}
                              onChange={(date) => ChangeDate(date)} 
                              inline />
                                                  </div>
                          </div>
         
                          ) : 
                          
                          
                          (<div>
                  
                              <h4 htmlFor="" className='mt-3 font-weight-bold'>ELige rango de días*</h4>

                              <div className="border">
                                      <DatePicker
                                          selected={startDate}
                                          onChange={onChange}
                                          startDate={startDate}
                                          endDate={endDate}
                                          selectsRange
                                          inline
                                      />                              </div>
                              {/* <label htmlFor="" className='mt-3 label'>Fecha de Fin*</label>


                              <div className="border mt-2">
                                  <input type="date" className={styles.inputMaterial} name="endingdate" onChange={handleChangeInsert} label="Fecha de Publicación*" />
                              </div>   */}
                              </div>)}

                          <div className=''>
                              <input type="file" onChange={pdfChange} id="file" name='sctr' />
                              <label htmlFor="" className='mt-3 label'>Adjuntar SCTR</label>
                              <div className="label-holder">
                                  <label htmlFor="file" className="label1">
                                      <i className="material-icons">attach_file</i>
                                  </label>
                              </div>
                              {selectedPdf && (
                                  <div className='eliminarImg mt-1'>
                                      <h6 ><span className="detailsInfo">{selectedPdf}</span></h6>
                                      <button onClick={removeSelectedPdf} style={styles.delete} className="text-white">
                                          Eliminar
                                      </button>
                                  </div>
                              )}
                          </div>


                          {/* <input type="text" className={styles.inputMaterial} name="role" value="2" className="hide" onChange={handleChangeInsert}/> */}
                          {/* <input type="text" className={styles.inputMaterial} name="role" value="2" className="hide" onChange={handleChangeInsert}/> */}
                          <br /><br />
                          <div align="right">
                              <Button color="primary" type="submit" >Insertar</Button>
                              <Button onClick={() => abrirCerrarModalInsertar()}> Cancelar</Button>
                          </div>
                      </div>
                  </form>

              </div>
          )

  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Registra tus proveedores  </h1></div>
    <div className='blanco'>
      <div className="container">
          <h1 className="text-center pt-5">Historial de Proveedores</h1>
        <div className="d-flex justify-content-end"><button className="btn2 mt-3" onClick={()=>abrirCerrarModalInsertar()}>Agregar Proveedores</button></div>
        
        {listo ?
          <div>
            {data.map(casa => (<div>
              <div className="seccion">
                <div className="row mt-3">
                  <h3> Nombre: {casa.name} {casa.lastName}</h3>

                </div>
                <div className="row mt-3">

                  <p className="Item-Title">Documento: <span className="Item-Description">{casa.document}</span></p>
                  <p className="Item-Title">Placa: <span className="Item-Description">{casa.licensePlate}</span></p>
                  <p className="Item-Title">Tipo de visita: <span className="Item-Description">{casa.type}</span></p>
                  <p className="Item-Title">Fecha de inicio: <span className="Item-Description">{moment(casa.startingdate).format("DD-MM-YYYY")}</span></p>
                  <p className="Item-Title">Fecha de fin: <span className="Item-Description">{moment(casa.endingdate).format("DD-MM-YYYY")}</span></p>
                  <p className="Item-Title">Cantidad de trabajadores: <span className="Item-Description">{casa.quantity}</span></p>
  

                  {/* <p className="Item-Title">Fin de reserva: <span className="Item-Description">{End} hs</span></p> */}

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

export default Proveedores;
