import React, {Component} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import './Header.css'

const elementos =[
  {nombre: 'Inicio', ruta:'/'},
  {nombre: 'Favoritos', ruta:'/favoritos'},
  {nombre: 'Canciones', ruta:'/canciones'},
  {nombre: 'Álbumes', ruta:'/albumes'}
]
class Header extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }

  render(){
    return(
      <nav className='nav'>
        <img className='logo' src='/img/logo.png'alt='logo'></img>
        {elementos.map((elm, idx) => <li key={idx} > {elm.nombre}</li>
        )}
      </nav>
    )
  }
}

export default Header