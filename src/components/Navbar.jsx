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
    const [catList, setCatList] = useState([]);
    const Upload  = <p onClick = {() => {redirectHandler(history , "/upload")}}>UPLOAD</p> ; 
    const [sidebar, setSidebar] = useState(false);
    const auth  = getAuth() ; 
    //var catList = [];


    
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
        console.log("test1")
        setCatListFlag(true);
        setCatList(docSnap.data().categoryList);
    }, [catListFlag]);

    return  <div>
        <img className="logoImg" align = "left" src = {process.env.PUBLIC_URL + "/Images/logo.png"}  onClick = {() => {redirectHandler(history , "/")}}alt  = "Logo"  />
            

        <p style = {{cursor: "pointer", right: "5%", top: "0", marginTop: "20px", position: "fixed"}}
            onClick = {
                ()=>{
                    localStorage.clear();
                    auth.signOut() ; 
                    setTimeout(() => {
                        redirectHandler(history  , "/adminLogin");
                    }, 200);
                }
            }
        ><i class="fa fa-power-off" style={{fontSize: "32px", color: "whitesmoke"}}></i></p>
        <div className="navbar">
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
        <p onClick={toggleDrawer(true)} style = {{position: "fixed"}}><i className='fas fa-chevron-circle-right' style={{fontSize:"48px", marginLeft: "-10px"}}></i></p>
        <SwipeableDrawer
                anchor="left"
                open={sidebar}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth = {200}
                          >
              <div className="swipeableIn">
                    <div className = "sideNav" id = "sideNav">
                        <img className="logoImg2" align = "left" src = {process.env.PUBLIC_URL + "/Images/logo.png"}  onClick = {() => {redirectHandler(history , "/")}} alt  = "Logo"  />
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