import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './trackList.css';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.info,
      text: 'View more',
      class: 'hidden',
      info: [],
      isFavorite: false,
    };
  }

  toggleText() {
    if (this.state.text === 'View more') {
      this.setState({
        text: 'View less',
        class: 'show',
      });
    } else {
      this.setState({
        text: 'View more',
        class: 'hidden',
      });
    }
  }

  componentDidMount() {
    let storage = localStorage.getItem('favorites');
    let storageToArray = JSON.parse(storage);

    if (storageToArray !== null) {
      let isTrackInArray = storageToArray.includes(this.props.info.id);
      if (isTrackInArray) {
        this.setState({
          isFavorite: true,
        });
      }
    }
  }

  addToFavorites(id) {
    let storage = localStorage.getItem('favorites');

    if (!this.state.isFavorite) {
      if (storage === null) {
        let idInArray = [id];
        let arrayToString = JSON.stringify(idInArray);
        localStorage.setItem('favorites', arrayToString);
      } else {
        let fromStringToArray = JSON.parse(storage);
        fromStringToArray.push(id);
        let arrayToString = JSON.stringify(fromStringToArray);
        localStorage.setItem('favorites', arrayToString);
      }

      this.setState({
        isFavorite: true,
      });
    } else {
      let storageToArray = JSON.parse(storage);
      let filteredArray = storageToArray.filter((elm) => elm !== id);
      let filteredToString = JSON.stringify(filteredArray);
      localStorage.setItem('favorites', filteredToString);

      this.setState({
        isFavorite: false,
      });
    }
  }

  render() {
    return (
      <section className="content">
        <article>
          <Link to={`/albumDetail/id${this.props.info.id}`}></Link>
          <Link to={`/trackDetail/id/${this.props.info.id}`}>{this.props.info.title}</Link>
          <p>{this.props.info.artist.name}</p>
          <a onClick={() => this.toggleText()}>{this.state.text}</a>
          <br />
          <p className={this.state.class}>Duration: {this.props.info.duration} minutes</p>
          <img src={this.props.info.album.cover} alt={this.props.info.title} />

          <section className="extra"></section>
          <br />
          <button className="button" onClick={() => this.addToFavorites(this.props.info.id)}>
            {this.state.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </article>
      </section>
    );
  }
}

export default TrackList;
