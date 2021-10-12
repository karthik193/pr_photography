import React from "react" ; 

import './../style/imageGrid.css' ; 

export default function ImageGrid() {
    return (
        <div  className  = "row" align = "center">
            <div className = "col">
                <img src = {process.env.PUBLIC_URL + "/Images/temp/1.jpg"} ></img>
                <img src = {process.env.PUBLIC_URL + "/Images/temp/2.webp"} ></img>

            </div>
            <div className = "col">
            <img src = {process.env.PUBLIC_URL + "/Images/temp/3.jpg"} ></img>
            <img src = {process.env.PUBLIC_URL + "/Images/temp/4.jpg"} ></img>
            </div>
            <div className = "col">
            <img src = {process.env.PUBLIC_URL + "/Images/temp/5.jpg"} ></img>
            <img src = {process.env.PUBLIC_URL + "/Images/temp/3.jpg"} ></img>
            </div>
        </div>
    );
}