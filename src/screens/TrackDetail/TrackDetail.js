import React, { Component } from 'react';
import './trackDetail.css';

class TrackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      info: null,
      //isFavorite: false, // No se utilizará para el seguimiento de favoritos
    };
  }

  componentDidMount() {
    this.fetchTrackData();
    this.checkFavorites();
  }

  fetchTrackData() {
    fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${this.state.id}`)
      .then(response => response.json())
      .then(info => {
        this.setState({ info: info });
      })
      .catch(error => {
        console.error('Error fetching track details:', error);
      });
  }

  checkFavorites() {
    let storage = localStorage.getItem('favoriteTracks');
    let storageToArray = JSON.parse(storage);

    if (storageToArray !== null) {
      // Verificar si el ID de la canción ya está en la lista de favoritos
      if (this.isItemInFavorites(storageToArray, this.state.id)) {
        this.setState({
          isFavorite: true,
        });
      }
    }
  }

  addToFavorites(id) {
    let storage = localStorage.getItem('favoriteTracks');
    let storageToArray = JSON.parse(storage) || [];

    if (!this.isItemInFavorites(storageToArray, id)) {
      storageToArray.push(id);
    } else {
      storageToArray = storageToArray.filter(elm => elm !== id);
    }

    localStorage.setItem('favoriteTracks', JSON.stringify(storageToArray));

    // Actualiza el estado local en función del almacenamiento local
    this.setState({
      isFavorite: !this.state.isFavorite,
    });
  }

  isItemInFavorites(favoritesArray, id) {
    return favoritesArray.includes(id);
  }

  render() {
    const { info } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          {info ? (
            <div className="spacer">
              <img
                className="imagen"
                src={info.album.cover_big}
                alt={this.state.info.album.title}
              />
              <h4 className="title">{info.title}</h4>
              <p className="artist">{info.artist.name}</p>
              <p className="album">{info.album.title}</p>
              
              <iframe className='preview' src={info.preview} title="Audio Preview" />
              <button
                className={`boton ${this.state.isFavorite ? "favorite" : "not-favorite"}`}
                onClick={() => this.addToFavorites(info.id)}
              >
                {this.isItemInFavorites(
                  JSON.parse(localStorage.getItem("favoriteTracks") || "[]"),
                  info.id
                )
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          ) : (
            <h4>Loading...</h4>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default TrackDetail;
