import './App.css';

import {
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";

import Archivos from './pages/Archivos';
import Calendar from './pages/Calendar';
import Canchas from './pages/login/Canchas';
import Comunicados from './pages/Comunicados';
import ConfirmReserve from './pages/ConfirmReserve';
import ElegirTipoInformes from './pages/ElegirTipoInformes';
import ElegirTipoVisita from './pages/ElegirTipoVisita';
import Espacios from './pages/Espacios';
import EspaciosDeportivos from './pages/EspaciosDeportivos';
import EspaciosEsparcimiento from './pages/EspaciosEsparcimiento';
import EspaciosOtros from './pages/EspaciosOtros';
import EspaciosRecreativos from './pages/EspaciosRecreativos';
import EspaciosUsoMultiple from './pages/EspaciosUsoMultiple';
import Gastos from './pages/Gastos';
import Home from './pages/Home';
import Informes from './pages/Informes';
import InformesyQuejas from './pages/TramitesyQuejas';
import Login from './pages/login/Login';
import MisReservas from './pages/MisReservas';
import Navigation from './components/BottomNavigation';
import NewReclamo from './pages/NewReclamo';
import NewTramite from './pages/NewTramite';
import Noticias from './pages/Noticias';
import NoticiasyComunicados from './pages/NoticiasyComunicados';
import Pagos from './pages/Pagos';
import Proveedores from './pages/Proveedores';
import Reclamos from './pages/Reclamos';
import ReservaEspacios from './pages/ReservaEspacios';
import RespuestaReclamo from './pages/RespuestaReclamo';
import RespuestaTramites from './pages/RespuestaTramites';
import Telefonos from './pages/Telefonos';
import Tramites from './pages/Tramites';
import TramitesyQuejas from './pages/TramitesyQuejas';
import UserProvider from './context/UserContext';
import Visitas from './pages/Visitas';

function App() {
  return (

  <div>
    <UserProvider>

    <Router>
      <Switch>
          <Route exact path="/">
          <Login/>
          </Route>
    <div className='pantalla'>
      <Navigation className="navegacion"/>
            <div className="screen">
              <Route exact path="/Home">
              <Home/>
              </Route>
              <Route exact path="/Espacios">
              <Espacios/>
              </Route>
              <Route exact path="/Informes">
              <Informes/>
              </Route>
              <Route exact path="/Tramites">
              <Tramites/>
              </Route>
              <Route exact path="/Pagos">
              <Pagos/>
              </Route>
              <Route exact path="/ReservaEspacios">
              <ReservaEspacios/>
              </Route>
              <Route exact path="/EspaciosDeportivos">
              <EspaciosDeportivos/>
              </Route>
              <Route exact path="/Canchas">
              <Canchas/>
              </Route>
              <Route exact path="/Calendario">
              <Calendar/>
              </Route>
              <Route exact path="/ConfirmReserve">
              <ConfirmReserve/>
              </Route>
              <Route exact path="/MisReservas">
              <MisReservas/>
              </Route>
              <Route exact path="/Visitas">
              <Visitas/>
              </Route>
              <Route exact path="/ElegirTipoVisita">
              <ElegirTipoVisita/>
              </Route>
              <Route exact path="/ElegirTipoInformes">
              <ElegirTipoInformes/>
              </Route>
              <Route exact path="/TramitesyQuejas">
              <TramitesyQuejas/>
              </Route>
              <Route exact path="/Proveedores">
              <Proveedores/>
              </Route>
              <Route exact path="/Gastos">
              <Gastos/>
              </Route>
              <Route exact path="/NoticiasyComunicados">
              <NoticiasyComunicados/>
              </Route>
              <Route exact path="/Noticias">
              <Noticias/>
              </Route>
              <Route exact path="/Comunicados">
              <Comunicados/>
              </Route>
              <Route exact path="/Archivos">
              <Archivos/>
              </Route>
              <Route exact path="/Telefonos">
              <Telefonos/>
              </Route>
              <Route exact path="/Reclamos">
              <Reclamos/>
              </Route>
              <Route exact path="/NewTramite">
              <NewTramite/>
              </Route>
              <Route exact path="/NewReclamo">
              <NewReclamo/>
              </Route>
              <Route exact path="/RespuestaTramites">
              <RespuestaTramites/>
              </Route>
              <Route exact path="/RespuestaReclamo">
              <RespuestaReclamo/>
              </Route>
              <Route exact path="/EspaciosRecreativos">
              <EspaciosRecreativos/>
              </Route>
              <Route exact path="/EspaciosEsparcimiento">
              <EspaciosEsparcimiento/>
              </Route>
              <Route exact path="/EspaciosUsoMultiple">
              <EspaciosUsoMultiple/>
              </Route>
              <Route exact path="/EspaciosOtros">
              <EspaciosOtros/>
              </Route>
            </div>
    </div>
      </Switch>
    </Router>
    </UserProvider>
  </div>

  );
}

export default App;
