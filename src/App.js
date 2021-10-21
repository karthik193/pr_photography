import {useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import './App.css';
import './style/about.css';
import Banner from "./components/Banner";
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import ImageGrid from './components/ImageGrid' ;
import Login from './components/admin/Login' ;
import Upload from './components/admin/Upload' ; 


function App() {
  const [showNav, setShowNav] = useState(true);

  return (
    <div className="App">
        <Router>
          <Banner />
          {showNav === true ? <Navbar /> : null}
          <Switch>
            <Route exact path="/" render={(props) => <ImageGrid setShowNav={setShowNav} {...props} />  } />
            <Route exact path="/about" render={(props) => <About setShowNav={setShowNav} {...props} />  } />
            <Route exact path="/contact" render={(props) => <Contact setShowNav={setShowNav} {...props} />  } />
            <Route exact path="/adminLogin" render={(props) => <Login setShowNav={setShowNav} {...props} />  } />
            <Route exact path="/upload" render={(props) => <Upload setShowNav={setShowNav} {...props} />  } />
          </Switch>
        </Router>
        
      
    </div>
  );
}

export default App;


// complete about.js, navbar.js 