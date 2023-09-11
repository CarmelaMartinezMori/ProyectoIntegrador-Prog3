import React, { Component } from 'react';
import AlbumListContainer from '../components/AlbumListContainer/AlbumListContainer';
import TrackListContainer from '../components/TrackListContainer/TrackListContainer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      tracks: [],
      value: '',
    };
  }

  componentDidMount() {
 
    fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=20')
      .then(res => res.json())
      .then(data => this.setState({ tracks: data.data }))
      .catch(error => console.log('Error fetching tracks:', error));

    fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=20')
      .then(res => res.json())
      .then(data => this.setState({ albums: data.data }))
      .catch(error => console.log('Error fetching albums:', error));
  }

  handleSearch(event) {
    event.preventDefault();
    if (this.state.value === '') {
      // Si no se ha ingresado nada en el campo de búsqueda, no se hace nada
      return;
    }
  
    // Realiza la búsqueda y el filtrado solo en los datos locales (albums y tracks)
    const searchTerm = this.state.value.toLowerCase();
    console.log('Search Term:', searchTerm); 
  
    const filteredAlbums = this.state.albums.filter(album =>
      album.title.toLowerCase().includes(searchTerm) ||
      album.artist.name.toLowerCase().includes(searchTerm)
    );
    console.log('Filtered Albums:', filteredAlbums); 
  
    const filteredTracks = this.state.tracks.filter(track =>
      track.title.toLowerCase().includes(searchTerm) ||
      track.artist.name.toLowerCase().includes(searchTerm)
    );
    console.log('Filtered Tracks:', filteredTracks); 
  
  
    this.setState({
      albums: filteredAlbums,
      tracks: filteredTracks,
    });
  }
   

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className='search-home'>
        <h2>Search:</h2>
        <form onSubmit={(event) => this.handleSearch(event)}>
          <input type="text" name="search" onChange={(event) => this.handleChange(event)} value={this.state.value} />
          <button type="submit">Search</button>
        </form>
        <section>
          <h3>Top Albums:</h3>
          <AlbumListContainer data={this.state.albums} />
          <h3>Top Tracks:</h3>
          <TrackListContainer data={this.state.tracks} />
        </section>
      </div>
    );
  }
}

export default Home;
