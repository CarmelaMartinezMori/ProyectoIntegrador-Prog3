import React, { Component } from "react";
import './trackDetail.css';

class TrackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      info: null,
      isFavorite: false,
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
      // Verificar si el ID del álbum ya está en la lista de favoritos
      if (this.isItemInFavorites(storageToArray, this.state.id)) {
        this.setState({
          isFavorite: true,
        });
      }
    }
  }

  addToFavorites(id) {
    let storage = localStorage.getItem('favoriteTracks');

    if (!this.state.isFavorite) {
      if (storage === null) {
        let idInArray = [id];
        let arrayToString = JSON.stringify(idInArray);
        localStorage.setItem('favoriteTracks', arrayToString);
      } else {
        let fromStringToArray = JSON.parse(storage);
        
        // Verificar si el ID del álbum ya está en la lista de favoritos
        if (!this.isItemInFavorites(fromStringToArray, id)) {
          fromStringToArray.push(id);
          let arrayToString = JSON.stringify(fromStringToArray);
          localStorage.setItem('favoriteTracks', arrayToString);
        }
      }

      this.setState({
        isFavorite: true,
      });
    } else {
      let storageToArray = JSON.parse(storage);
      let filteredArray = storageToArray.filter((elm) => elm !== id);
      let filteredToString = JSON.stringify(filteredArray);
      localStorage.setItem('favoriteTracks', filteredToString);

      this.setState({
        isFavorite: false,
      });
    }
  }

  isItemInFavorites(favoritesArray, id) {
    return favoritesArray.includes(id);
  }
  
  render() {
    return (
      this.state.info ? (
        <article className='container'>
          <h4 className='body_track'>{this.state.info.title}</h4>
          <p className='body_track'>{this.state.info.artist.name}</p>
          <p className='body_track'>{this.state.info.album.title}</p>
          <img className='imagen' src={this.state.info.album.cover_medium} alt={this.state.info.album.title} />
          <iframe src={this.state.info.preview} title="Audio Preview" />

          <button className='boton' onClick={() => this.addToFavorites(this.state.id)}>
            {this.state.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </article>
      ) : null
    );
  }
}

export default TrackDetail;
