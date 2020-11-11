import React from "react";
import AppLayout from "../components/AppLayout";
import {Route} from "react-router-dom";
import "antd/dist/antd.css";
import Home from "./Home";
import AccountsRoutes from "./accounts/index";

export default function Root() {
    return (
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/accounts" component={AccountsRoutes}/>
        </div>
    );
}