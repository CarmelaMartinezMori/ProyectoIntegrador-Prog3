import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./albumList.css";

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isFavorite: false,
    };
  }

  toggleExpansion = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  };

  toggleFavorite = () => {
    const { info } = this.props;
    const albumId = info.id;

    // Obtener el estado actual de favoritos de álbumes
    const storedAlbums = localStorage.getItem('favoriteAlbums');
    const albumIds = storedAlbums ? JSON.parse(storedAlbums) : [];

    // Verificar si el álbum actual ya está en favoritos
    const isFavorite = albumIds.includes(albumId);

    // Actualizar la lista de álbumes favoritos en función de la acción
    if (isFavorite) {
      // Si ya es un favorito, quitarlo de la lista
      const updatedAlbumIds = albumIds.filter((id) => id !== albumId);
      localStorage.setItem('favoriteAlbums', JSON.stringify(updatedAlbumIds));
    } else {
      // Si no es un favorito, agregarlo a la lista
      albumIds.push(albumId);
      localStorage.setItem('favoriteAlbums', JSON.stringify(albumIds));
    }

    // Actualizar el estado de isFavorite en el componente
    this.setState({
      isFavorite: !isFavorite,
    });
  };

  render() {
    const { info } = this.props;
    const { isExpanded, isFavorite } = this.state;

    return (
      <React.Fragment>
        <section className={`content ${isExpanded ? "expanded" : ""}`}>
          <article className="card">
            <Link to={`/albumDetail/id/${info.id}`}>
              <img src={info.cover} alt={info.title} />
            </Link>
            <div >
              <div >
                <Link to={`/albumDetail/id/${info.id}`}>
                  <h3>{info.title}</h3>
                </Link>
                {isExpanded && (
                  <div className="info-container">
                    <p>Artist: {info.artist.name}</p>
                    <p>Duration: {info.duration} minutes</p>
                  </div>
                )}
              </div>
              <div className="button-container">
                <button onClick={this.toggleExpansion}>
                  {isExpanded ? "Ver menos" : "Ver más"}
                </button>
                <Link to={`/albumDetail/id/${info.id}`}>Ir a detalle</Link>
                <button onClick={this.toggleFavorite}>
                  {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                </button>
              </div>
            </div>
          </article>
        </section>
      </React.Fragment>
    );
  }
}

export default AlbumList;
