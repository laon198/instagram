import React, {useState} from "react";
import "./SignupCard.scss";
import LogoImg2 from "../../assets/LogoImg2.png";
import {FacebookFilled} from "@ant-design/icons";
import { Button, Input} from "antd";

export default function SignupCard({onSignup}) {
    const [signupInfo, setSignupInfo] = useState({});

    const inputHandler = e => {
        const {value, name} = e.target;
        setSignupInfo(prevState => (
            {...prevState, [name]: value}
        ))

    };
    return (
        <>
            <div className="signup-card">
                <div className="header">
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
                </div>
                <div className="content">
                        <Input value={signupInfo.email} name="email" onChange={inputHandler} placeholder="Email"/>
                        <Input value={signupInfo.phoneNumber} name="phoneNumber" onChange={inputHandler}
                               placeholder="PhoneNumber"/>
                        <Input value={signupInfo.username} name="username" onChange={inputHandler}
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
                    <p>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
                </div>
            </div>
            <div className="footer">
                <p>Have an account? Log in</p>
            </div>
        </>
    );
}