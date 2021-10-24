import React , {useState  , useEffect} from "react" ; 
import {getFirestore} from 'firebase/firestore' ; 
import { doc, getDocs , collection , query } from "firebase/firestore";
import Modal from 'react-modal' ; 
import './../style/imageGrid.css' ; 

export default React.memo(function ImageGrid(props) {
    props.setShowNav(true);
    const windowSize  = window.screen.availWidth ; 
    const [images , setImages] = useState([]) ; 
    const [modalStatus , setModalStatus] = useState({
        modalOpen : false , 
        modalImage : ""
    }); 
//data retreving from firebase
    useEffect(() =>{
        async function getImages(){
            const db = getFirestore();
            const q = query(collection(db , "image_meta_data")) ; 
    
            const qs  = await getDocs(q) ; 
            var arr  = [[],[],[]] ; 
            var colno = 0 ; 
            qs.forEach((doc)=>{
                if(doc.data().default == null){
                    arr[(colno)].push({
                        ...doc.data(),
                        id : doc.id  
                    }) ;
                    colno = (colno+1)%3 ;
                }
                  
            });
            arr.forEach((a)=> a.reverse())
            setImages(arr) ; 
        }
        getImages(); 
    }, []);

    const mouseOverHandler  = (expandIconId)=>{
         const expandIconElement  = document.getElementById(expandIconId) ; 
         if(expandIconElement.classList.contains("display")){
             expandIconElement.classList.remove("display") ; 
             expandIconElement.classList.add("noDisplay") ; 
         } else {
             expandIconElement.classList.remove("noDisplay") ; 
             expandIconElement.classList.add("display") ; 
         }
         
    }
    const imageModalHandler  = (imageurl)=>{

        setModalStatus((prev)=>{
            return(
                {
                    ...prev, 
                    "modalOpen" : !modalStatus.modalOpen,
                    "modalImage" : imageurl 
                }
            )
        }); 
    }
    const ModalStyle  = {
        content:{
            backgroundColor: "rgba(0 , 0 , 0 , 0.8)", 
            height :  "80%", 
            padding : "2em", 
            outline :"none", 
            border : "none", 
            boxShadow : "0em 0em 1em 10em rgba(0 , 0 , 0 , 0.8)" , 
            postion : "relative"
            
        },
        overlay :{
            backgroundColor:"rgba(0 , 0 , 0 , 0.7)"
        }
    };
    return (
        <div  className  = "row" align = "center">
            <Modal  
                style = {ModalStyle}
                isOpen = {modalStatus.modalOpen}
                contentLabel  = "Image Opener"
                closeTimeoutMS = {500}
                onRequestClose = {()=>imageModalHandler("")}
            >

                <img className  = "modalImage" src = {modalStatus.modalImage}></img>
                <button className = "modalCloseButton" onClick ={()=>{
                    imageModalHandler("")
                }}>
                    <i className =  "fas fa-close" ></i>
                </button>
            </Modal>
                {
                    images.map((colImages , colIndex) =>{
                        return(
                            <div className = "col" key = {colIndex}>
                                {colImages.map((doc  , index)=>{

                                    
                                    return(
                                        <div 
                                            className = "imageBox"
                                            onMouseEnter = {()=>{mouseOverHandler(doc.id);}}
                                            onMouseLeave = {()=>{mouseOverHandler(doc.id);}}
                                            onClick ={()=>{
                                                
                                                if(window.screen.availWidth < 992)
                                                imageModalHandler(doc.url )
                                            }}
                                        >
                                            <img  
                                                className  = "gridImage" 
                                                key = {index}
                                                src = {doc.url} 
                                                alt  = {doc.alt}
                                            ></img>
                                            <div
                                                id  = {doc.id}
                                                className = "centered  noDisplay"
                                                style ={
                                                    {
                                                        display :"inline-flex" ,
                                                        justifyContent:"space-around", 
                                                        width : "80%", 
                                                        
                                                    }
                                                }
                                            >
                                                <div 
                                                    
                                                    style = {
                                                        {
                                                            padding : "0em"
                                                        }
                                                    }
                                                    onClick ={()=>imageModalHandler(doc.url )}
                                                    
                                                >
                                                    <i className  = "fas fa-expand expandIcon"  
                                                    
                                                    ></i>
                                                </div>
                                                {
                                                    localStorage.getItem("admin") == "true" && windowSize >= 992?
                                                    <button
                                                        className = "gridDeleteBtn"
                                                    >
                                                        DELETE
                                                    </button>
                                                    :null
                                                }
                                                
                                            </div>
                                            
                                        </div>
                                        
                                        
                                    )
                                    
                                })}
                            </div>
                        )
                    })
                }
                
        </div>
    );
})