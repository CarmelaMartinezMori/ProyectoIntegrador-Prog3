import React, { Component } from 'react';
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
          <Link to="/tracks">
            <p>View All</p>
          </Link>
          {this.props.data.length <= 0 ? (
            <h1>Loading...</h1>
          ) : (
            this.props.data.map((track, i) => (
              <article key={i}>
                <TrackList
                  info={track}
                  favoriteTracks={this.props.favoriteTracks}
                  updateFavorites={this.props.updateFavorites}
                />
              </article>
            ))
          )}
        </section>
      </section>
    );
  }
}

export default TrackListContainer;
