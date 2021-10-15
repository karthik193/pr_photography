import { getAuth } from "@firebase/auth";
import React from "react" ; 
import { useHistory } from "react-router";
import { redirectHandler } from "../../functions/helpers";
export default function UploadImage(){
    const auth  = getAuth() ; 
    const history = useHistory() ; 
    return(
        <div>
           
        <p
            onClick = {
                ()=>{
                    localStorage.clear();
                    auth.signOut() ; 
                    redirectHandler(history  , "/adminLogin");
                    
                }
            }
        >LOG OUT</p>
        </div>
    )
}