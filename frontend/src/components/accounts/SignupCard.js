import React, {useState} from "react";
import styles from "./SignupCard.module.scss";
import LogoImg2 from "../../assets/LogoImg2.png";
import {FacebookFilled} from "@ant-design/icons";
import { Button, Input} from "antd";
import AccountsCard from "./AccountsCard";
import {Link} from "react-router-dom";

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
            header={
                <>
                    <img className={styles.logo} src={LogoImg2} alt="logo"/>
                    <p className={styles.desc}>Sign up to see photos and videos from your friends. </p>
                    <Button type="primary" block className={styles.btn}>
                        <FacebookFilled style={{fontSize: "17px"}}/>
                        Log in with Facebook
                    </Button>
                    <div className={styles.or}>
                        <div className={styles.beforeline}></div>
                        <div className={styles.main}>OR</div>
                        <div className={styles.afterline}></div>
                    </div>
                </>
            }
            content={
                <>
                    <Input className={styles.input} value={signupInfo.email} name="email" onChange={inputHandler} placeholder="Email"/>
                    <Input className={styles.input} value={signupInfo.phoneNumber} name="phoneNumber" onChange={inputHandler}
                           placeholder="PhoneNumber"/>
                    <Input className={styles.input} value={signupInfo.username} name="username" onChange={inputHandler}
                           placeholder="Username"/>
                    <Input.Password
                        value={signupInfo.password}
                        name="password" onChange={inputHandler} placeholder="Password" className={styles.password}
                    />
                    <Button
                        type="primary" block
                        onClick={() => onSignup({signupInfo}, {setSignupInfo})}
                    >
                        Sign Up
                    </Button>
                    <p className={styles.policy}>
                        By signing up, you agree to our Terms , Data Policy and Cookies Policy .
                    </p>
                </>
            }
            footer={
                <>
                    <p>
                        Have an account?
                        <Link
                            style={{marginLeft:"0.2em", fontWeight:"bold", color:"#0095f6"}}
                            to="/accounts/login">
                            Log in
                        </Link>
                    </p>
                </>
            }
        />
    );
}