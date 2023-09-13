import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './trackList.css';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'View more',
      class: 'hidden',
    };
  }

  toggleText = () => {
    this.setState((prevState) => ({
      text: prevState.text === 'View more' ? 'View less' : 'View more',
      class: prevState.class === 'hidden' ? 'show' : 'hidden',
    }));
  };

  render() {
    const { info } = this.props;

    if (!info) {
      // Manejar el caso en el que info es nulo o no está definido
      return null;
    }

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
        </article>
      </section>
    );
  }
}

export default TrackList;
