import React, {Component} from 'react'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            albums:[],
            tracks:[]
        }
    }

    componentDidMount(){
        fetch('https://api.allorigins.win/raw?url=https://api.deezer.com/chart/0/tracks?limit=20')
            .then(res => res.json())
            .then(data => this.setState({
                tracks: data.data
            }))
            .catch(error => console.log(error))

        fetch('https://api.allorigins.win/raw?url=/https://api.deezer.com/chart/0/albums?limit=20')
            .then(res => res.json())
            .then(data => this.setState({
                albums: data.data
            }))
            .catch(error => console.log(error))
    }

    finder(event){
        event.preventDefault();
        if(this.state.valor === ''){
            this.setState({
                message: 'No has escrito nada aún'
            })
        } else {
            fetch('https://api.allorigins.win/raw?url=https://api.deezer.com/search?q=${this.state.valor}')
                .then(response => response.json())
                .then(data => {
                    console.log(data, 'buscador')
                    this.setState({
                        result: data.data
                    })
                    if(data.results.length === 0){
                        this.setState({
                            message: 'No se encontraron resultados'
                        })
                    }
                })
                .catch(error => console.log(error))
        }
    }

    changesController(event) {
        this.setState(
          { value: event.target.value, message: '', result: [] },
        );
    }
      

    render(){
        return(
            <React.Fragment>
                <div className='buscador-home'>
                    <h2>Search:</h2>
                    <form onSubmit={(event) => this.finder(event)}>
                        <input type="text" onChange={(event) => this.changesController(event)} value={this.state.valor} />
                        <button type="submit">Search</button>
                    </form>
                    <p>{this.state.mensaje}</p>
                </div>
                <section>
                    {this.state.tracks.length === 0 ? <h3>Loading...</h3> :    
                        <section className="canciones">  
                            <div>
                                <h3>Resultados de Busqueda:</h3>
                                
                            </div> 
                        </section>
                    }
                </section>
            </React.Fragment>
        )
    }
}
export default Home