import React, { Component } from 'react';
import TrackListContainer from '../../components/TrackListContainer/TrackListContainer';

class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      offset: 20,
      index: 0,
      backup: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.fetchTracks();
  }

  fetchTracks() {
    fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=20&offset=${this.state.index}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState((prevState) => ({
          tracks: data.data,
          backup: data.data,
          index: prevState.index + 20,
        }));
      })
      .catch((err) => console.log(err));
  }

  handleSearch(event) {
    event.preventDefault(); // Evitar la recarga de la página
    const query = this.state.searchQuery;
    const filteredTracks = this.state.backup.filter((track) =>
      track.title.toLowerCase().includes(query.toLowerCase())
    );

    this.setState({
      tracks: filteredTracks,
    });
  }

  loadMoreTracks() {
    this.fetchTracks();
  }

  render() {
    return (
      <div className=''>
        <h1>Songs</h1>
        <form onSubmit={(event) => this.handleSearch(event)}>
          <input
            type="text"
            placeholder="Search Songs"
            value={this.state.searchQuery}
            onChange={(event) => this.setState({ searchQuery: event.target.value })} 
          />
          <button type="submit">Search</button>
        </form>
        <TrackListContainer data={this.state.tracks} showLoadMoreButton={false} />
        <button onClick={() => this.loadMoreTracks()}>Load More</button>
      </div>
    );
  }
}

export default Tracks;
