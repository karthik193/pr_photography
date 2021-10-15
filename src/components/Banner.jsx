import React from "react";
import info from '../dataReference/info'; 

export default function Banner(){
	return <div className = "banner">
		<div className = "bannerIn">
			<p>{info.admin.name}</p> <br/>
	    </div>
	</div>
}