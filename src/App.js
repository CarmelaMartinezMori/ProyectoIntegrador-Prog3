import React from "react";
import Header from "./components/Header/Header";
import {Route, Switch} from 'react-router-dom';
import Home from "./screens/Home";
import Favorites from "./screens/Favorites";
import Footer from "./components/Footer/Footer";
import Album from "./screens/Album/Album";



function App() {
  return (
    <React.Fragment>
      <Header/>
      <Switch>
        <Route path='/' exact={true} component={Home}/>
        <Route path='favorites' component={Favorites}/>

        <Route path='/album/id/:id' exact={true} component= {Album}/>
      </Switch>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
