import React from "react";
import {Switch} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import AccountsLayout from "../../components/accounts/AccountsLayout";
import LoginedRouter from "../../utils/LoginedRouter";
import LoginRequiredRouter from "../../utils/LoginRequiredRouter";
import ProfileEdit from "./ProfileEdit";

export default function Routes({match}){
    return(
        <AccountsLayout>
            <LoginedRouter exact path={`${match.url}/signup`} Component={Signup}/>
            <LoginedRouter exact path={`${match.url}/login`} Component={Login}/>
			<LoginRequiredRouter exact path={`${match.url}/logout`} Component={Logout}/>
			<Switch>
                <LoginRequiredRouter exact path={`${match.url}/profile/:username/edit`} Component={ProfileEdit}/>
                <LoginRequiredRouter exact path={`${match.url}/profile/:username`} Component={Profile}/>
            </Switch>
        </AccountsLayout>
    );
}
