import { getAuth } from "@firebase/auth";
import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";
import { redirectHandler } from "../functions/helpers";
import "../style/navbar.css";
import Collapsible from 'react-collapsible';
import {getFirestore,doc, getDoc} from 'firebase/firestore' ; 


export default function Navbar(props){
    const history = useHistory(); 
    const path = useState("");
    const [catList, setCatList] = useState([]);
    const Upload  = <p onClick = {() => {redirectHandler(history , "/upload")}}>UPLOAD</p> ; 


    useEffect(async ()=>{
        const db = getFirestore();
        const docRef = doc(db, "meta-info", "categories");
        const docSnap = await getDoc(docRef);
        setCatList(docSnap.data().categoryList);
    });

    return  <div><img className="logoImg" align = "left" src = {process.env.PUBLIC_URL + "/Images/logo.png"}  onClick = {() => {redirectHandler(history , "/")}}alt  = "Logo"  />
    <div className = "sideNav" id = "sideNav">
        {localStorage.getItem("admin") == "true" ? Upload : null}
        <p onClick = {() => {redirectHandler(history , "/about")}}>ABOUT</p>
        <Collapsible trigger="CATEGORIES" className = "collapsible" onOpening = {() => {document.getElementById("sideNav").className = "sideNav collapse"}} onClose = {() => {document.getElementById("sideNav").className = "sideNav"}}>
            {catList.map((cat, index) => <p key = {index}>{cat}</p>)}
        </Collapsible>
        <p onClick = {() => {redirectHandler(history ,"/contact")}}>CONTACT</p>
    </div></div>;
}