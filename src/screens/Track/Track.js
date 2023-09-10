import React, { Component } from "react";
import './track.css'

class Track extends Component{
    constructor(props){
        super(props)
        this.state ={
            data: props,
            id: props.match.params.id,
        }
    }

    componentDidMount(){
        fetch('https://api.allorigins.win/raw?url=https://api.deezer.com/track/${this.state.id}')
            .then(data => data.json())        
            .then( info =>{
                this.setState({info: info});
            })
    }

    addToFavorites(id) {
        const storageKey = 'favoriteSongs';
        let storage = localStorage.getItem(storageKey);
        if (!this.state.isFavorite) {
          //Si no está en Favorites, lo agrego
          const idInArray = storage ? JSON.parse(storage) : [];
          idInArray.push(id);
      
          // Update del local storage
          localStorage.setItem(storageKey, JSON.stringify(idInArray));
      
          this.setState({
            isFavorite: true,
          });
        } else {
          // Si ya está en Favorites, lo saco
          let storageToArray = storage ? JSON.parse(storage) : [];
          const filteredArray = storageToArray.filter((elm) => elm !== id);
      
          // Update del  local storage
          localStorage.setItem(storageKey, JSON.stringify(filteredArray));
      
          this.setState({
            isFavorite: false,
          });
        }
      }
      

    render() {
        return (
          this.state.info ? (
            <article className='container'>
              <h4 className='body_track'>{this.state.info.title}</h4>
              <p className='body_track'>{this.state.info.artist.name}</p>
              <p className='body_track'>{this.state.info.album.title}</p>
              <img className='imagen' src={this.state.info.album.cover_medium} alt={this.state.info.album.title} />
              <iframe src={this.state.info.preview} title="Audio Preview" />
      
              <a onClick={() => this.changeText()} className='more'>{this.state.text}</a>
              <section className='extra'>
                {/* Add any additional content here if needed */}
              </section>
      
              <button className='boton' onClick={() => this.addToFavorites(this.state.info.id)}>
                {this.state.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              </button>
            </article>
          ) : null
        );
    }
      
}

export default Track