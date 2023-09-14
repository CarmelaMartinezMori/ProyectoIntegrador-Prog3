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
    const { isExpanded } = this.state;
    const { info } = this.props;

    return (
      <React.Fragment>
      <section className={`content ${isExpanded ? "expanded" : ""}`}>
        <article className='card'>
          <Link to={`/trackDetail/id/${info.id}`}>
            <img className="imagen" src={info.album.cover_big} alt={info.title} />
            <h3> {info.title}</h3>
          </Link>
          <button onClick={this.toggleExpansion}>
            {isExpanded ? "View less" : "View more"}
          </button>
          {isExpanded && (
            <>
              <p className='artist'>{info.artist.name}</p>
              <p className='duration'>Duration: {info.duration} minutes</p>
            </>
          )}
          <Link to={`/trackDetail/id/${info.id}`}>Ir a detalle</Link>
        </article>
      </section>
    </React.Fragment>
    );
  }
}

export default TrackList;

