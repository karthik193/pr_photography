import {getStorage, ref, uploadBytes ,  getDownloadURL} from "firebase/storage";
import { getFirestore, doc, setDoc  } from "firebase/firestore";
import { useHistory } from "react-router";
 

export default function uplaodFile(file, altText, category, setUploading) {
	const storage = getStorage();
	const db = getFirestore();
	const timestamp = Date.now();
	const imageRef = ref(storage, 'images/'+timestamp);

	setUploading(true);
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
				setUploading(false);
				console.log('Uploaded a blob or file!');
				alert("Uploaded"); 
				window.location.reload();


		}).catch( (err)=>{
			alert("fail to dowload URL");
		})
		

		
	});

}

