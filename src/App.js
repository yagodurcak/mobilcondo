import './App.css';

import * as React from 'react';

// import { BottomNavigation, Tab } from 'react-router-navigation'
import {
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import RestoreIcon from '@mui/icons-material/Restore';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import Box from '@mui/material/Box';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import Home from './pages/Home';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import Login from './pages/login/Login';
// import Navigation from './components/BottomNavigation';
// import React from 'react';
// import RestoreIcon from '@mui/icons-material/Restore';
import UserProvider from './context/UserContext';

function App() {

  const [value, setValue] = React.useState(0);


  return (

  <div>
    <UserProvider>
    <BottomNavigation
  showLabels
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}aQTTTTTY
>
  <BottomNavigationAction label="Recents"/>
  <BottomNavigationAction label="Favorites" />
  <BottomNavigationAction label="Nearby"/>
</BottomNavigation>
    {/* <Router>
      <Switch>
          <Route exact path="/">
          <Login/>
          </Route>
          <Route exact path="/Home">
          <Home/>
          </Route>
      </Switch>
    </Router> */}
    </UserProvider>
  </div>

  );
}

export default App;
