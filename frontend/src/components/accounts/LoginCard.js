import React, {useState} from "react";
import AccountsCard from "./AccountsCard";
import LogoImg2 from "../../assets/LogoImg2.png";
import {Button, Input} from "antd";
import {FacebookFilled} from "@ant-design/icons";
import styles from "./LoginCard.module.scss";
import {Link} from "react-router-dom";

export default function LoginCard({onLogin}) {
    const [loginInfo, setLoginInfo] = useState({});

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
                            className={styles.input} name="username" value={loginInfo.username}
                            placeholder="Username" onChange={inputHandler}
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
                        <FacebookFilled
                            style={{fontSize: "18px", color: "#385185"}}/>
                        <div className={styles.facebook_desc}> Log in with Facebook</div>
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