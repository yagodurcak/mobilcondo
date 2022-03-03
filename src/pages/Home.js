import "./general.css";

import {Button, Modal, TextField} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ModalDetails2 from "../components/ModalDetails2";
import Navigation from "../components/BottomNavigation";
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import { getBottomNavigationUtilityClass } from "@mui/material";
import {makeStyles} from '@material-ui/core/styles';
import perfil from "../IMG/perfil.jpg"
import { userContext } from '../context/UserContext';

// import Navigation from "../components/BottomNavigation";
const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: "100%",
      // height: "100%", 
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


function Home() {

    const { dataUser, setdataUser } = useContext(userContext);
    const [data1, setData1] = useState([]);

    const [btnPersonal, setBtnPersonal] = useState(true);
    const [btnPropiedad, setBtnPropiedad] = useState(true);
    const [profileImg, setProfileImg] = useState(null);
    const [data, setData] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [imgPerfil, setImgPerfil] = useState(null);
    const [editChange, setEditChange] = useState(false);
    const [loading, setLoading] = useState(false);

    const styles= useStyles();
    const CambioPersonal = () => {
        setBtnPropiedad(!btnPropiedad)
    }
    const CambioPropiedad = () => {
        setBtnPropiedad(!btnPropiedad)
    }

    useEffect(() => {

        setdataUser(JSON.parse(localStorage.getItem('user')))

    }, []);




    const buscarCotizacion = async() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000);
    
        
      const url = `https://back2.tinpad.com.pe/public/api/user`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
        } 
  
      const rtdo = await axios.get(url, {headers})
      // set{}(JSON.parse(localStorage.getItem('user')))

      console.log(rtdo.data.data)
    //   setData1(rtdo.data.data)     
       setData1((rtdo.data.data).filter(artista=> (artista.id === dataUser.id)))
    //   setData1(data1[0])
    setEditChange(true)
      }

      console.log(data1);



      const abrirCerrarModalDetails=()=>{
        setShowModalDetails(!showModalDetails);
  
      } 
      const [info, setInfo] = useState({})

      const seleccionarUser=()=>{
        setInfo(dataUser);
        console.log(info);
        abrirCerrarModalDetails()
      }


      


      useEffect(() => {

        if (data1.length >= 1) {

            console.log(data1.length)
            
            setProfileImg("https://back2.tinpad.com.pe/public/" + data1[0].avatar)
            setEditChange(false)
        }

        // setInfo(dataUser)
        // buscarCotizacion()
        console.log("1");
      }, [data1]);

      const BuscarPropery = async() => {
        const url = `https://back2.tinpad.com.pe/public/api/property-user`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
        }
        const rtdo = await axios.get(url, {headers})
        const rtdo2 = (rtdo.data.data).filter(artista=> artista.user.id === dataUser.id)
        localStorage.setItem('propiedad', JSON.stringify(rtdo2[0].property)) 
        
        setData(rtdo2)
      }

      useEffect(() => {
    BuscarPropery()
}, [btnPropiedad]);

