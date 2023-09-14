import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./albumList.css";

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggleExpansion = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  };

  render() {
    const { isExpanded } = this.state;
    const { info } = this.props;

    console.log(info.id)
    
    return (
      <React.Fragment>
        <section className={`content ${isExpanded ? "expanded" : ""}`}>
          <article className="card">
            <Link to={`/albumDetail/id/${info.id}`}>
              <img src={info.cover_big} alt={info.title} />
            </Link>
            <div >
              <div >
                <Link to={`/albumDetail/id/${info.id}`}>
                  <h3>{info.title}</h3>
                </Link>
                {isExpanded && (
                  <div className="info-container">
                    <p className="artist">Artist: {info.artist.name}</p>
                    <p className="duration">Duration: {info.duration} minutes</p>
                  </div>
                )}
              </div>
              <div className="button-container">
                <button className="viewmore" onClick={this.toggleExpansion}>
                  {isExpanded ? "View Less" : "View More"}
                </button>
                <Link to={`/albumDetail/id/${info.id}`}>Go to Detail</Link>
              </div>
            </div>
          </article>
        </section>
      </React.Fragment>
    );
  }
}

export default AlbumList;