import React from 'react';
import {Navbar, Footer} from './modules';
import Routes from './Routes';
import {history} from "./redux/store";


import './assets/_etc.scss'
export default class App extends React.Component {
  
  render() {
            
    const options = {
      position: 'bottom center',
      timeout: 5000,
      offset: '30px',
      transition: 'scale'
    }

    return (
      
      <section style={{paddingTop: '100px'}}>

      <Navbar/>
        
        <Routes history={history}/>
        <Footer/>
      </section>
    )
  }
}