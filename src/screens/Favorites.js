import React, { Component } from 'react';
import AlbumListContainer from '../components/AlbumListContainer/AlbumListContainer';
import TrackListContainer from '../components/TrackListContainer/TrackListContainer';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteTracks: [],
      favoriteAlbums: [],
    };
  }

  componentDidMount() {
    this.loadFavoriteTracks();
    this.loadFavoriteAlbums();
  }

  loadFavoriteTracks() {
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
  }

  fetchTrackInfo(trackId) {
    return fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${trackId}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          return data;
        } else {
          console.error('Error fetching track info:', data.error);
          return null;
        }
      });
  }

  loadFavoriteAlbums() {
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

  render() {
    const { favoriteTracks, favoriteAlbums } = this.state;

    return (
      <>
        <h1>Favorites</h1>
        {favoriteTracks.length > 0 && (
          <div>
            <h2>Favorite Tracks</h2>
            <TrackListContainer data={favoriteTracks} />
          </div>
        )}
        {favoriteAlbums.length > 0 && (
          <div>
            <h2>Favorite Albums</h2>
            <AlbumListContainer data={favoriteAlbums} />
          </div>
        )}
        {(favoriteTracks.length === 0 && favoriteAlbums.length === 0) && (
          <h3>You have no favorite tracks or albums.</h3>
        )}
      </>
    );
  }
}

export default Favorites;
