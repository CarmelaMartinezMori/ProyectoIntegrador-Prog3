import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './albumList.css';

class AlbumList extends Component {
  state = {
    texto: 'View more',
    clase: 'hidden',
    isFavorite: false,
  };

  toggleText = () => {
    this.setState((prevState) => ({
      texto: prevState.texto === 'View more' ? 'View less' : 'View more',
      clase: prevState.clase === 'hidden' ? 'show' : 'hidden',
    }));
  };

  

  render() {
    const { info } = this.props;

    return (
      <section className="content">
        <article>
          <Link to={`/albumDetail/id/${info.id}`}>
            <img src={info.cover} alt={info.title} />
            <div className="album-info">
              <h3>{info.title}</h3>
              <p>
                View more
                {` - Artist: ${info.artist.name}, Explicit Lyrics: ${info.explicit_lyrics}`}
              </p>
            </div>
          </Link>
        </article>
      </section>
    );
  }
}

export default AlbumList;
