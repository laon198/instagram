import React, {useState} from "react";
import "./SignupCard.scss";
import LogoImg2 from "../../assets/LogoImg2.png";
import {FacebookFilled} from "@ant-design/icons";
import { Button, Input} from "antd";
import AccountsCard from "./AccountsCard";

export default function SignupCard({onSignup}) {
    const [signupInfo, setSignupInfo] = useState({});

    const inputHandler = e => {
        const {value, name} = e.target;
        setSignupInfo(prevState => (
            {...prevState, [name]: value}
        ))

    };
    return (
        <AccountsCard
            style={{marginTop:"30px"}}
            header={
                <>
                    <img className="logo" src={LogoImg2} alt="logo"/>
                    <p className="desc">Sign up to see photos and videos from your friends. </p>
                    <Button type="primary" block className="btn">
                        <FacebookFilled style={{fontSize: "17px"}}/>
                        Log in with Facebook
                    </Button>
                    <div className="or">
                        <div className="beforeline"></div>
                        <div className="main">OR</div>
                        <div className="afterline"></div>
                    </div>
                </>
            }
            content={
                <>
                    <Input className="input" value={signupInfo.email} name="email" onChange={inputHandler} placeholder="Email"/>
                    <Input className="input" value={signupInfo.phoneNumber} name="phoneNumber" onChange={inputHandler}
                           placeholder="PhoneNumber"/>
                    <Input className="input" value={signupInfo.username} name="username" onChange={inputHandler}
                           placeholder="Username"/>
                    <Input.Password
                        value={signupInfo.password}
                        name="password" onChange={inputHandler} placeholder="Password" className="password"
                    />
                    <Button
                        type="primary" block
                        onClick={() => onSignup({signupInfo}, {setSignupInfo})}
                    >
                        Sign Up
                    </Button>
                    <p className="policy">
                        By signing up, you agree to our Terms , Data Policy and Cookies Policy .
                    </p>
                </>
            }
            footer={
                <>
                    <p>Have an account? Log in</p>
                </>
            }
        />
    );
}