useEffect(() => {
    buscarCotizacion()
    BuscarPropery()
 
      }, [dataUser]);

      if (redirect) {
        return <Redirect to="/"/>;
       
      }


      const logout = () => {
        localStorage.setItem('user', "") 
        localStorage.setItem('Authorization', "") 
        setRedirect(true)
      }



      const handleChangeInsert = (e) => {

        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    const peticionPut=async()=>{       

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }

      const url2 = `https://back2.tinpad.com.pe/public/api/user`

        await axios.put(url2+"/"+info.id,  info , {headers: headers})
        .then(response=>{
       
            abrirCerrarModalDetails();
          console.log("exito");
         
        }).catch(error=>{
          console.log(error);
        })
     
        buscarCotizacion()
      }
      const peticionPost=async()=>{
        console.log("post2");
      
        const f = new FormData()    
                       
             f.append("file", imgPerfil)

      
            f.append("userId", dataUser.id)
          
      
          // console.log(f);
      
          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
      
          const url1= "https://back2.tinpad.com.pe/public/api/upload-avatar"
            await axios.post(url1, f, {headers})
            .then(response=>{
              // setdata(data.concat(response.data));
              // abrirCerrarModalInsertar();
      
              setImgPerfil(null)
              console.log("exito -1");
            }).catch(error=>{
              console.log(error);
      
              setImgPerfil(null)
            })
      
        // console.log(filesImg);
          buscarCotizacion()
        }

    const onSubmitEditar = (e) => {
        e.preventDefault()
                if (imgPerfil !== null) {
                    console.log("post");
                    peticionPost()
                    console.log("put");
                    peticionPut()
                } else{
                    
                    console.log("put");
                    peticionPut()
                }


             
          }

      const bodyDetails =(
        <div className={styles.modal}>
      
           <form action=""  onSubmit={onSubmitEditar} >
            <div className="estilosmodalDetails">
      
            <h6>Editar foto de perfil</h6>
            <input type="file" onChange={(e)=> {setImgPerfil(e.target.files[0])}} />
          
            {/* <div className="mt-3">
                <TextField className={styles.inputMaterial} name="email" label="Editar correo" value={info && info.email} onChange={handleChangeInsert}/>
            </div> */}
            <div className="mt-3">
                <TextField className={styles.inputMaterial} name="phone" label="Editar teléfono" value={info && info.phone} onChange={handleChangeInsert}/>
            </div>

    
              </div>
            <div className="d-flex justify-content-around mt-3">

              <button className="btn2" type="submit">Guardar</button>
              <button className="btn2" onClick={()=>abrirCerrarModalDetails()}>Volver</button>
              </div>
              </form>
        </div>
        )



    return          <div>
         <div className="pt-3  d-flex justify-content-end mr-5">



        <button className="btn1 mb-3" onClick={logout}>Cerrar Sesión</button>
      </div>
      <div className="profile-page">
        <div className="page-header header-filter" data-parallax="true">
        </div>
        <div className="main main-raised">

          {loading ? <Box sx={{ position: 'absolute', left: 100, top: 100, zIndex: 1 }}>

            <CircularProgress color="success" size={80} />
          </Box> : null}
          <div className="profile-content">
            {/* <i class="material-icons edit">edit</i> */}
            <div className="container">
              <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                  <div className="d-flex justify-content-end ">


                  </div>
                  {/* <div className="EditarAvatar"><i class="material-icons edit">edit</i></div> */}
                  <div className="profile">
                    <div className="d-flex justify-content-end mt-2">
                      <button className="btn1 " onClick={seleccionarUser}>     <span class="material-icons">
                        edit
                      </span></button>
                    </div>

                    <div className="avatar">
                      <img
                        //  src={URL.createObjectURL(profileImg)}
                        src={profileImg}
                        alt="Circle Image" className="img-raised rounded-circle img-fluid" />
                      {/* <img src={dataUser.avatar} alt="Circle Image" className="img-raised rounded-circle img-fluid" /> */}
                    </div>

                    <div className="name">
                      <h1 className="title text-center">{dataUser.name}</h1>
                      <h6 className="subtitle text-center">Bienvenido a CondoApp!</h6>
                    </div>
                    <div>
                      <div className="row d-flex justify-content-center mt-3">
                        <div className="col-6">
                          <button className={btnPropiedad ? "btn active" : "btn"} onClick={() => { CambioPropiedad() }}>Datos Personales</button>
                        </div>
                        <div className="col-6">
                          <button className="btn" onClick={() => { CambioPersonal() }}>Datos Propiedad</button>
                        </div>
                      </div>
                      {btnPropiedad ? <div>
                        {data1.map(casa => (
                          <div>
                            <h3 className="description">Nombres: <span>{casa.name}</span></h3>
                            <h3 className="description">Apellidos: <span>{casa.lastName}</span></h3>
                            <h3 className="description">Dni: <span>{casa.document}</span></h3>
                            <h3 className="description">Correo: <span>{casa.email}</span></h3>
                            <h3 className="description">Teléfono: <span>{casa.phone}</span></h3>
                          </div>
                        ))}
                      </div> :
                        <div>
                          {data.map(casa => (<div>
                            <h3 className="description">Manzana: <span>{casa.property.block}</span></h3>
                            <h3 className="description">Lote: <span>{casa.property.lot}</span></h3>
                            <h3 className="description">Area: <span>{casa.property.area}</span></h3>
                          </div>
                          ))}
                        </div>
                      }
                    </div>
                  </div>
                  <div className="pt-3 mr-5 d-flex justify-content-between">



                    <button className="btn1 mb-3" onClick={logout}>Pagos Pendientes</button>
                    <button className="btn1 mb-3" onClick={logout}>Noticias</button>
                  </div>
                  <div className="pt-3 mr-5 d-flex justify-content-between">
                    <button className="btn1 mb-3" onClick={logout}>Comunicados</button>
                    <button className="btn1 mb-3" onClick={logout}>Reservaciones</button>       </div>
                    {/* <button className="btn1 mb-3" onClick={logout}>Avisos de Pago</button> */}
                </div>
              </div>

            </div>
          </div>
        </div>
          <ModalDetails2
              showModalDetails={showModalDetails}
              functionShow= {abrirCerrarModalDetails}
              // handleChangeInsert={handleChangeInsert}
              // onSubmitEditar={onSubmitEditar}
              info={info}
              bodyDetails={bodyDetails}
              />
      </div>
    </div>;
                    // <Navigation/>

}

export default Home;

    