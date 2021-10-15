import {useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import './App.css';
import './style/about.css';
import Banner from "./components/Banner";
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import ImageGrid from './components/imageGrid' ;
import Login from './components/admin/Login' ;


function App() {
  const [showNav, setShowNav] = useState(true);

  return (
    <div className="App">
      <Banner />
      <div className  = "navImage" >
        <Router>
          {showNav === true ? <Navbar /> : null}
          <Switch>
            <Route exact path="/" component={ImageGrid}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/adminLogin" render={(props) => <Login setShowNav={setShowNav} {...props} />  } />
          </Switch>
        </Router>
        
      </div>
      
    </div>
  );
}

export default App;


// complete about.js, navbar.js 