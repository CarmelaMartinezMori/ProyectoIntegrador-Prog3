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



  render() {
    const { info } = this.props;

    return (
      <section className="content">
        <article>
          <Link to={`/trackDetail/id/${info.id}`}>
            <h3>{info.title}</h3>
            <p>{info.artist.name}</p>
            <p onClick={this.toggleText}>View more</p>
            <p className={this.state.class}>
              Duration: {info.duration} minutes
            </p>
            <img src={info.album.cover} alt={info.title} />
          </Link>
        </article>
      </section>
    );
  }
}

export default TrackList;
