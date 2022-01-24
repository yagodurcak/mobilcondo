import "./general.css";

import React, {useContext, useEffect, useState} from 'react';

import Navigation from "../components/BottomNavigation";
import SimpleBottomNavigation from "../components/BottomNavigation";
import perfil from "../IMG/perfil.jpg"
import { userContext } from '../context/UserContext';

function Home() {

    const { dataUser, setdataUser } = useContext(userContext);
    const [btnPersonal, setBtnPersonal] = useState(true);
    const [btnPropiedad, setBtnPropiedad] = useState(true);


    const CambioPersonal = () => {
        setBtnPropiedad(!btnPropiedad)
    }
    const CambioPropiedad = () => {
        setBtnPropiedad(!btnPropiedad)
    }

    const buscarCotizacion = async() => {

      
        console.log(localStorage.getItem('user'));
        setdataUser(JSON.parse(localStorage.getItem('user')))
      
        
      }

      useEffect(() => {
   buscarCotizacion()
      }, []);

    return <div className="profile-page">


        <div className="page-header header-filter" data-parallax="true"></div>
        <div className="main main-raised">
            <div className="profile-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 ml-auto mr-auto">
                            <div className="profile">
                                <div className="avatar">
                                    <img src={perfil} alt="Circle Image" className="img-raised rounded-circle img-fluid"/>
                                </div>
                                <div className="name">
                                    <h1 className="title text-center">{dataUser.name}</h1>

                                    <h6 className="subtitle text-center">Bienvenido a CondoApp!</h6>
                    
                             </div>
                        
                             <div>
                                 <div className="row d-flex justify-content-center mt-3">
                                     <div className="col-6">
                                     <button className={btnPropiedad ? "btn active" : "btn"} onClick={()=> {CambioPropiedad()}}>Datos Personales</button>
                                     </div>
                                     <div className="col-6">
                                     <button className="btn" onClick={()=> {CambioPersonal()}}>Datos Propiedad</button>
                                     </div>
                                 </div>
                                 {btnPropiedad ?        <div>
                                 <h3 className="description">Nombres: <span>{dataUser.name}</span></h3>
                                 <h3 className="description">Apellidos: <span>{dataUser.lastName}</span></h3>
                                 <h3 className="description">Dni: <span>{dataUser.document}</span></h3>
                                 <h3 className="description">Correo: <span>{dataUser.email}</span></h3>
                                 <h3 className="description">Teléfono: <span>{dataUser.phone}</span></h3>
                                 </div> : 
                                         <div>
                                         <h3 className="description">Manzana: <span>{dataUser.name}</span></h3>
                                         <h3 className="description">Lote: <span>{dataUser.lastName}</span></h3>
                                         <h3 className="description">Area: <span>{dataUser.document}</span></h3>
                                
                                         </div>
                                 }

                         
                             </div>
                            </div>
                        </div>
                    </div>





                </div>
                </div>
                </div>
                </div>;
        <Navigation/>
}

export default Home;

    