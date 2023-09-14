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

      Promise.all(trackIds.map((id) => this.fetchTrackInfo(id)))
        .then((trackInfoArray) => {
          this.setState({ favoriteTracks: trackInfoArray });
        })
        .catch((error) => {
          console.error('Error fetching favorite tracks:', error);
        });
    }

    // Cargar favoritos de álbumes
    const storedAlbums = localStorage.getItem('favoriteAlbums');
    if (storedAlbums) {
      const albumIds = JSON.parse(storedAlbums);

      Promise.all(albumIds.map((id) => this.fetchAlbumInfo(id)))
        .then((albumInfoArray) => {
          this.setState({ favoriteAlbums: albumInfoArray });
        })
        .catch((error) => {
          console.error('Error fetching favorite albums:', error);
        });
    }
  }

  fetchTrackInfo(trackId) {
    return fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${trackId}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          return { ...data, isFavorite: true }; // Agrega la propiedad isFavorite
        } else {
          console.error('Error fetching track info:', data.error);
          return null;
        }
      });
  }

  fetchAlbumInfo(albumId) {
    return fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          return data;
        } else {
          console.error('Error fetching album info:', data.error);
          return null;
        }
      });
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

  // Método para actualizar la lista de canciones favoritas después de eliminar una canción
  updateFavoriteTracks(updatedTracks) {
    this.setState({
      favoriteTracks: updatedTracks,
    });
  }

  render() {
    const { favoriteTracks, favoriteAlbums } = this.state;
    const hasFavorites = favoriteTracks.length > 0 || favoriteAlbums.length > 0;

    return (
      <>
        <h1>Favorites</h1>
        {hasFavorites && (
          <button onClick={() => this.clearFavorites()}>Clear All Favorites</button>
        )}
        {favoriteTracks.length > 0 && (
          <div>
            <h2>Favorite Tracks</h2>
            {/* Pasa el método de actualización como prop */}
            <TrackListContainer
              data={favoriteTracks}
              updateFavorites={(updatedTracks) => this.updateFavoriteTracks(updatedTracks)}
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
          <h3>You have no favorite tracks or albums.</h3>
        )}
      </>
    );
  }
}

export default Favorites;
