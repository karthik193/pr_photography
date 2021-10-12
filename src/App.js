import './App.css';
import './style/about.css';
import Banner from "./components/Banner";
import Navbar from './components/Navbar';
import About from './components/About';
import {Switch, Route} from "react"

import ImageGrid from './components/imageGrid' ;
import ContactInfo from './components/contact'

function App() {
  return (
    <div className="App">
      <Banner />
      <div className  = "navImage" >
        <Navbar />
        <ImageGrid />
      </div>
      <ContactInfo />
      
    </div>
  );
}

export default App;


// complete about.js, navbar.js 