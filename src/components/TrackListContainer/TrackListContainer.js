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
          <h2>Spngs</h2>
          <Link to="/tracks">
            <p>View All</p>
          </Link>
          {/* Check if data is available */}
          {this.props.data.length <= 0 ? (
            <h1>Loading...</h1>
          ) : (
            // Map through the data and render AlbumList component
            this.props.data.map((track, i) => (
              <article key={i}>
                <TrackList info={track} />
              </article>
            ))
          )}
        </section>
      </section>
    );
  }
}

export default TrackListContainer;
