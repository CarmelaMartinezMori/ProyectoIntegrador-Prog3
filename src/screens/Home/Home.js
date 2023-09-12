import React, { Component } from 'react';
import AlbumListContainer from '../../components/AlbumListContainer/AlbumListContainer';
import TrackListContainer from '../../components/TrackListContainer/TrackListContainer';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      tracks: [],
      value: '',
      searchResults: [], // Inicialmente, los resultados de búsqueda están vacíos.
    };
  }

  componentDidMount() {
    // Fetch los datos de las canciones y álbumes del top de la API aquí
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
  
    // Realiza la búsqueda y el filtrado en la API de Deezer
    const searchTerm = this.state.value.toLowerCase();
  
    fetch(`https://api.allorigins.win/raw?url=https://api.deezer.com/search?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        console.log(data, 'search');
        this.setState({
          searchResults: data.data,
        });
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleGoBack = () => {
    this.props.history.push('/'); // Redirige a la vista predeterminada
    // Limpia el campo de búsqueda y restaura los datos predeterminados de top albums y tracks
    this.setState({
      value: '',
      searchResults: [],
    });
  };

  render() {
    const { searchResults } = this.state;

    return (
      <div className='search-home'>
        <h2>Search:</h2>
        <form onSubmit={(event) => this.handleSearch(event)}>
          <input type="text" name="search" onChange={(event) => this.handleChange(event)} value={this.state.value} />
          <button type="submit">Search</button>
        </form>
        <section>
          {searchResults.length > 0 ? (
            // Renderiza los resultados de búsqueda directamente
            <div className="search-results">
              <button className="go-back-button" onClick={this.handleGoBack}>Go Back</button>
              <h3 className="search-results-title">Search Results:</h3>
              <ul className="search-results-list">
                {searchResults.map((result) => (
                  <li key={result.id} className="search-result-item">
                    <img src={result.album.cover}/>
                    <h4 className="search-result-title">{result.title}</h4>
                    <p className="search-result-artist">Artist: {result.artist.name}</p>
                    {/* Agrega aquí más detalles de los resultados si es necesario */}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            // Renderiza listas de canciones y álbumes predeterminadas
            <React.Fragment>
              <h3>Top Albums:</h3>
              <AlbumListContainer data={this.state.albums} />
              <h3>Top Tracks:</h3>
              <TrackListContainer data={this.state.tracks} />
            </React.Fragment>
          )}
        </section>
      </div>
    );
  }
}

export default Home;
