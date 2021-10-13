import React, { useEffect } from "react" ; 
import {getAuth , signInWithEmailAndPassword , onAuthStateChanged } from 'firebase/auth' ; 
import firebaseApp from '../../database/firebaseApp'; 
import '../../style/Login.css' ; 
import { useHistory} from "react-router";
export default function Login(){

    const history = useHistory() ; 
    const auth = getAuth();
    const verifyAdmin = (email , password)=>{

        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Signed in as admin")
            history.push('/') ; 
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Wrong Username or Password") ; 
        });   
    }
    const handleSubmit  = (event)=>{
        event.preventDefault() ; 
        const email  = event.target.email.value; 
        const password = event.target.password.value ; 
        const vertificationStatus  = verifyAdmin(email , password) 

    } ; 


    onAuthStateChanged(auth , (user)=>{
        if(user){
            history.push("/") ; 
        }
    })
    return(
           
        <div align = "center">
            <div>
                <form  onSubmit  = {handleSubmit}>
                    <table>
                        <tr>
                            <td>Email</td>
                            <td><input  className  = "LoginInputField" name  = "email" /></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input className  = "LoginInputField" type  = "password" name  = "password" /></td>
                        </tr>
                    </table>                     
                    <button type  = "submit"  className  = "LoginButton" >Log in</button>
                </form>
            </div>
        </div>
    )
}