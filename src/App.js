import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./screens/Home";
import Favorites from "./screens/Favorites";
import Footer from "./components/Footer/Footer";
import Albums from "./screens/Albums/Albums";
import AlbumDetail from "./screens/AlbumDetail/AlbumDetail";
import TrackDetail from "./screens/Track/TrackDetail";
import SearchResults from "./components/SearchResults/SearchResults";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchResults: [], // Inicializa el estado para los resultados de búsqueda
    };
  }


  // Agrega una función para actualizar los resultados de búsqueda en el estado
  updateSearchResults = (results) => {
    this.setState({ searchResults: results });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/albums" component={Albums} />
          <Route path="/search-results"
            render={(props) => (
              <SearchResults
                searchResults={this.state.searchResults}
              />
            )}
          />
          <Route path="/albumDetail/id/:id" exact={true} component={AlbumDetail} />
          <Route path="/trackDetail/id/:id" exact={true} component={TrackDetail} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
