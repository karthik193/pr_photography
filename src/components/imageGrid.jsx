import React , {useState  , useEffect} from "react" ; 
import {getFirestore} from 'firebase/firestore' ; 
import { doc, getDocs , collection , query } from "firebase/firestore";

import './../style/imageGrid.css' ; 

export default function ImageGrid(props) {
    props.setShowNav(true);

    const [images , setImages] = useState([]) ; 
    const [iconDisplay , setIconDisplay] = useState(false); 

//data retreving from firebase
    useEffect(async () =>{
        const db = getFirestore();
        const q = query(collection(db , "image_meta_data")) ; 

        const qs  = await getDocs(q) ; 
        var arr  = [] ; 
        qs.forEach((doc)=>{
            arr.push(doc.data()) ; 
        })

        setImages(arr) ; 
    });

    const mouseOverHandler  = ()=>{
        setIconDisplay(!iconDisplay) ; 
    }
    return (
        <div  className  = "row" align = "center">
            <div className = "col">
                
                {images.map((doc)=>{
                    return(
                        <div className = "imageBox">
                            <img  
                                className  = "gridImage" 
                                src = {doc.url} 
                                alt  = {doc.alt}
                                onMouseEnter = {mouseOverHandler}
                                onMouseLeave = {mouseOverHandler}
                            ></img>
                            <p className = {"centered " + (iconDisplay?"display":"noDisplay") } >
                                <i className  = "fas fa-expand" style={{fontSize : "40px"}}></i>
                            </p>
                        </div>
                        
                        
                    )
                    
                })}
            </div>
            <div className = "col">
                
            </div>
            <div className = "col">
                
            </div>
        </div>
    );
}