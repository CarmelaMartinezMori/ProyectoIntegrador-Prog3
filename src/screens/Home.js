import React, { Component } from 'react';
import AlbumListContainer from '../components/AlbumListContainer/AlbumListContainer';
import TrackListContainer from '../components/TrackListContainer/TrackListContainer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      tracks: [],
      searchResults: [],
      message: '',
      value: ''
    };
  }

  componentDidMount() {
    fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=20')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => this.setState({
        tracks: data.data
      }, () => console.log(this.state.tracks)))
      .catch(error => console.log('Error fetching tracks:', error));

    fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=20')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => this.setState({
        albums: data.data
      }))
      .catch(error => console.log('Error fetching albums:', error));
  }

  handleSearch(event) {
    event.preventDefault();
    if (this.state.value === '') {
      this.setState({
        message: 'You haven\'t written anything yet'
      });
    } else {
      fetch(`https://api.allorigins.win/raw?url=https://api.deezer.com/search?q=${this.state.value}`)
        .then(response => response.json())
        .then(data => {
          console.log(data, 'search');
          this.setState({
            searchResults: data.data
          });
          if (data.results.length === 0) {
            this.setState({
              message: 'No results were found'
            });
          }
        })
        .catch(error => console.log(error));
    }
  }

  handleChange(event) {
    this.setState(
      { value: event.target.value, message: '', searchResults: [] },
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className='search-home'>
          <h2>Search:</h2>
          <form onSubmit={(event) => this.handleSearch(event)}>
            <input type="text" onChange={(event) => this.handleChange(event)} value={this.state.value} />
            <button type="submit">Search</button>
          </form>
          <p>{this.state.message}</p>
        </div>
        <section>
          {this.state.tracks.length === 0 ? <h3>Loading...</h3> :
            <section className="songs">
              <div>
                <h3>Search Results:</h3>
                <AlbumListContainer data={this.state.albums} />
                <TrackListContainer data={this.state.tracks} />
              </div>
            </section>
          }
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
