import './App.css';
import './style/about.css';
import Banner from "./components/Banner";
import Navbar from './components/Navbar';

import ImageGrid from './components/imageGrid' ;


function App() {
  return (
    <div className="App">
      <Banner />
      <div className  = "navImage" >
        <Navbar />
        <ImageGrid />
      </div>
      
    </div>
  );
}

export default App;


// complete about.js, navbar.js 