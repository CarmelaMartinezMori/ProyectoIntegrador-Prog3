import React from 'react';
import { Link } from 'react-router-dom';
import TrackList from '../TrackList/TrackList';
import './trackListContainer.css'; 

function TrackListContainer(props) {
  return (
    <React.Fragment>
      <section className="content">
        <div className="header">
          <h2>Songs</h2>
          <Link to="/tracks">
            <button className="button">View All</button>
          </Link>
        </div>
        <div className="track-list">
          {props.data.length <= 0 ? (
            <h1>Loading...</h1>
          ) : (
            props.data.map((track, i) => (
              <article className="list" key={i}>
                <TrackList info={track} favoriteTracks={props.favoriteTracks} />
              </article>
            ))
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

export default TrackListContainer;
