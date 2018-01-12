import React from 'react';
import {Navbar, Footer} from './modules';
import Routes from './Routes';
import {history} from "./redux/store";
import './assets/_etc.scss'
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
          <div style={{paddingTop:'80px'}}>
          </div>
        <Routes history={history}/>
        <Footer/>
      </div>
    )
  }
}