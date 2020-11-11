import React from "react";
import { Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import AccountsLayout from "../../components/accounts/AccountsLayout";

export default function Routes({match}){
    return(
        <AccountsLayout>
            <Route exact path={`${match.url}/signup`} component={Signup}/>
            <Route exact path={`${match.url}/login`} component={Login}/>
        </AccountsLayout>
    );
}
