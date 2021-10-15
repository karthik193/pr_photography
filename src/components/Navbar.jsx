import { getAuth } from "@firebase/auth";
import React, {useState} from "react";
import { useHistory } from "react-router";
import { redirectHandler } from "../functions/helpers";
import "../style/navbar.css";


export default function Navbar(props){
    const history = useHistory(); 
    const path = useState("");
    const auth  = getAuth() ; 
    return <div className = "sideNav">
        <p onClick = {() => {redirectHandler(history , "/about")}}>ABOUT</p>
        <p>CATEGORIES</p>
        <p onClick = {() => {redirectHandler(history ,"/contact")}}>CONTACT</p>
        
    </div>;
}