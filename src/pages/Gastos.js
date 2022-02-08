import "../pages/general.css"
import 'moment/locale/es';

import {Button, Modal, TextField} from '@material-ui/core';
import {
  Link,
  NavLink,
} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from 'react';

import AgregarEvento from '../components/AgregarEvento'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import ModalDetails from "../components/ModalDetails";
import ModalDetails2 from "../components/ModalDetails2";
import ModalDetails5 from "../components/ModalDetails5";
import ModalInsertar from "../components/ModalInsertar";
import axios from "axios"
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import deportivo from "../IMG/deportivo.png"
import esLocale from '@fullcalendar/core/locales/es';
import espacios from "../IMG/espacioscomunes.png"
import esparcimiento   from "../IMG/esparcimiento.png"
import jsPDF from "jspdf"
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
    width: "95%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(4,4 ),
    // margin: "10px",
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
function Gastos() {

  const styles= useStyles();
  const [modalOpen, setModalOpen] = useState(false)
  const [unitCostLuz, setunitCostLuz] = useState(1);
  const [unitCostAgua, setunitCostAgua] = useState(1);
  const [data, setData] = useState([])
  const [sumadata, setSumaData] = useState(0)
  const [dataLuz, setDataLuz] = useState([])
  const [selectedImage, setSelectedImage] = useState();
  const [selectedFilesPost, setSelectedFilesPost] = useState();
  const [pathImg, setPathImg] = useState()

  const [dataAgua, setDataAgua] = useState([])
  const [totalGastos, setTotalGastos] = useState(0)

  const [error, setError] = useState(false)

  const [totalGastosLuz, setTotalGastosLuz] = useState({})
  const [totalGastosAgua, setTotalGastosAgua] = useState({})
  const [dataNew, setDataNew] = useState([])
  const [dataProperty, setDataProperty] = useState({})
  const calendarRef = useRef(null)
  const { dataUser, setdataUser } = useContext(userContext);
  const [Start, setStart] = useState(false);
const [End, setEnd] = useState("");
const [mesSelected, setMesSelected] = useState(null);
const [añoSelected, setAñoSelected] = useState(null);
const fecha = new Date()
const [showModalDetails, setShowModalDetails] = useState(false);
const [showModalDetails5, setShowModalDetails5] = useState(false);
const [showModalDetails4, setShowModalDetails4] = useState(false);
const [showModalDetails3, setShowModalDetails3] = useState(false);
const [exito, setExito] = useState(false);
const [exito1, setExito1] = useState(false);
const fecha1 =  moment(fecha).format("YYYY")
const fecha2 =  moment(fecha).format("MM")
const [respuesta, setRespuesta] = useState("");



const [info, setInfo] = useState({
  propertyId: "",
  year: fecha1,
  month:fecha2
});
const [info2, setInfo2] = useState({
  propertyId: "",
  file: "",
  date:""
});


const{file} = info2;

const abrirCerrarModalDetails=()=>{
  setShowModalDetails(!showModalDetails);
}
const abrirCerrarModalDetails5=()=>{
  setShowModalDetails5(!showModalDetails5);
}
const abrirCerrarModalDetails4=()=>{
  console.log("abrir");
  setShowModalDetails4(!showModalDetails4);

}
const abrirCerrarModalDetails3=()=>{
  setShowModalDetails3(!showModalDetails3);
}

const buscarUnitCostLuz = async() => {
            
  const url = `https://back2.tinpad.com.pe/public/api/total-light-expenditure`;

  const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

  } 

  const rtdo = await axios.get(url, {headers})
  // setdataUser(JSON.parse(localStorage.getItem('user')))
  console.log(rtdo.data.data[0].date.slice(0,7))
  // setData((rtdo.data.data).filter(artista=> artista.proyect.propertyId === (dataProperty.id).toString()))

//   setData(rtdo.data)
}
const handleChangeInsert = (e) => {

  setInfo({
      ...info,
      [e.target.name]: e.target.value
  })
  
}
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


    const buscarTipo = async(e) => {

      setStart(false)

      e.preventDefault()
          
      const url = `https://back2.tinpad.com.pe/public/api/get-receipt`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      } 
  
      const rtdo = await axios.post(url,{
        propertyId: dataProperty.id,
        year: añoSelected,
        month:mesSelected
      }, {headers})
      setData(rtdo.data.data.condoExpense)
      setDataLuz(rtdo.data.data.lightExpenditure[0])
      setDataAgua(rtdo.data.data.waterExpenditure[0])
      setTotalGastosAgua(rtdo.data.data.totalWaterExpenditure[0])
      setTotalGastosLuz(rtdo.data.data.totalLightExpenditure[0])
     
  
    }
    useEffect(() => {
      setdataUser(JSON.parse(localStorage.getItem('user')))
      setDataProperty(JSON.parse(localStorage.getItem('propiedad')))
      buscarUnitCostLuz()
     }, []);

  useEffect(() => {
   buscarTipo()

  }, [dataUser]);

  useEffect(() => {
    // const condominio= data.condoExpense;
    let suma = 0
 
    if (data.length >= 1 && dataLuz !== {} && dataAgua !== {}  && data[0].approved === "1") {
     
      for (let i = 0; i < data.length; i++) {
      suma = suma + parseFloat(data[i].amount) 
       console.log(data[i].amount);
     }
     setSumaData(suma)
     setTotalGastos(suma + dataLuz.consume  * totalGastosLuz.consume  + parseFloat(dataLuz.transactionCost) + dataAgua.consume  * totalGastosAgua.consume  + parseFloat(dataAgua.transactionCost) )
     setStart(true)
     console.log("cumple!!!");
    } else{
      setStart(false)
      console.log("nosecumple");
    }

    setExito1(true)


  }, [totalGastosLuz]);

  console.log(data);

  const peticionPost=async()=>{
    console.log("post2");  
    const f = new FormData()       
    console.log(info);

    const fecha3 = añoSelected+"-"+mesSelected+"-10" 
            
        f.append("file", selectedFilesPost)
        f.append("date", fecha3 )
        f.append("propertyId", dataProperty.id)

      const headers = {
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
  
      const url1= "https://back2.tinpad.com.pe/public/api/payment"
        await axios.post(url1, f, {headers})
        .then(response=>{

          setSelectedFilesPost([])
          setRespuesta("Archivo cargado correctamente")
          setExito(true)
          setTimeout(() => {
            setExito(false)
          }, 2000);
          console.log("exito -1");
        }).catch(error=>{
          console.log(error);
  
          setSelectedFilesPost([])
        })
  
    }

  const onSubmitInsertar = (e) => {
    e.preventDefault();


      setError(false);

      peticionPost()
      setPathImg()
      setSelectedImage()
      setInfo2({
        propertyId: "",
        file: "",
        date:""
      });

      abrirCerrarModalDetails3()
      abrirCerrarModalDetails()
     }

     const generatePDF = () => {
       let doc = new jsPDF("p", "pt","a4" )
       doc.html(document.querySelector("#content"), {
         callback: function(pdf){
           pdf.save("mypdf.pdf")
         }
       } )

     }

        const mes = [
            { value: 1, label: 'Enero' },
            { value: 2, label: 'Febrero' },
            { value: 3, label: 'Marzo' },
            { value: 4, label: 'Abril' },
            { value: 5, label: 'Mayo' },
            { value: 6, label: 'Junio' },
            { value: 7, label: 'Julio' },
            { value: 8, label: 'Agosto' },
            { value: 9, label: 'Septiembre' },
            { value: 10, label: 'Octubre' },
            { value: 11, label: 'Noviembre' },
            { value: 12, label: 'Diciembre' }
           
          ]

        const Año = [
            { value: 2022, label: '2022' },
            { value: 2023, label: '2023' },
            { value: 2024, label: '2024' },
            { value: 2025, label: '2025' },
            { value: 2026, label: '2026' },
            { value: 2027, label: '2027' },
            { value: 2028, label: '2028' },
            { value: 2029, label: '2029' },
            { value: 2030, label: '2030' },
            { value: 2031, label: '2031' }
     
          ]

     
          const bodyDetails =(
            
            <div >
                <div className="estilosmodalDetails" >
          
                    <div className="container">
                      <div className="row mt-2">
                       
                    <h1 className="text-center">Nombre del Condomino</h1>
                          <div className="col-12 d-flex justify-content-between">
                            <div className="col-6">
                              <h6 className="text-gray-600">Periodo: {mesSelected}/{añoSelected}</h6>
                              <h6 className="text-gray-600">Proiedad: Mz {dataProperty.block} lt {dataProperty.lot}</h6>
                            </div>
                            
                            <button className="btn1" onClick={()=>abrirCerrarModalDetails5()}>Descargar recibo</button>
                          </div>
                     
                      
                      </div>
                      <div className="row mt-2">
                        <h4 className="text-black">Gastos comunes del Condominio</h4>
                        <div className="d-flex justify-content-between mt-1">
                          <h5 className="text-gray-600">Total: ${sumadata} </h5>
                          <h5 className="text-gray-600">-----</h5>
                          <div className="d-flex justify-content-center "><button className="linkdownload text-center" onClick={()=>abrirCerrarModalDetails4()} ><i className="material-icons visibility">visibility</i></button></div>
                        </div>

                      </div>
                      <div className="row mt-2">
                      <h4 className="font-weight-bold text-black">Gastos de la propiedad</h4>
                      <div className="d-flex justify-content-between">
                              <h5 className="text-gray-600">Gastos Comunes: </h5>
                              <h5 className="text-gray-600">${sumadata}</h5>
                            </div>
                      <div className="d-flex justify-content-between">
                              <h5 className="text-gray-600">Servicios de Agua: </h5>

                              { Start ? 
                            <h5 className="text-gray-600">${dataAgua.consume  * totalGastosAgua.consume  + parseFloat(dataAgua.transactionCost)}</h5>

                       
                         
                            :null}
                            </div>
                      <div className="d-flex justify-content-between">
                              <h5 className="text-gray-600">Servicios de Luz: </h5>
                              { Start ? 
                            <h5 className="text-gray-600">${dataLuz.consume  * totalGastosLuz.consume  + parseFloat(dataLuz.transactionCost)}</h5> 
                            :null}
                            </div> 
                      <div className="d-flex justify-content-between">
                              <h3 className="text-black">Total a pagar: </h3>
                              <h3 className="text-black">${totalGastos}</h3>
                            </div>

                            
                      </div>

                      <div className="row mt-1">
                       
                       <div className="col-12">
                     
                           <h6 className="text-gray-600">Cta. Corrientes BCP Soles</h6>
                           <h6 className="text-gray-600">XXX.XXXX.XXXX.XXXXX.XXXX</h6>
                           <h6 className="text-gray-600">Cta. Corrientes BCP Soles</h6>
                           <h6 className="text-gray-600">XXX.XXXX.XXXX.XXXXX.XXXX</h6>
                  
                       </div>
                         <div className="text-center mt-2  d-flex justify-content-between" >
                           <button className="btn1 mx-1" onClick={()=>abrirCerrarModalDetails3()}>Adjuntar Pago</button>
                           <button className="btn1" onClick={()=>abrirCerrarModalDetails()}>Volver</button>
                           
                           </div>
                   
                   </div>
                    </div>

            
      
      
                </div>
                
            </div>
            )
            const bodyDetails5 =(
            
              <div >
                  <div className="estilosmodalDetails" >
            
                      <div className="container" id="content">
                        <div className="row mt-2">
                         
                      <h1 className="text-center">Nombre del Condomino</h1>
                            <div className="col-12 d-flex justify-content-between">
                              <div className="col-6">
                                <h6 className="text-gray-600">Periodo: {mesSelected}/{añoSelected}</h6>
                                <h6 className="text-gray-600">Proiedad: Mz {dataProperty.block} lt {dataProperty.lot}</h6>
                              </div>
                              
                            </div>
                       
                        
                        </div>
                        <div className="row mt-2">
                          <h4 className="text-black">Gastos comunes del Condominio</h4>
                          <div className="d-flex justify-content-between mt-1">
                            <h5 className="text-gray-600">Total: ${sumadata} </h5>
                          </div>
  
                        </div>
                        <div className="row mt-2">
                        <h4 className="font-weight-bold text-black">Gastos de la propiedad</h4>
                        <div className="d-flex justify-content-between">
                                <h5 className="text-gray-600">Gastos Comunes: </h5>
                                <h5 className="text-gray-600">${sumadata}</h5>
                              </div>
                        <div className="d-flex justify-content-between">
                                <h5 className="text-gray-600">Servicios de Agua: </h5>
  
                                { Start ? 
                              <h5 className="text-gray-600">${dataAgua.consume  * totalGastosAgua.consume  + parseFloat(dataAgua.transactionCost)}</h5>
  
                         
                           
                              :null}
                              </div>
                        <div className="d-flex justify-content-between">
                                <h5 className="text-gray-600">Servicios de Luz: </h5>
                                { Start ? 
                              <h5 className="text-gray-600">${dataLuz.consume  * totalGastosLuz.consume  + parseFloat(dataLuz.transactionCost)}</h5> 
                              :null}
                              </div> 
                        <div className="d-flex justify-content-between">
                                <h3 className="text-black">Total a pagar: </h3>
                                <h3 className="text-black">${totalGastos}</h3>
                              </div>
  
                              
                        </div>
  
                        <div className="row mt-1">
                         
                         <div className="col-12">
                       
                             <h6 className="text-gray-600">Cta. Corrientes BCP Soles</h6>
                             <h6 className="text-gray-600">XXX.XXXX.XXXX.XXXXX.XXXX</h6>
                             <h6 className="text-gray-600">Cta. Corrientes BCP Soles</h6>
                             <h6 className="text-gray-600">XXX.XXXX.XXXX.XXXXX.XXXX</h6>
                    
                         </div>
                
                     
                     </div>
                      </div>
                       <div className="d-flex justify-content-center"><button className="btn1" onClick={generatePDF}>Descargar como PDF</button></div>
                       <div className="d-flex justify-content-center"><button className="btn1" onClick={()=>abrirCerrarModalDetails5()}>Volver</button></div>
  
              
        
                  </div>
                  
              </div>
              )
          const bodyDetails2 =(
            <div className={styles.modal}>
                <div  className="mx-3 mt-5">
          
                    <h1 className="text-center">Gastos Comunes</h1>

                    <div className="mt-5">
                      {data.map(casa => (
                      <div className="d-flex justify-content-between mt-2">
                                <h5 className="text-gray-600">{casa.concept}:</h5>
                                <h5 className="text-gray-600">$ {casa.amount}</h5>
                             
                                     <a href={"https://back2.tinpad.com.pe/public/" + casa.document} target="_blank"  className="linkdownload" ><i className="material-icons visibility">visibility</i></a>
                              </div>
                       ))}
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                                <h2 className="text-black">Total:</h2>
                                <h2 className="text-gray-600"> ${sumadata}</h2>
                             
                              </div>
                        <div className="d-flex justify-content-center mt-4" ><button className="btn1" onClick={()=>abrirCerrarModalDetails4()} >VOLVER</button></div>
                </div>
            </div>
            )
  const bodyInsertar = (
    <div >
      <div className="estilosmodalDetails1">

        <form action="" onSubmit={onSubmitInsertar}>

          <div className={styles.modal}>
            <h1 className="my-5 text-center">Adjuntar pago</h1>

            {error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null}


          
            <div className='mt-5'>
              {/* <label>Choose File to Upload: </label> */}
              <input type="file" onChange={imageChange} id="file" name='image' />
              <div className="label-holder">
                <label htmlFor="file" className="label1">
                  <i className="material-icons">attach_file</i>
                </label>
              </div>
            </div> <br />


            {selectedImage && (
              <div className='eliminarImg my-4 mx-5'>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  className='foto1'
                  alt="Thumb"
                />
                <button onClick={removeSelectedImage} style={styles.delete} className="mt-3 mx-3">
                  Eliminar
                </button>
              </div>
            )}

            <br /><br />
            <div className="d-flex justify-content-around">
              <button className="btn1" type="submit" ><h5>Insertar</h5></button>
              <button className="btn1" onClick={abrirCerrarModalDetails3}> <h5>Cancelar</h5></button>
            </div>
          </div>
        </form>



      </div>
    </div>
  )

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
      <div className='verde text-center'><h1>Mis Gastos</h1></div>


  
        <div className='blanco '>

          <div className="pt-3 bg-secondary text-white">
            <div className="container">
              <h3>Propietario: {dataUser.name} {dataUser.lastName}</h3>
              <div className="d-flex justify-content-between">
                <h6>Manzana: {dataProperty.block}</h6>
                <h6>Lote:{dataProperty.lot}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Area (m2): {dataProperty.area}</h6>
                <h6>Participacion(%): {dataProperty.participation}</h6>
                        </div>
            </div>

          </div>
          <div>
              <form action="" className="formstyle py-4" onSubmit={buscarTipo}>
              <select name="type" className=" selectstyle" onChange={(e)=> setMesSelected(e.target.value)}>

                <option value=""> Mes</option>
                {mes.map(fbb =>
                    <option key={fbb.value} value={fbb.value}>{fbb.label}</option>
                )};
                </select>
              <select name="type" className=" selectstyle" onChange={(e)=> setAñoSelected(e.target.value)}>

                <option value=""> Año</option>
                {Año.map(fbb =>
                    <option key={fbb.value} value={fbb.value}>{fbb.label}</option>
                )};
                </select>
                <button className="btn1" type="submit">Ver</button>
              </form>
            </div>
             <div className="d-flex justify-content-between container text-center mt-3">
            <h4>Periodo</h4>
            <h4>Total</h4>
            <h4>Estado</h4>
            <h4>Recibo</h4>
          </div>
          { Start 
           ? 
             <div className="d-flex justify-content-around container text-secondary mt-3">
            <h5>{mesSelected}/{añoSelected}</h5>
            <h5>${totalGastos}</h5>
            <h5>Pendiente</h5>
            <div className="d-flex justify-content-center "><button className="linkdownload text-center"  onClick={()=>abrirCerrarModalDetails()}><i className="material-icons visibility">visibility</i></button></div>

          </div>
            : null 
          }

          

            <ModalDetails2
              showModalDetails={showModalDetails}
              functionShow= {abrirCerrarModalDetails}
                info={info}
              bodyDetails={bodyDetails}
              />

            <ModalDetails5
              showModalDetails={showModalDetails5}
              functionShow= {abrirCerrarModalDetails5}
                info={info}
              bodyDetails={bodyDetails5}
              />
            <ModalDetails
              showmodalInsertar={showModalDetails4}
              functionShow= {abrirCerrarModalDetails4}
                info={info}
                bodyAgregar={bodyDetails2}
              />
              <ModalInsertar
            showmodalInsertar={showModalDetails3}
            functionShow= {abrirCerrarModalDetails3}
            handleChangeInsert={handleChangeInsert}
            onSubmitInsertar={onSubmitInsertar}
            error={error}
            bodyInsertar={bodyInsertar}
           
            
            />


    
    </div>
    
  </div>;
}

export default Gastos;
