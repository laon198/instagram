import React from "react";
import { useAppContext, deleteToken } from "../../store";
import { Redirect } from "react-router-dom";
import {axiosInstance} from "../../api";

const {Kakao} = window;

export default function Logout(){
	const {store : {jwtToken}, dispatch} = useAppContext();
	const headers = { Authorization : `JWT ${jwtToken}`}

	if (!Kakao.Auth.getAccessToken()) {
		console.log(Kakao.Auth.getAccessToken());
		axiosInstance({
			url: "/accounts/logout/",
			method: "POST",
			headers
		})
			.then(response => {
				console.log(response);
				dispatch(deleteToken());
			})
			.catch(error => console.error(error))
	} else{
		Kakao.Auth.logout(function() {
			console.log(Kakao.Auth.getAccessToken());
			axiosInstance({
				url : "/accounts/logout/",
				method : "POST",
				headers
			})
				.then(response => {
					console.log(response);
					dispatch(deleteToken());
				})
				.catch(error => console.error(error))
		});
	}

	return(
		<Redirect to="/accounts/login" />
	);
}