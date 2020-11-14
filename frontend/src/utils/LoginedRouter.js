import React from "react";
import { useAppContext } from "../store";
import { Route, Redirect } from "react-router-dom";
import Login from "../pages/accounts/Login";

export default function LoginedRouter({Component, ...kwargs}){
	const { store : { isAuthenticated } } = useAppContext();
	return(
		<Route {...kwargs} render={props => {
				if (isAuthenticated){
					return <Redirect  to="/" />
				} else{
					return <Component {...props} />
				}
			}}
		/>
	);
}