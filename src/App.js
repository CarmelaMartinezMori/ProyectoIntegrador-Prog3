import React from "react";
import Header from "./components/Header/Header";
import {Route, Switch} from 'react-router-dom';
import Home from "./screens/Home";
import Favorites from "./screens/Favorites";
import Footer from "./components/Footer/Footer";
import Albums from "./screens/Albums/Albums";
import AlbumDetail from "./screens/AlbumDetail/AlbumDetail";



function App() {
  return (
    <React.Fragment>
      <Header/>
      <Switch>
        <Route path='/' exact={true} component={Home}/>
        <Route path='/favorites' component={Favorites}/>
        <Route path='/albums' component={Albums}/>

        <Route path='/album/id/:id' exact={true} component= {AlbumDetail}/>
      </Switch>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
