import React from "react";
import '../style/about.css';

export default function About(props) {
    props.setShowNav(true);
    return <div className = "about">About</div>;
}