import React, {useState} from "react";
import { useHistory } from "react-router";
import {BrowserRouter as Router, Redirect} from "react-router-dom";
import "../style/navbar.css";

export default function Navbar(props){
    const history = useHistory(); 
    const path = useState("");
    const redirectHandler = (path) => {
        history.push(path);
    }
    return  <div><img className="logoImg" align = "left" src = {process.env.PUBLIC_URL + "/Images/logo.png"}  alt  = "Logo"  />
    <div className = "sideNav">
        <p onClick = {() => {redirectHandler("/about")}}>ABOUT</p>
        <p>CATEGORIES</p>
        <p onClick = {() => {redirectHandler("/contact")}}>CONTACT</p>
    </div></div>;
}