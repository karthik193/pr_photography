import { getAuth } from "@firebase/auth";
import React, {useState} from "react";
import { useHistory } from "react-router";
import { redirectHandler } from "../functions/helpers";
import "../style/navbar.css";
import Collapsible from 'react-collapsible';


export default function Navbar(props){
    const history = useHistory(); 
    const path = useState("");

    return  <div><img className="logoImg" align = "left" src = {process.env.PUBLIC_URL + "/Images/logo.png"}  onClick = {() => {redirectHandler(history , "/")}}alt  = "Logo"  />
    <div className = "sideNav">
        <p onClick = {() => {redirectHandler(history , "/about")}}>ABOUT</p>
        <p>CATEGORIES</p>
        <Collapsible trigger="CATEGORIES" className = "collapsible">
            <p>Category1</p>
            <p>Category2</p>
            <p>Category3</p>
        </Collapsible>
        <p onClick = {() => {redirectHandler(history ,"/contact")}}>CONTACT</p>
    </div></div>;
}