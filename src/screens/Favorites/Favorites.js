import React, { Component } from 'react';
import AlbumListContainer from '../../components/AlbumListContainer/AlbumListContainer';
import TrackListContainer from '../../components/TrackListContainer/TrackListContainer';
import './favorites.css'

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteTracks: [],
      favoriteAlbums: [],
    };
  }

  componentDidMount() {
    this.loadFavorites();
  }

  loadFavorites() {
    // Cargar favoritos de canciones
    const storedTracks = localStorage.getItem('favoriteTracks');
    if (storedTracks) {
      const trackIds = JSON.parse(storedTracks);
  
      if (trackIds.length > 0) { // Verificar la longitud del array
        Promise.all(trackIds.map((id) =>{
        return this.fetchTrackInfo(id)
        }))
        .then((trackInfoArray) => {
            //console.log("then de promise all", trackInfoArray)
            this.setState({favoriteTracks: trackInfoArray})
          })
          .catch((error) => {
            console.error('Error fetching favorite tracks:', error);
          });
      }
    }
  
    //Cargar favoritos de álbumes
    const storedAlbums = localStorage.getItem('favoriteAlbums');
    if(storedAlbums){
      const albumIds = JSON.parse(storedAlbums);

      if(albumIds.length > 0){
        Promise.all(albumIds.map((id) => {
          return this.fetchAlbumInfo(id)
        }))
        .then((albumInfoArray) => {
          //console.log("then de promise all 2", albumInfoArray)
          this.setState({favoriteAlbums: albumInfoArray})
        })
        .catch((error) => {
          console.error('Error fetching favorite tracks:', error);
        });
      }
    }
  }
  

  fetchTrackInfo(trackId) {
    return fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${trackId}`)
      .then((response) => response.json())
      .catch(error => console.log(error))
  }

  fetchAlbumInfo(albumId) {
    return fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/${albumId}`)
      .then((response) => response.json())
      .catch(error => console.log(error))
  }

  
  clearFavorites() {
    // Limpiar favoritos eliminando las claves de almacenamiento local
    localStorage.removeItem('favoriteTracks');
    localStorage.removeItem('favoriteAlbums');

    // Actualizar el estado para reflejar que no hay favoritos
    this.setState({
      favoriteTracks: [],
      favoriteAlbums: [],
    });
  }


  render() {
    const { favoriteTracks, favoriteAlbums } = this.state;
    const hasFavorites = favoriteTracks.length > 0 || favoriteAlbums.length > 0;

    return (
      <React.Fragment>
        <h1>Favorites</h1>
        {hasFavorites && (
          <button onClick={() => this.clearFavorites()}>Clear All Favorites</button>
        )}
        {favoriteTracks.length > 0 && (
          <div>
            <h2>Favorite Tracks</h2>
            
            <TrackListContainer
              data={favoriteTracks}
            />
          </div>
        )}
        {favoriteAlbums.length > 0 && (
          <div>
            <h2>Favorite Albums</h2>
            <AlbumListContainer data={favoriteAlbums} />
          </div>
        )}
        {!hasFavorites && (
          <h3 className='nofavorites'>You have no favorite tracks or albums.</h3>
        )}
      </React.Fragment>
    );
  }
}

export default Favorites;