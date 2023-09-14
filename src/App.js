import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./screens/Home/Home";
import Favorites from "./screens/Favorites/Favorites";
import Footer from "./components/Footer/Footer";
import Albums from "./screens/Albums/Albums";
import AlbumDetail from "./screens/AlbumDetail/AlbumDetail";
import TrackDetail from "./screens/TrackDetail/TrackDetail";
import Tracks from "./screens/Tracks/Tracks";
import NotFound from "./screens/NotFound/NotFound";


class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/albums" component={Albums} />
          <Route path="/tracks" component={Tracks} />
          
          <Route path="/albumDetail/id/:id" exact={true} component={AlbumDetail} />
          <Route path="/trackDetail/id/:id" exact={true} component={TrackDetail} />

          <Route component={NotFound} />

        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
