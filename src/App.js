import './App.css';
import info from './dataReference/info' ; 
function App() {
  return (
    <div className="App"  align = "center">
      {info.title} <br/>
      My name is {info.admin.name}<br/>
      {/* <img src = {process.env.PUBLIC_URL + "/Images/logo.png"}  alt  = "NO IMAGGE"  /> */}
    </div>
  );
}

export default App;


// complete about.js, navbar.js 