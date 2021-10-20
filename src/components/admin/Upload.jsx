import { getAuth } from "@firebase/auth";
import React, {useState, useEffect} from "react" ; 
import { Redirect, useHistory } from "react-router";
import { redirectHandler } from "../../functions/helpers";
import uploadFile from "../../functions/firebaseStorage";
import '../../style/upload.css';
import {getFirestore, doc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore' ; 
import Modal from 'react-modal';


Modal.setAppElement('#root');


export default function UploadImage(props){
    props.setShowNav(true);
    const auth  = getAuth() ; 
    const history = useHistory() ; 
    const [uploading, setUploading] = useState(false);
    const [catList, setCatList] = useState([]);
    const [catListFlag, setCatListFlag] = useState(false);
    const [modal, setModal] = useState(false);


    const db = getFirestore();
    const docRef = doc(db, "meta-info", "categories");
    useEffect(async ()=>{
        console.log("test2");
        const docSnap = await getDoc(docRef);
        setCatListFlag(true);
        setCatList(docSnap.data().categoryList);
    }, [catListFlag]);

    if(localStorage.getItem("admin") != "true"){
        return(
            <Redirect to = "/adminLogin"></Redirect>
        );
    }
    


    const uploadHandler = () => {
        if(document.getElementById("category").value == null || document.getElementById("category").value == "" || document.getElementById("category").value == "Select" || document.getElementById("alt-text").value == null || document.getElementById("alt-text").value == "") {
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


    const previewImageHandler = (event) =>{
        if(event.target.value != "" ){
            const ImageFile = event.target.files[0] ; 
            if(ImageFile.type.split("/")[0] === "image"){
                console.log("Valid Image") ; 
                const reader  = new FileReader() ; 
                reader.addEventListener("load" , function(){
                    var preImageElement  = document.getElementById("previewImage") ; 
                    preImageElement.setAttribute("src" , this.result) ; 

                }) ; 
                reader.readAsDataURL(ImageFile) ; 
            }else alert("Invalid Image File"); 
        }
    }

    const handleNewCat = (e) => {
        if(e.target.value === "+ New"){
            toggleModal();
            e.target.value = "Select";
        }

    }


    const toggleModal = () => {
        setModal(!modal);
    }


    const addCatAndClose = async () => {
        if(document.getElementById("newCatInput").value == null || document.getElementById("newCatInput").value == "")
            return;
        await updateDoc(docRef, {
          categoryList: arrayUnion(document.getElementById("newCatInput").value)
        })        
        alert("Added new cat");
        toggleModal();
    }

    


    return(

        <div className="uploadBox">
        <p style = {{cursor: "pointer", marginLeft: "75%", top: "0", marginTop: "20px", position: "fixed"}}
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
        <img
            id  = "previewImage"  
            style = {{ 
                width :"30%", 
                height: "auto"
            }}
        ></img>
        <br /><br />
        <button className= "uploadButton" 
                style  = {{ borderRadius :".1em" , textAlign:"center" , fontSize :"1em"}} 
                onClick = {()=>{
                    document.getElementById("fileUpload").click() ; 
                }}
        >Select Image</button>
        <input type="file" 
                className="fileUpload" 
                id = "fileUpload" 
                accept = "image/*" 
                name="filename" 
                onChange = {previewImageHandler}
                style = {{ display:"none"}}
        />
        <br /><br />

        <label className="label">Alt Text*</label><br />
        <input type="text" className="input" name = "alt-text" id = "alt-text"/><br />

        <br /><br />
        <label className="label">Category*</label><br />
        <select className="input selectBox" name = "category" id = "category" onClick={handleNewCat} required>
            <option>Select</option>
            {catList.map((cat) => <option>{cat}</option>)}
            <option>+ New</option>
        </select>

        <br /> <br />
        <button className="uploadButton" name="upload" onClick = {uploadHandler} disabled = {uploading}>{uploading?"Uploading...":"Upload"}</button>


        <Modal
            isOpen={modal}
            onRequestClose={toggleModal}
            contentLabel="New Category Modal"
            closeTimeoutMS = {500}
            style = {{
                content: {
                    top: "50%",
                    left: "50%",
                    bottom: "auto",
                    right: "auto",
                    background: "#252525",
                    letterSpacing: "2px",
                    transform: 'translate(-50%, -50%)',
                    border : "none" , 
                    transition : "1s ease",
                    minWidth : "250px", 
                    maxWidth :"350px"
                },
                overlay:{
                    backgroundColor:"rgba(0,0,0,0.9)"
                }
            }}
        >
            <label>Add Category</label><br /><br />
            <input type="text" className="input" style={{width:"95%"}} id = "newCatInput"></input><br /><br />
            <button align = "right" className = "uploadButton" onClick={toggleModal} style = {{float: "left"}}>Cancel</button>
            <button align = "right" className = "uploadButton" onClick={addCatAndClose} style = {{float: "right"}}>Add</button>
        </Modal>
        </div> 
    )
}