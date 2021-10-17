import { getAuth } from "@firebase/auth";
import React, {useState} from "react" ; 
import { useHistory } from "react-router";
import { redirectHandler } from "../../functions/helpers";
import uploadFile from "../../functions/firebaseStorage";
import '../../style/upload.css';


export default function UploadImage(props){
    props.setShowNav(true);
    const auth  = getAuth() ; 
    const history = useHistory() ; 
    const [uploading, setUploading] = useState(false);

    const uploadHandler = () => {
        if(document.getElementById("category").value == null || document.getElementById("category").value == "" || document.getElementById("alt-text").value == null || document.getElementById("alt-text").value == "") {
            alert("Fill all the fields!");
            return;
        }
        if(document.getElementById("fileUpload").value == ""){
            alert("Upload image!")
            return;
        }

        const altText = document.getElementById("alt-text").value;
        const category = document.getElementById("category").value;
        uploadFile(document.getElementById("fileUpload").files[0], altText, category, setUploading)

    }



    return(

        <div className="uploadBox">
        <p style = {{cursor: "pointer", marginLeft: "75%", marginTop: "-32%", position: "fixed"}}
            onClick = {
                ()=>{
                    localStorage.clear();
                    auth.signOut() ; 
                    redirectHandler(history  , "/adminLogin");
                }
            }
        ><i class="fa fa-power-off" style={{fontSize: "32px", color: "whitesmoke"}}></i></p>

        <input type="file" className="fileUpload" id = "fileUpload" accept = "image/*" name="filename" onChange = {(e) => {e.target.value != "" && e.target.files[0].type.split("/")[0] === "image" ? console.log("Valid") : e.target.value = "";}}/>
        <br /><br />

        <label className="label">Alt Text*</label><br />
        <input type="text" className="input" name = "alt-text" id = "alt-text"/><br />

        <br /><br />
        <label className="label">Category*</label><br />
        <select className="input" name = "category" id = "category" required>
            <option>Fashion</option>
            <option>Wildlife</option>
            <option>Nature</option>
            <option>Category1</option>
            <option>Category2</option>
        </select>

        <br /> <br />
        <button className="uploadButton" name="upload" onClick = {uploadHandler} disabled = {uploading}>{uploading?"Uploading...":"Upload"}</button>

        </div> 
    )
}