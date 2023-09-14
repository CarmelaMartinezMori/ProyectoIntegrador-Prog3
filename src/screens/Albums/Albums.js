import React, { Component } from 'react';
import AlbumListContainer from '../../components/AlbumListContainer/AlbumListContainer';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      offset: 20,
      index: 0,
      backup: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.fetchAlbums();
  }

  fetchAlbums() {
    fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=20&offset=${this.state.index}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState((prevState) => ({
          albums: data.data,
          backup: data.data,
          index: prevState.index + 20,
        }));
      })
      .catch((err) => console.log(err));
  }

  handleSearch(event) {
    event.preventDefault(); // Evitar la recarga de la página
    const query = this.state.searchQuery;
    const filteredAlbums = this.state.backup.filter((album) =>
      album.title.toLowerCase().includes(query.toLowerCase())
    );

    this.setState({
      albums: filteredAlbums,
    });
  }

  loadMoreAlbums() {
    this.fetchAlbums();
  }

  render() {
    return (
      <div className='albums'>
        <h1>All Albums</h1>
        <form onSubmit={(event) => this.handleSearch(event)}>
          <input
            type="text"
            placeholder="Search Albums"
            value={this.state.searchQuery}
            onChange={(event) => this.setState({ searchQuery: event.target.value })} 
          />
          <button type="submit">Search</button>
        </form>
        <AlbumListContainer data={this.state.albums} showLoadMoreButton={false} />
        <button onClick={() => this.loadMoreAlbums()}>Load More</button>
      </div>
    );
  }
}

export default Albums;
