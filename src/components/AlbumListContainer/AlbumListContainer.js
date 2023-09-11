import React, { Component } from 'react';
import AlbumList from '../AlbumList/AlbumList';
import { Link } from 'react-router-dom';

class AlbumListContainer extends Component {
  render() {
    return (
      <section className='content'>
        <section>
          <h2>Albums</h2>
          <Link to='/albums'>
            <p>View All</p>
          </Link>
          {/* Check if data is available */}
          {this.props.data.length <= 0 ? (
            <h1>Loading...</h1>
          ) : (
            // Map through the data and render AlbumList component
            this.props.data.map((album, i) => (
              <article key={i}>
                <AlbumList info={album} />
              </article>
            ))
          )}
        </section>
      </section>
    );
  }
}

export default AlbumListContainer;
