import { getAuth } from "@firebase/auth";
import React, {useState} from "react";
import { useHistory } from "react-router";
import { redirectHandler } from "../functions/helpers";
import "../style/navbar.css";
import Collapsible from 'react-collapsible';


export default function Navbar(props){
    const history = useHistory(); 
    const path = useState("");
    const Upload  = <p onClick = {() => {redirectHandler(history , "/upload")}}>UPLOAD</p> ; 
    return  <div><img className="logoImg" align = "left" src = {process.env.PUBLIC_URL + "/Images/logo.png"}  onClick = {() => {redirectHandler(history , "/")}}alt  = "Logo"  />
    <div className = "sideNav" id = "sideNav">
        {localStorage.getItem("admin") == "true" ? Upload : null}
        <p onClick = {() => {redirectHandler(history , "/about")}}>ABOUT</p>
        <Collapsible trigger="CATEGORIES" className = "collapsible" onOpening = {() => {document.getElementById("sideNav").className = "sideNav collapse"}} onClose = {() => {document.getElementById("sideNav").className = "sideNav"}}>
            <p>Category1</p>
            <p>Category2</p>
            <p>Category3</p>
        </Collapsible>
        <p onClick = {() => {redirectHandler(history ,"/contact")}}>CONTACT</p>
    </div></div>;
}