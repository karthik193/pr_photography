import './App.css';
import './style/about.css';
import Banner from "./components/Banner";
import Navbar from './components/Navbar';
import About from './components/About';
import {Switch, Route} from "react"

import ImageGrid from './components/imageGrid' ;


function App() {
  return (
    <div className="App">
      <Banner />
      <div className  = "navImage" >
        <Navbar />
        <About />
        <ImageGrid />
      </div>
      
    </div>
  );
}

export default App;


// complete about.js, navbar.js 