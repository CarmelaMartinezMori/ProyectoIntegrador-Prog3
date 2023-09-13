import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './trackList.css';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggleExpansion = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  };

  render() {
    const { info } = this.props;
    const { isExpanded } = this.state;

    if (!info) {
      // Manejar el caso en el que info es nulo o no está definido
      return null;
    }

    return (
      <section className={`content ${isExpanded ? 'expanded' : ''}`}>
        <article>
          <Link to={`/trackDetail/id/${info.id}`}>
            <img src={info.album.cover} alt={info.title} />
            <h3> {info.title}</h3>
          </Link>
          
          <button onClick={this.toggleExpansion}>
            {isExpanded ? 'View less' : 'View more'}
          </button>
          {isExpanded && (
            <>
              <p>{info.artist.name}</p>
              <p>Duration: {info.duration} minutes</p>
            </>
          )}
          <Link to={`/trackDetail/id/${info.id}`}>Ir a detalle</Link>
        </article>
      </section>
    );
  }
}

export default TrackList;
