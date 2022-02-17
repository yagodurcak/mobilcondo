import "../pages/general.css"

import { Nav, NavItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';
import React from 'react';

// import { faCoffee, faHome, faSearch, faUsers } from '@fortawesome/free-solid-svg-icons';





const tabs = [
    {
  route: "/Espacios",
  icon: "groups",
  label: "Espacios e Invitados"
},
    {
  route: "/NoticiasyComunicados",
  icon: "campaign",
  label: "Informes y Noticias"
},
    {
  route: "/TramitesyQuejas",
  icon: "article    ",
  label: "Trámites y Quejas"
},
    {
  route: "/Gastos",
  icon: "receipt_long",
  label: "Pagos y Gastos"
},
{
  route: "/Home",
  icon: "account_circle",
  label: "Perfil"
}]

const Navigation = (props) => {

  return (
    <div>
      <nav className="navbar fixed-bottom navbar-dark d-block d-lg-none bottom-tab-nav" role="navigation">
      <Nav className="w-100">
        <div className=" d-flex flex-row justify-content-around w-100">
          {
            tabs.map((tab, index) =>(
              <NavItem key={`tab-${index}`}>
                <NavLink to={tab.route} className="nav-link bottom-nav-link"
                >
                  <div className="row d-flex flex-column justify-content-center align-items-center text-center">
                  <div>
              
                      <span class="material-icons logo">
                      {tab.icon}
                        </span>
                        <div className="bottom-tab-label">{tab.label}</div>
                  </div>
                  </div>
                </NavLink>
              </NavItem>
            ))
          }
        </div>
      </Nav>
    </nav>
    </div>
  )
};

export default Navigation;