import './App.css';
import './style/about.css';
import Banner from "./components/Banner";
import Navbar from './components/Navbar';
import About from './components/About';

import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import ImageGrid from './components/imageGrid' ;


function App() {
  return (
    <div className="App">
      <Banner />
      <div className  = "navImage" >
        <Navbar />

        <Router>
          <Switch>
            <Route exact path="/" component={ImageGrid}/>
            <Route exact path="/about" component={About}/>
          </Switch>
        </Router>
        
      </div>
      
    </div>
  );
}

export default App;


// complete about.js, navbar.js 