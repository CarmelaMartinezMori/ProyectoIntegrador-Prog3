import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './trackList.css';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'View more',
      class: 'hidden',
      isFavorite: false,
    };
  }

  toggleText = () => {
    this.setState((prevState) => ({
      text: prevState.text === 'View more' ? 'View less' : 'View more',
      class: prevState.class === 'hidden' ? 'show' : 'hidden',
    }));
  };

  componentDidMount() {
    let storage = localStorage.getItem('favoriteTracks') || '[]';
    let storageToArray = JSON.parse(storage);

    if (storageToArray.includes(this.props.info.id.toString())) {
      this.setState({
        isFavorite: true,
      });
    }
  }

  handleFavorites = (id) => {
    let storage = localStorage.getItem('favoriteTracks') || '[]';
    let storageToArray = JSON.parse(storage);

    if (!this.state.isFavorite) {
      storageToArray.push(id.toString());
    } else {
      storageToArray = storageToArray.filter((elm) => elm !== id.toString());
    }

    localStorage.setItem('favoriteTracks', JSON.stringify(storageToArray));

    this.setState({
      isFavorite: !this.state.isFavorite,
    });
  };

  render() {
    const { info } = this.props;

    return (
      <section className="content">
        <article>
          <Link to={`/trackDetail/id/${info.id}`}>
            <h3>{info.title}</h3>
            <p>{info.artist.name}</p>
            <a onClick={this.toggleText}>{this.state.text}</a>
            <p className={this.state.class}>Duration: {info.duration} minutes</p>
            <img src={info.album.cover} alt={info.title} />
          </Link>
          <button className="button" onClick={() => this.handleFavorites(info.id)}>
            {this.state.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </article>
      </section>
    );
  }
}

export default TrackList;
