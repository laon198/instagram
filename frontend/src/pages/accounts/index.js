import React from "react";
import { Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import AccountsLayout from "../../components/accounts/AccountsLayout";
import LoginedRouter from "../../utils/LoginedRouter";

export default function Routes({match}){
    return(
        <AccountsLayout>
            <LoginedRouter exact path={`${match.url}/signup`} Component={Signup}/>
            <LoginedRouter exact path={`${match.url}/login`} Component={Login}/>
        </AccountsLayout>
    );
}
