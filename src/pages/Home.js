import "./general.css";

import React, {useContext, useEffect, useState} from 'react';

import Navigation from "../components/BottomNavigation";
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import perfil from "../IMG/perfil.jpg"
import { userContext } from '../context/UserContext';

// import Navigation from "../components/BottomNavigation";



function Home() {

    const { dataUser, setdataUser } = useContext(userContext);
    const [btnPersonal, setBtnPersonal] = useState(true);
    const [btnPropiedad, setBtnPropiedad] = useState(true);
    const [profileImg, setProfileImg] = useState(null);
    const [data, setData] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const CambioPersonal = () => {
        setBtnPropiedad(!btnPropiedad)
    }
    const CambioPropiedad = () => {
        setBtnPropiedad(!btnPropiedad)
    }

    const buscarCotizacion = async() => {

        setdataUser(JSON.parse(localStorage.getItem('user')))
      
        
      }


      

      useEffect(() => {
        setProfileImg("https://back2.tinpad.com.pe/public/" + dataUser.avatar)
      }, [dataUser]);

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
 
      }, []);

      if (redirect) {
        return <Redirect to="/"/>;
       
      }


      const logout = () => {
        localStorage.setItem('user', "") 
        localStorage.setItem('Authorization', "") 
        setRedirect(true)
      }

      console.log(profileImg);
    return <div className="profile-page">


        <div className="page-header header-filter" data-parallax="true"></div>
        <div className="main main-raised">
            <div className="profile-content">
                {/* <i class="material-icons edit">edit</i> */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 ml-auto mr-auto">
                            <div className="d-flex justify-content-end ">
                                <form action="" onSubmit={() => { console.log("hos") }}>
                                    {/* <input type="file">Editar foto de perfil</input> */}
                                </form>
                            </div>
                            <div className="profile">
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
                                        <h3 className="description">Nombres: <span>{dataUser.name}</span></h3>
                                        <h3 className="description">Apellidos: <span>{dataUser.lastName}</span></h3>
                                        <h3 className="description">Dni: <span>{dataUser.document}</span></h3>
                                        <h3 className="description">Correo: <span>{dataUser.email}</span></h3>
                                        <h3 className="description">Teléfono: <span>{dataUser.phone}</span></h3>

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
                        </div>
                    </div>




                    <div className="mt-2 mb-5 d-flex justify-content-between">
                        <button className="btn1 mb-3" >Editar</button>
                        <button className="btn1 mb-3" onClick={logout}>Cerrar Sesión</button>
                        </div>
                </div>
            </div>
        </div>
    </div>;
                    // <Navigation/>

}

export default Home;

    