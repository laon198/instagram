import React, {useState} from "react";
import {axiosInstance} from "../../api";
import {useAppContext} from "../../store";
import {useLocation, useHistory} from "react-router-dom";

export default function DeletePost({action=false, postId, setters, refetch}){
	const {setDeleter, setVisible} = setters;
	const {from : redirectURL} = useLocation() || {from : {pathname:"/"}};
	const { store : {jwtToken}} = useAppContext();
	const history = useHistory();
	
	if (action === true){
		const headers = {Authorization : `JWT ${jwtToken}`};
		
		axiosInstance({
			url : `api/post/${postId}`,
			method : "delete",
			headers
		}).then(response=>{
			action=false; setDeleter(false);
			setVisible(false); 
			refetch();
		}).catch(error=>{
			console.error(error);
		 })
	}
	
	return(
		<>
			삭제
		</>
	);
}