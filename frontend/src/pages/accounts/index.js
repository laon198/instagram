import React from "react";
import { Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";
import AccountsLayout from "../../components/accounts/AccountsLayout";
import LoginedRouter from "../../utils/LoginedRouter";
import LoginRequiredRouter from "../../utils/LoginRequiredRouter";

export default function Routes({match}){
    return(
        <AccountsLayout>
            <LoginedRouter exact path={`${match.url}/signup`} Component={Signup}/>
            <LoginedRouter exact path={`${match.url}/login`} Component={Login}/>
			<LoginRequiredRouter exact path={`${match.url}/logout`} Component={Logout}/>
        </AccountsLayout>
    );
}
