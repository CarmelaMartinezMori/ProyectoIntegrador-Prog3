import React, { Component } from "react";
import './trackDetail.css';

class TrackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      id: props.match.params.id,
      isFavorite: false,
      text: 'Show More',
    };
  }

  componentDidMount() {
    // Cambiamos la URL de la API a la correcta
    fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${this.state.id}`)
      .then(response => response.json())
      .then(info => {
        this.setState({ info: info });
      })
      .catch(error => {
        console.error('Error fetching track details:', error);
      });
  }

  changeText() {
    // Toggle the text when the link is clicked
    this.setState(prevState => ({
      text: prevState.text === 'Show More' ? 'Show Less' : 'Show More',
    }));
  }

  addToFavorites(id) {
    const storageKey = 'favoriteTracks'; // Use 'favoriteTracks' key
    let storage = localStorage.getItem(storageKey);
    if (!this.state.isFavorite) {
      // If not in favorites, add it
      const idInArray = storage ? JSON.parse(storage) : [];
      idInArray.push(id);
  
      // Update local storage
      localStorage.setItem(storageKey, JSON.stringify(idInArray));
  
      this.setState({
        isFavorite: true,
      });
    } else {
      // If already in favorites, remove it
      let storageToArray = storage ? JSON.parse(storage) : [];
      const filteredArray = storageToArray.filter((elm) => elm !== id);
  
      // Update local storage
      localStorage.setItem(storageKey, JSON.stringify(filteredArray));
  
      this.setState({
        isFavorite: false,
      });
    }
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

          <a onClick={() => this.changeText()} className='more'>{this.state.text}</a>
          <section className='extra'>
            
          </section>

          <button className='boton' onClick={() => this.addToFavorites(this.state.info.id)}>
            {this.state.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </article>
      ) : null
    );
  }
}

export default TrackDetail;
