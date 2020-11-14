import React from "react";
import { useAppContext } from "../store";
import { Route, Redirect } from "react-router-dom";
import Login from "../pages/accounts/Login";

export default function LoginRequiredRouter({Component, ...kwargs}){
	const { store : { isAuthenticated } } = useAppContext();
	return(
		<Route {...kwargs} render={props => {
				if (isAuthenticated){
					return <Component {...props} />
				} else{
					return <Redirect 
						to={{
							pathname : "accounts/login",
							state : {from:props.location}
						}}
					/>
				}
			}}
		/>
	);
}