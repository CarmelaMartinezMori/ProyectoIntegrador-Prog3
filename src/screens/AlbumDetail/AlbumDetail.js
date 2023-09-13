// AlbumDetail.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './albumDetail.css';

class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      info: null,
    };
  }

  componentDidMount() {
    this.fetchAlbumData();
    this.checkFavorites();
  }

  fetchAlbumData() {
    fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/${this.state.id}`)
      .then((response) => response.json())
      .then((data) => this.setState({ info: data }))
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
      <div className='container'>
        {info ? (
          <div className="spacer">
            <img className='imagen' src={info.cover_medium} alt={info.title} />
            <h2 className='title'>{info.title}</h2>
            <h3 className='title'>{info.artist.name}</h3>
            <h4 className='title'>{info.genres.data[0].name}</h4>
            <h5 className='title'>Release Date: {info.release_date}</h5>
            <ul className='lista'>
              {info.tracks.data.map((track) => (
                <li key={track.id}>{track.title}</li>
              ))}
            </ul>
            <button
              className='boton'
              onClick={() => this.addToFavorites(info.id)}
            >
              {this.isItemInFavorites(JSON.parse(localStorage.getItem('favoriteAlbums') || '[]'), info.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        ) : (
          <h4>Loading...</h4>
        )}
      </div>
    );
  }
}

export default AlbumDetail;
