import React, { Component } from 'react';
import './albumDetail.css';

class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      info: null,
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.fetchAlbumData();
    this.checkFavorites();
  }

  fetchAlbumData() {
    fetch(`https://api.allorigins.win/raw?url=https://api.deezer.com/album/${this.state.id}`)
      .then((response) => response.json())
      .then((info) => this.setState({ info: info }))
      .catch((error) => console.log('Error: ' + error));
  }

  checkFavorites() {
    let storage = localStorage.getItem('favoriteAlbums');
    let storageToArray = JSON.parse(storage);

    if (storageToArray !== null) {
      // Verificar si el ID del álbum ya está en la lista de favoritos
      if (this.isItemInFavorites(storageToArray, this.state.id)) {
        this.setState({
          isFavorite: true,
        });
      }
    }
  }

  addToFavorites(id) {
    let storage = localStorage.getItem('favoriteAlbums');
    let storageToArray = JSON.parse(storage) || [];

    if (!this.isItemInFavorites(storageToArray, id)) {
      storageToArray.push(id);
    } else {
      storageToArray = storageToArray.filter(elm => elm !== id);
    }

    localStorage.setItem('favoriteAlbums', JSON.stringify(storageToArray));

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
                src={info.cover_big}
                alt={info.title}
              />
              <h2 className="title">{info.title}</h2>
              <h3 className="artist">{info.artist.name}</h3>
              <h4 className="genre">{info.genres.data[0].name}</h4>
              <h5 className="date">Release Date: {info.release_date}</h5>
              <ul className="lista">
                {info.tracks.data.map((track) => (
                  <li key={track.id}>{track.title}</li>
                ))}
              </ul>
              <button
                className={`boton ${this.state.isFavorite ? "favorite" : "not-favorite"}`}
                onClick={() => this.addToFavorites(info.id)}
              >
                {this.isItemInFavorites(
                  JSON.parse(localStorage.getItem("favoriteAlbums") || "[]"),
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

export default AlbumDetail;
