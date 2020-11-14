import React from "react";
import LoginCard from "../../components/accounts/LoginCard";
import "./Login.scss";
import {useHistory, useLocation} from "react-router-dom";
import Axios from "axios";
import {notification} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import { useAppContext, setToken } from "../../store";

export default function Login() {
    const history = useHistory();
    const APIUrl = "https://instagram-kqoai.run.goorm.io/accounts/login/"; //FIXME : url changed
	const {store, dispatch} = useAppContext();
	const location = useLocation();
	const {from : loginRedirectUrl} = location.state || {from:{pathname:"/"}};
	
    const onLogin = ({loginInfo, setLoginInfo}) => {
        const data = loginInfo;
        Axios.post(APIUrl, data)
            .then(response => {
                const {data:{token}} = response;

				dispatch(setToken(token));

                setLoginInfo({});
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
