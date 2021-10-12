import './App.css';
import './style/about.css';
import Banner from "./components/Banner";
import Navbar from './components/Navbar';
import About from './components/About';
import {Switch, Route} from "react"

function App() {
  return (
    <div className="App">
      <Banner />
      <Navbar />
      <About />
  </div>
  );
}

export default App;


// complete about.js, navbar.js 