import React from "react";
import LoginCard from "../../components/accounts/LoginCard";
import "./Login.scss";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {notification} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import useLocalStorage from "../../utils/useLocalStorage";

export default function Login() {
    const history = useHistory();
    const APIUrl = "http://localhost:8000/accounts/login/";
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken");

    const onLogin = ({loginInfo, setLoginInfo}) => {
        const data = loginInfo;
        Axios.post(APIUrl, data)
            .then(response => {
                const {data:{token}} = response;

                setJwtToken(token);

                setLoginInfo({});
                notification.open({
                    message : "Login Success",
                    icon : <SmileOutlined style={{color : "#109ee9"}} />
                });
                history.push("/"); //Fix Me : change history url
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
