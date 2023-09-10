import React, {Component} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import './Header.css'

const elements =[
  {name: 'Home', route:'/'},
  {name: 'Favorites', route:'/favorites'},
  {name: 'Tracks', route:'/tracks'},
  {name: 'Albums', route:'/albums'}
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
        {elements.map((element, idx) => <Link to={element.route} key={idx}> {element.name}</Link>
        )}
      </nav>
    )
  }
}

export default Header