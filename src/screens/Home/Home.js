import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import AlbumListContainer from '../../components/AlbumListContainer/AlbumListContainer';
import TrackListContainer from '../../components/TrackListContainer/TrackListContainer';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      tracks: [],
      value: '',
      searchResults: [],
      topResults: [], 
    };
  }

  componentDidMount() {
    // Fetch los datos de las canciones y álbumes del top de la API 
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

    fetch(`https://api.allorigins.win/raw?url=https://api.deezer.com/search?q=${searchTerm}&limit=10&type=album,track`)
      .then(response => response.json())
      .then(data => {
        console.log(data, 'search');
        // Agregamos todos los resultados a la sección de "Top Results"
        this.setState({
          searchResults: data.data,
          topResults: data.data,
        });
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { searchResults, topResults } = this.state;

    return (
      <React.Fragment>
        <div className='search-home'>
        <h2>Search:</h2>
        <form onSubmit={(event) => this.handleSearch(event)}>
          <input type="text" name="search" onChange={(event) => this.handleChange(event)} value={this.state.value} />
          <button type="submit">Search</button>
        </form>
        <section>
            {searchResults.length > 0 ? (
              <React.Fragment>
                <div className="top-results">
                  <h3>Top Results:</h3>
                  <ul className="search-results-list">
                    {topResults.map((result) => (
                      <li key={result.id} className="search-result-item">
                        <Link className="search-link" to={result.type === 'track' ? `/trackDetail/id/${result.id}` : `/albumDetail/id/${result.id}`}>
                          <img src={result.album.cover} alt={result.title} />
                          <h4 className="search-result-title">{result.title}</h4>
                          <p className="search-result-artist">Artist: {result.artist.name}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            ) 
            : (
              // Renderiza listas de canciones y álbumes predeterminadas si no se realiza una búsqueda
              <React.Fragment>
                <AlbumListContainer data={this.state.albums} />
                <TrackListContainer data={this.state.tracks} />
              </React.Fragment>
            )}
          
        </section>
      </div>
      </React.Fragment>
      
    );
  }
}

export default Home;
