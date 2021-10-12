import React from "react";
import info from '../dataReference/info'; 

export default function Banner(){
	return <div className = "banner">
		<div className = "bannerIn">
			<h1>{info.admin.name}</h1> <br/>
	    	{/* <img align = "right" src = {process.env.PUBLIC_URL + "/Images/logo.png"}  alt  = "NO IMAGGE"  /> */}
	    </div>
	</div>
}