import React, {Component} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import './Header.css'
import Home from '../../screens/Home'

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
        {elementos.map((elm, idx) => <Link to={elm.ruta} key={idx}> {elm.nombre}</Link>
        )}
      </nav>
    )
  }
}

export default Header