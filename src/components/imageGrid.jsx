import React from "react" ; 

import './../style/imageGrid.css' ; 

export default function ImageGrid(props) {
    props.setShowNav(true);
    return (
        <div  className  = "row" align = "center">
            <div className = "col">
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/1.jpg"} ></img>
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/2.jpg"} ></img>
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/6.jpg"} ></img>
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/10.jpg"} ></img>
                

            </div>
            <div className = "col">
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/3.jpg"} ></img>
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/7.jpg"} ></img>
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/8.jpg"} ></img>
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/4.jpg"} ></img>
            </div>
            <div className = "col">
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/5.jpg"} ></img>
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/3.jpg"} ></img>
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/11.jpg"} ></img>
                <img className  = "gridImage" src = {process.env.PUBLIC_URL + "/Images/temp/9.jpg"} ></img>
            </div>
        </div>
    );
}