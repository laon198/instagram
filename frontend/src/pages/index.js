import React from "react";
import AppLayout from "../components/AppLayout";
import {Route} from "react-router-dom";
import "antd/dist/antd.css";
import Home from "./Home";
import About from "./About";
import AccountsRoutes from "./accounts/index";
import LoginRequiredRouter from "../utils/LoginRequiredRouter";

export default function Root() {
    return (
        <>
            <LoginRequiredRouter exact path="/" Component={Home}/>
            <LoginRequiredRouter exact path="/about" Component={About}/>
            <Route path="/accounts" component={AccountsRoutes}/>
        </>
    );
}