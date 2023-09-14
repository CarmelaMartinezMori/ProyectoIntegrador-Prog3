import React from 'react';
import { Link } from 'react-router-dom';
import AlbumList from '../AlbumList/AlbumList';
import './albumListContainer.css';

function AlbumListContainer(props) {
  return (
    <React.Fragment>
      <section className="album-list-container">
        <h2>Albums</h2>
        <Link to="/albums">
          <button className="button">View All</button>
        </Link>
        <div className="content">
          {props.data.length <= 0 ? (
            <h1>Loading...</h1>
          ) : (
            props.data.map((album, i) => (
              <article className="list" key={i}>
                <AlbumList info={album} />
              </article>
            ))
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

export default AlbumListContainer;
