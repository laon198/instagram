import React from "react";
import LoginCard from "../../components/accounts/LoginCard";
import "./Login.scss";
import {useHistory, useLocation} from "react-router-dom";
import Axios from "axios";
import {notification} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import { useAppContext, setToken } from "../../store";
import {axiosInstance} from "../../api";

export default function Login() {
    const history = useHistory();
	const {store, dispatch} = useAppContext();
	const location = useLocation();
	const {from : loginRedirectUrl} = location.state || {from:{pathname:"/"}};
	
    const onLogin = ({loginInfo}) => {
        axiosInstance({
            url : "/accounts/login/",
            data : loginInfo,
            method : "post",
        })
            .then(response => {
                console.log(response);
                const {data:{token, user : {username}}} = response;

				dispatch(setToken(token, username));

                notification.open({
                    message : "Login Success",
                    icon : <SmileOutlined style={{color : "#109ee9"}} />
                });
                history.push(loginRedirectUrl);
            }).catch(error => {
                console.error(error); //Fix Me : change error handle
        })
    };
    return (
        <div className="login">
            <LoginCard onLogin={onLogin}/>
        </div>
    );
}
