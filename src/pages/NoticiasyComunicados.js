import "../pages/general.css"

import {
    Link,
    NavLink,
} from "react-router-dom";
import React, {useEffect, useState} from 'react';

import axios from "axios"
import deportivo from "../IMG/deportivo.png"
import espacios from "../IMG/espacioscomunes.png"
import esparcimiento   from "../IMG/esparcimiento.png"
import recreativos from "../IMG/recreativos.png"
import visitas from "../IMG/VISITAS.png"

function NoticiasyComunicados() {

    const [spaceTypes, setSpaceTypes] = useState([])

    const buscarTipo = async() => {
          
      const url = `https://back2.tinpad.com.pe/public/api/space-type`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      }
  
  
      const rtdo = await axios.get(url, {headers})
  
      // console.log(rtdo.data.data);
    
      setSpaceTypes(rtdo.data.data)
  
  }
  
  useEffect(() => {
   buscarTipo()
  }, []);
  
  console.log(spaceTypes);


  return <div className="Contenedor" >
    <div className='verde text-center'>  <h1>Noticias y Comunicados</h1></div>
    <div className='blanco'>

    <div className="seccion">     
                <div className="boton-centrar">
                  
                  <button className="btn-yellow" >     
                  <Link to="/Noticias" style={{ textDecoration: 'none' }}>
                   Noticias
                  </Link>
              </button>    
        </div>
      </div>

      <div className="seccion">     
                <div className="boton-centrar">   
                  <button className="btn-dark-blue" >     
                  <Link to="/Comunicados" style={{ textDecoration: 'none' }}>
                   Comunicados
                  </Link>
              </button>    
        </div>
      </div>


      <div className="seccion">     
                <div className="boton-centrar">   
                  <button className="btn-yellow" >     
                  <Link to="/Archivos" style={{ textDecoration: 'none' }}>
                   Documentos
                  </Link>
              </button>    
        </div>
      </div>

      <div className="seccion">     
                <div className="boton-centrar">   
                  <button className="btn-dark-blue" >     
                  <Link to="/Telefonos" style={{ textDecoration: 'none' }}>
                   Teléfonos Utiles
                  </Link>
              </button>    
        </div>
      </div>
      
      <hr className="linea-seccion2"></hr>
    
    </div>
    
  </div>;
}

export default NoticiasyComunicados;
