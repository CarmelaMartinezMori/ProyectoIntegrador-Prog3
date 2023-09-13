import React, { Component } from 'react';
import './albumDetail.css'

class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      info: null,
      isFavorite: false,
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

    if (!this.state.isFavorite) {
      if (storage === null) {
        let idInArray = [id];
        let arrayToString = JSON.stringify(idInArray);
        localStorage.setItem('favoriteAlbums', arrayToString);
      } else {
        let fromStringToArray = JSON.parse(storage);
        
        // Verificar si el ID del álbum ya está en la lista de favoritos
        if (!this.isItemInFavorites(fromStringToArray, id)) {
          fromStringToArray.push(id);
          let arrayToString = JSON.stringify(fromStringToArray);
          localStorage.setItem('favoriteAlbums', arrayToString);
        }
      }

      this.setState({
        isFavorite: true,
      });
    } else {
      let storageToArray = JSON.parse(storage);
      let filteredArray = storageToArray.filter((elm) => elm !== id);
      let filteredToString = JSON.stringify(filteredArray);
      localStorage.setItem('favoriteAlbums', filteredToString);

      this.setState({
        isFavorite: false,
      });
    }
  }

  isItemInFavorites(favoritesArray, id) {
    return favoritesArray.includes(id);
  }

  render() {
    const { info, isFavorite } = this.state;

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
              onClick={() => this.addToFavorites(this.state.id)}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
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
