import React from "react";
import Header from "./components/Header/Header";
import {Route, Switch} from 'react-router-dom';
import Home from "./screens/Home";
import Favoritos from "./screens/Favoritos";

function App() {
  return (
    <React.Fragment>
      <Header/>
      <Switch>
        <Route path='/' exact={true} component={Home}/>
        <Route path='favoritos' component={Favoritos}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
