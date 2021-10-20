import { getAuth } from "@firebase/auth";
import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";
import { redirectHandler } from "../functions/helpers";
import "../style/navbar.css";
import Collapsible from 'react-collapsible';
import {getFirestore,doc, getDoc} from 'firebase/firestore' ; 
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';



export default function Navbar(props){
    const history = useHistory(); 
    const path = useState("");
    const [catListFlag, setCatListFlag] = useState(false);
    const Upload  = <p onClick = {() => {redirectHandler(history , "/upload")}}>UPLOAD</p> ; 
    const [sidebar, setSidebar] = useState(false);
    var catList = [];


    
    const toggleDrawer = (flag) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }

        setSidebar(flag)
    };


const styles = {
  BackdropProps: {
    background: 'transparent'
  }
};


    useEffect(async ()=>{
        const db = getFirestore();
        const docRef = doc(db, "meta-info", "categories");
        const docSnap = await getDoc(docRef);
        console.log("test")
        catList = docSnap.data().categoryList;
        setCatListFlag(true);
    }, [catListFlag]);

    return  <div>
        <div className="navbar">
            <img className="logoImg" align = "left" src = {process.env.PUBLIC_URL + "/Images/logo.png"}  onClick = {() => {redirectHandler(history , "/")}}alt  = "Logo"  />
            <div className = "sideNav" id = "sideNav">
                {localStorage.getItem("admin") == "true" ? Upload : null}
                <p onClick = {() => {redirectHandler(history , "/about")}}>ABOUT</p>
                <Collapsible trigger="CATEGORIES" className = "collapsible" onOpening = {() => {document.getElementById("sideNav").className = "sideNav collapse"}} onClose = {() => {document.getElementById("sideNav").className = "sideNav"}}>
                    {catList.map((cat, index) => <p key = {index}>{cat}</p>)}
                </Collapsible>
                <p onClick = {() => {redirectHandler(history ,"/contact")}}>CONTACT</p>
            </div>
        </div>

    <div className = "drawer">
        <button onClick={toggleDrawer(true)}>click</button>
        <SwipeableDrawer
                anchor="left"
                open={sidebar}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                          >
              <div className="swipeableIn">
                    <div className = "sideNav" id = "sideNav">
                        {localStorage.getItem("admin") == "true" ? Upload : null}
                        <p onClick = {() => {redirectHandler(history , "/about")}}>ABOUT</p>
                        <Collapsible trigger="CATEGORIES" className = "collapsible" onOpening = {() => {document.getElementById("sideNav").className = "sideNav collapse"}} onClose = {() => {document.getElementById("sideNav").className = "sideNav"}}>
                            {catList.map((cat, index) => <p key = {index}>{cat}</p>)}
                        </Collapsible>
                        <p onClick = {() => {redirectHandler(history ,"/contact")}}>CONTACT</p>
                    </div>
              </div>
        </SwipeableDrawer>
    </div>
    </div>;
}