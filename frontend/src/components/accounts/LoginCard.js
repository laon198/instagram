import React from "react";
import AccountsCard from "./AccountsCard";
import LogoImg2 from "../../assets/LogoImg2.png";
import {Button, Input } from "antd";
import {FacebookFilled} from "@ant-design/icons";
import "./LoginCard.scss";

export default function LoginCard(){
    return(
        <AccountsCard
            style={{marginTop:"20px"}}
            header={
                <>
                    <img className="logo" src={LogoImg2} alt="logo" />
                </>
            }
            content={
                <>
                    <Input className="input" placeholder="Username" />
                    <Input.Password  className="password" placeholder="Password" />
                    <Button className="btn" type="primary" block >Log In</Button>
                    <div className="or">
                        <div className="beforeline"></div>
                        <div className="main">OR</div>
                        <div className="afterline"></div>
                    </div>
                    <div className="facebook-login">
                        <FacebookFilled
                            style={{fontSize:"18px", color:"#385185"}}/>
                        <div className="facebook-desc"> Log in with Facebook </div>
                    </div>
                    <p className="forgot-pwd">Forgot password?</p>
                </>
            }
            footer={
                <p>Don't have an account? Sign up</p>
            }
        />
    );
}