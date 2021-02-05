import React from "react";
import {Route} from "react-router-dom";
import "antd/dist/antd.css";
import Home from "./Home";
import About from "./About";
import AccountsRoutes from "./accounts/index";
import NewPost from "./instagram/NewPost";
import LoginRequiredRouter from "../utils/LoginRequiredRouter";
import DirectRoutes from "./direct/index";

export default function Root() {
    return (
        <>
            <LoginRequiredRouter exact path="/" Component={Home}/>
            <LoginRequiredRouter path="/direct" Component={DirectRoutes}/>
            <LoginRequiredRouter exact path="/about" Component={About}/>
            <LoginRequiredRouter exact path="/newpost" Component={NewPost}/>
            <Route path="/accounts" component={AccountsRoutes}/>
        </>
    );
}