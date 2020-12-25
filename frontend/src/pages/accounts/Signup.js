import React, {useState} from "react";
import "./Signup.scss";
import SignupCard from "../../components/accounts/SignupCard";
import Axios from "axios";
import {notification} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import {useHistory} from "react-router-dom";

export default function Signup() {
    const history = useHistory();
    const APIUrl = "http://192.168.0.8:8080/accounts/signup/";

    const onSignup = ({signupInfo}, {setSignupInfo}) => {
        const {email, phoneNumber: phone_number, username, password} = signupInfo;
        const data = {email, phone_number, username, password}; //FIX ME
        const response = Axios.post(APIUrl, data) //FIXME API URL Change
            .then(response => {
                setSignupInfo({});
                notification.open({
                    message : "회원가입 성공",
                    description : "로그인 페이지로 이동합니다.",
                    icon : <SmileOutlined style={{color : "#109ee9"}} />
                });
                history.push("/accounts/login");
            })
            .catch(error => {
                console.error(error);
            })
    };

    return (
        <div className="signup">
            <SignupCard onSignup={onSignup}/>
        </div>
    );
}
