import './App.css';
import './style/about.css';
import Banner from "./components/Banner";
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/admin/Login' ;
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import ImageGrid from './components/imageGrid' ;
import ContactInfo from './components/contact' ; 

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
            <Route exact path="/adminLogin" component={Login}/>
          </Switch>
        </Router>
        
      </div>
      <ContactInfo />
      
    </div>
  );
}

export default App;


// complete about.js, navbar.js 