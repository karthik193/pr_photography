import React , {useState  , useEffect, useContext} from "react" ; 
import {getFirestore} from 'firebase/firestore' ; 
import { doc, getDocs , collection , query , deleteDoc ,limit , startAfter , orderBy } from "firebase/firestore";
import Modal from 'react-modal' ; 
import './../style/imageGrid.css' ; 
import { getStorage , ref , deleteObject } from "@firebase/storage";
import { redirectHandler } from "../functions/helpers";
import { useHistory } from "react-router";
import { CategoryContext } from "../App";

export default React.memo(function ImageGrid(props) {
    props.setShowNav(true);
    const history   = useHistory(); 
    const windowSize  = window.screen.availWidth ; 
    const [images , setImages] = useState([]) ; 
    const [modalStatus , setModalStatus] = useState({
        modalOpen : false , 
        modalImage : ""
    }); 
    const [deleteModalStatus , setDeleteModalStatus] = useState({
        modalOpen : false , 
        imageUrl : "", 
        imageId : "", 
        deleteStart : false
    });
    const [shouldLoad , setShouldLoad]  = useState(0); 
    var lastVisibleDoc  = null ; 
    const db  = getFirestore() ; 
    const imageCollection  = collection(db  , "image_meta_data") ;
    var colno = 0 ;
    window.addEventListener("scroll" , async (event)=>{
        let documentHeight  = document.body.scrollHeight  ; 
        let currentScroll   = window.scrollY  + window.innerHeight  ; 
        let modifer = 50 ; 
        if(currentScroll + modifer  > documentHeight && lastVisibleDoc != null){
            //get 9 Images from firestore 
            const nextDocs  = query(
                                imageCollection , 
                                orderBy("date") , 
                                startAfter(lastVisibleDoc),
                                limit(9));
            const documentSnapshots  = await getDocs(nextDocs) ; 
            lastVisibleDoc  = documentSnapshots.docs[documentSnapshots.docs.length-1] ;
            
            var arr  = [[],[],[]] ; 
             

            
            documentSnapshots.forEach((doc)=>{
                if(doc.data().default == null){
                    arr[(colno)].push({
                        ...doc.data(),
                        id : doc.id  
                    }) ;
                    colno = (colno+1)%3 ;
                }
                  
            });

            
            setImages(prev =>{
                console.log([
                    [...prev[0] , ...arr[0]],
                    [...prev[1] , ...arr[1]],
                    [...prev[2] , ...arr[2]]
                ]); 
                return(
                    [
                        [...prev[0] , ...arr[0]],
                        [...prev[1] , ...arr[1]],
                        [...prev[2] , ...arr[2]]
                    ]
                )
            })

        }
    })

             

    const {category, setCategory} = useContext(CategoryContext);
    console.log("ImgGrid: "+category);

    //data retreving from firebase
    useEffect(() =>{
        async function getImages(){
            const first  = query(imageCollection  , orderBy("date") , limit(9) );
            const documentSnapshots  = await getDocs(first) ; 
            lastVisibleDoc  = documentSnapshots.docs[documentSnapshots.docs.length-1] ;

    
            const qs  = await getDocs(first) ;
            var arr  = [[],[],[]] ;
            console.log(qs , "qs" ) ; 
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
    }, [category]);

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
    const deleteModalHandler  = (open , imageUrl , imageId)=>{
        setDeleteModalStatus ((prev)=>{
            return(
                {
                    ...prev , 
                    "modalOpen": open , 
                    "imageUrl" : imageUrl,
                    "imageId" : imageId
                }
            );
        });
    }
    const deleteImageHandler  = async (imageId) =>{
        
        const db  = getFirestore() ; 
        const storage = getStorage(); 
        const ImageRef  = ref(storage , "images/" + imageId) ; 
        const compressedImageRef = ref(storage , "compressedImages/" + imageId) ; 

        setDeleteModalStatus(prev=>{
            return(
                {
                    ...prev, 
                    deleteStart : true,
                }
            )
        })
        await deleteDoc(doc(db , "image_meta_data"  , imageId)).then( async ()=>{
            
            await deleteObject(ImageRef).then(async ()=>{

                await deleteObject(compressedImageRef).then(()=>{
                    alert("Image Deleted");
                    history.go(0);
                    deleteModalHandler(false , "" , "" );
                }).catch(err => alert("Unable to Delete the Image"))
                
            }).catch(err=>{
                alert("error in deleting the Image")
                console.log("revert the Delete changes of the Doc into the Images_meta_data") ; 
            })
            
        }
            
        ).catch((err)=>alert("failed to delete the Image")); 
        setDeleteModalStatus(prev=>{
            return(
                {
                    ...prev, 
                    deleteStart : false,
                }
            )
        })

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
    const DeleteModalStyle = {
        content :{ 
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
            maxWidth :"350px" , 
            textAlign : "center"
            
        }, 
        overlay:{
            backgroundColor:"rgba(0 , 0 , 0 , 0.7)"
        }
    }
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
            <Modal
                style  = {DeleteModalStyle}
                isOpen  = {deleteModalStatus.modalOpen}
                contentLabel = "Delete Pop Up"
                closeTimeoutMS = {500}
                onRequestClose = {()=> deleteModalHandler(false , "")}
            >
                {deleteModalStatus.deleteStart?
                <div>Deleting Image...</div>
                :
                <div>
                    <h3>Do you really want to Delete the Image Below ?</h3>
                    <img 
                        className  = "deleteImage"
                        src  = {deleteModalStatus.imageUrl}
                    ></img>
                    <br/>
                    <div
                        style  = {
                            {
                                display : "inline-flex" , 
                                justifyContent : "space-between", 
                                width : "100%"
                            }
                        }
                    >
                        <button     
                            className  = "deleteModalBtn" 
                            onClick = {()=>deleteModalHandler(false , "")}
                        >NO</button>
                        <button 
                            className  = "deleteModalBtn" 
                            onClick = {()=>{ deleteImageHandler(deleteModalStatus.imageId) }}
                        >YES</button>
                    </div>
                </div>
                }
                
                
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
                                                src = {doc.compressedUrl} 
                                                alt  = {doc.alt}
                                                loading = "lazy"
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
                                                        onClick = {()=>{
                                                            deleteModalHandler(true , doc.url , doc.id); 
                                                        }}
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