import React from "react";
import '../style/contact.css';
import info from '../dataReference/info'  ; 
import { Button } from "@material-ui/core";
export default function Contact(props) {
    props.setShowNav(true);
    const todaysDate  = new Date() ; 
    return (
        <div className  = "contact" >
            <h3>CONTACT</h3>
            <div  className  = "contactBox" >
                <table >
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{info.admin.name}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>{todaysDate.getFullYear() - info.admin.age}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{info.admin.address}</td>
                        </tr>
                        <tr>
                            <td>Contact</td>
                            <td>
                                <div className  = "reachOutBox" >
                                    <button className  = "whatsAppBtn" 
                                        onClick = {()=>{
                                            navigator.clipboard.writeText(info.admin.contact.whatsApp) ; 
                                            alert("Copied whatsApp number to Clipboard");
                                        }}
                                    ><i class="fab fa-whatsapp"></i></button>
                                    <button className  = "instaBtn"
                                        onClick = {()=>{
                                            window.open(info.admin.contact.instagram, '_blank').focus();
                                        }}     
                                    >
                                        
                                        <i class="fab fa-instagram"></i>
                                      
                                        
                                    </button>
                                    <button className  = "facebookBtn"     
                                        onClick = {()=>{
                                            window.open(info.admin.contact.facebook, '_blank').focus();
                                        }}
                                    >
                                        <div className = "whiteBg" >
                                            <p></p>
                                        </div>
                                        <i class="fab fa-facebook"
                                        ></i>
                                      
                                        
                                    </button>
                                    <button className  = "phoneBtn" 
                                        onClick = {()=>{
                                            navigator.clipboard.writeText(info.admin.contact.mobile) ; 
                                            alert("Copied contact number to Clipboard");
                                        }}
                                    ><i class="fas fa-phone"></i></button>
                                </div>
                            
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}