import React from "react";
import { useHistory } from "react-router";
import "../style/navbar.css";

export default function Navbar(){
    const history = useHistory(); 
    return <div className = "sideNav">
        <p>ABOUT</p>
        <p>CATEGORIES</p>
        <p>CONTACT</p>
    </div>;
}