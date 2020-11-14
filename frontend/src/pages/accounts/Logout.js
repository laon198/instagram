import React from "react";
import { useAppContext, deleteToken } from "../../store";
import { Redirect } from "react-router-dom";

export default function Logout(){
	const {store, dispatch} = useAppContext();
	dispatch(deleteToken())
	
	return(
		<Redirect to="/accounts/login" />
	);
}