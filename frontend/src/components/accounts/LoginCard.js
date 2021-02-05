import React, {useState} from "react";
import AccountsCard from "./AccountsCard";
import LogoImg2 from "../../assets/LogoImg2.png";
import kakao_login from "../../assets/kakao_login.png";
import {Button, Input, notification} from "antd";
import {FacebookFilled, SmileOutlined} from "@ant-design/icons";
import styles from "./LoginCard.module.scss";
import {Link, useHistory, useLocation} from "react-router-dom";
import Axios from "axios";
import {setToken, useAppContext} from "../../store";
import {axiosInstance} from "../../api";

const {Kakao} = window;

export default function LoginCard({onLogin}) {
    const [loginInfo, setLoginInfo] = useState({});
    const {store, dispatch} = useAppContext();
    const history = useHistory();

    const inputHandler = e => {
        const { name, value } = e.target;
        setLoginInfo(prevState => (
            {...prevState, [name]:value}
        ))
    };

    const handleSubmit = e => {
        e.preventDefault();
        onLogin({loginInfo});
    };

    const handleKakaoLogin = () => {
        Kakao.Auth.login({
            success : function(authObj){
                const { access_token } =authObj;
                const data = {
                    access_token : access_token
                }
                //FIXME : please change request url
                axiosInstance.post("/accounts/login/kakao/", data)
                    .then(response => {
                        const {data : {jwtToken, username}} = response;
                        console.log(response);
                        dispatch(setToken(jwtToken, username));

                        notification.open({
                            message : "Login Success",
                            icon : <SmileOutlined style={{color : "#109ee9"}} />
                        });
                        history.push();
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
            },
            fail : error => {
                  alert(JSON.stringify(error));
            },
        })
    };

    return (
        <AccountsCard
            header={
                <>
                    <img className={styles.logo} src={LogoImg2} alt="logo"/>
                </>
            }
            content={
                <>
                    <form onSubmit={handleSubmit}>
                        <Input
                            name="email" value={loginInfo.email} placeholder="email"
                            onChange={inputHandler} className={styles.input}
                        />
                        <Input.Password
                            className={styles.password} name="password" value={loginInfo.password}
                            placeholder="Password" onChange={inputHandler}
                        />
                        <input
                            type="submit" value="Login"
                            className={styles.btn}
                        />
                    </form>
                    <div className={styles.or}>
                        <div className={styles.beforeline}></div>
                        <div className={styles.main}>OR</div>
                        <div className={styles.afterline}></div>
                    </div>
                    <div className={styles.facebook_login}>
                        <img src={kakao_login} alt="kakao_login" onClick={handleKakaoLogin}/>
                        {/*<FacebookFilled*/}
                        {/*    style={{fontSize: "18px", color: "#385185"}}/>*/}
                        {/*<div className={styles.facebook_desc}> Log in with KaKao</div>*/}
                    </div>
                    <p className={styles.forgot_pwd}>Forgot password?</p>
                </>
            }
            footer={
                <p>
                    Don't have an account?
                    <Link
                        style={{marginLeft: "0.2em", fontWeight: "bold", color: "#0095f6"}}
                        to="/accounts/signup">
                        Sign up
                    </Link>
                </p>
            }
        />
    );
}