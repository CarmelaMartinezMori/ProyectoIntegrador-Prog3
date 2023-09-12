import React from 'react';
import { Link} from 'react-router-dom';
import AlbumList from '../AlbumList/AlbumList';


function AlbumListContainer(props) {

  return (
    <section className='content'>
      <section>
        <h2>Albums</h2>
        <Link to='/albums'>
          <p>View All</p>
        </Link>
        {/* Check if data is available */}
        {props.data.length <= 0 ? (
          <h1>Loading...</h1>
        ) : (
          // Map through the data and render AlbumList component
          props.data.map((album, i) => (
            <article key={i}>
              <AlbumList info={album} />
            </article>
          ))
        )}
      </section>
    </section>
  );
}

export default AlbumListContainer;
