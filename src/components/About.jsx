import React from "react";
import info from "../dataReference/info";
import '../style/about.css';

export default function About(props) {
    props.setShowNav(true);
    return <div className = "about">
        <h3>ABOUT</h3>
        <div className = "aboutContent" >
            {info.about}
        </div>
        </div>;
}