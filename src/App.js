import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./screens/Home";
import Favorites from "./screens/Favorites";
import Footer from "./components/Footer/Footer";
import Albums from "./screens/Albums/Albums";
import AlbumDetail from "./screens/AlbumDetail/AlbumDetail";
import TrackDetail from "./screens/Track/TrackDetail";


class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/albums" component={Albums} />
          
          <Route path="/albumDetail/id/:id" exact={true} component={AlbumDetail} />
          <Route path="/trackDetail/id/:id" exact={true} component={TrackDetail} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
