import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './albumList.css';

class ListadoAlbum extends Component {
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

  handleFavorites = (id) => {
    let storage = localStorage.getItem('favoriteAlbums') || '[]';
    let storageToArray = JSON.parse(storage);

    if (!this.state.isFavorite) {
      storageToArray.push(id);
    } else {
      storageToArray = storageToArray.filter((elm) => elm !== id);
    }

    localStorage.setItem('favoriteAlbums', JSON.stringify(storageToArray));

    this.setState({
      isFavorite: !this.state.isFavorite,
    });
  };

  render() {
    const { info } = this.props;

    return (
      <section className="content">
        <article>
          <Link to={`/album/id/${info.id}`}>
            <img src={info.cover} alt={info.title} />
          </Link>
          <div>
            <h3>{info.title}</h3>
            <p className={this.state.clase}>{`Artist: ${info.artist}, Explicit Lyrics: ${info.explicit_lyrics}`}</p>
            <a onClick={this.toggleText}>{this.state.texto}</a>

            <button className="boton" onClick={() => this.handleFavorites(info.id)}>
              {this.state.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          </div>
        </article>
      </section>
    );
  }
}

export default ListadoAlbum;
