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
                            <td>Contact</td>
                            <td>
                               
                                <div className  = "reachOutBox" >
                                    
                                    <button className  = "whatsAppBtn" 
                                        onClick = {()=>{

                                            let website_name  = "*[" + info.admin.site + "]*" ; 
                                            window.open(`https://wa.me/${info.admin.contact.whatsApp}?text=${website_name}%20hello%20${info.admin.name}`, '_blank');
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
                                        <i class="fab fa-facebook"
                                        ></i>
                                
                                    
                                    </button>
                                    <button className  = "phoneBtn" 
                                            onClick = {()=>{

                                                window.open("tel:" + info.admin.contact.mobile) 
                                                
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
