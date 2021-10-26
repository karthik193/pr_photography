import {getStorage, ref, uploadBytes ,  getDownloadURL} from "firebase/storage";
import { getFirestore, doc, setDoc, updateDoc  } from "firebase/firestore";
import Compressor from 'compressorjs';


export default function uplaodFile(file, altText, category, setUploading) {
	const storage = getStorage();
	const db = getFirestore();
	const timestamp = Date.now();


	const imageRef = ref(storage, 'images/'+timestamp);
	setUploading(true);
	
	// Uploading original
	uploadBytes(imageRef, file).then((snapshot) => {

		getDownloadURL(imageRef).then(async (url)=>{
			try {
					await setDoc(doc(db, "image_meta_data", `${timestamp}`), {
						alt_text: altText,
						category: category,
						date: new Date().toLocaleDateString(),
						filename: timestamp, 
						url : url
					});
					
					console.log("Document written with ID: ", timestamp);
	
				} 
				catch (e) {
					console.error("Error adding document: ", e);
				}
				
				console.log('Uploaded a blob or file!');


		}).catch( (err)=>{
			alert("fail to dowload URL");
		})
		

		
	});


	new Compressor(file, {
		quality: 0.01, 
		success: (compressedResult) => {
		  // compressedResult has the compressed file.
		  // Use the compressed file to upload the images to your server.        
		  const copmpressedImageRef = ref(storage, 'compressedImages/'+timestamp);
			
			// Uploading compressed
			uploadBytes(copmpressedImageRef, compressedResult).then((snapshot) => {

				getDownloadURL(copmpressedImageRef).then(async (compressedUrl)=>{
					try {
						await updateDoc(doc(db, "image_meta_data", `${timestamp}`), {
							compressedUrl: compressedUrl
						});
			
					console.log("Updated compressedUrl for ID: ", timestamp);
			
					} 
					catch (e) {
						console.error("Error updating compressedUrl: ", e);
					}
					setUploading(false);
					console.log('Uploaded a blob or file!');
					alert("Uploaded"); 
					window.location.reload();


				}).catch( (err)=>{
					alert("fail to dowload URL");
				})
				

				
			});
		},
	});
	

}

