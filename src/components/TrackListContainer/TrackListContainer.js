import React, { Component } from 'react';
import './trackListContainer.css';
import { Link } from 'react-router-dom';
import TrackList from '../TrackList/TrackList';

class TrackListContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="content">
        <section>
          <h2>Songs</h2>
          <Link to="/viewAllSongs">
            <p>View All</p>
          </Link>
          {console.log(this.props.data, 'data')}
          {this.props.data.length < 0 ? (
            <h1>Loading...</h1>
          ) : (
            this.props.data.map((track, i) => {
              return (
                <article key={i}>
                  {console.log(track, 'isa')}
                  <TrackList info={track} />
                </article>
              );
            })
          )}
        </section>
      </section>
    );
  }
}

export default TrackListContainer;
