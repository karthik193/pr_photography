import React , { createContext, Suspense, useContext, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.css";
import "./style/about.css";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/admin/Login";
import Upload from "./components/admin/Upload";

const ImageGrid  = React.lazy(()=> import('./components/ImageGrid')) ; 
export const CategoryContext = createContext({
  category: "",
  setCategory: () => {},
});

function App() {
  const [showNav, setShowNav] = useState(true);
  const [category, setCategory] = useState("");

  const value = useMemo(() => ({ category, setCategory }), [category]);

  return (
    <div className="App">
      <CategoryContext.Provider value={value}>
        <Router>
          <Banner />
          {showNav === true ? <Navbar /> : null}
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Suspense fallback  = {<div>Loading...</div>}>
                <ImageGrid setShowNav={setShowNav} {...props} />
                </Suspense>
              )}
            />
            <Route
              exact
              path="/about"
              render={(props) => <About setShowNav={setShowNav} {...props} />}
            />
            <Route
              exact
              path="/contact"
              render={(props) => <Contact setShowNav={setShowNav} {...props} />}
            />
            <Route
              exact
              path="/adminLogin"
              render={(props) => <Login setShowNav={setShowNav} {...props} />}
            />
            <Route
              exact
              path="/upload"
              render={(props) => <Upload setShowNav={setShowNav} {...props} />}
            />
          </Switch>
        </Router>
      </CategoryContext.Provider>
    </div>
  );
}

export default App;

// complete about.js, navbar.js
