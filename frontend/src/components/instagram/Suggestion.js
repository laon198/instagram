import React, {useEffect, useState} from "react";
import styles from "./Suggestion.module.scss";
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useAppContext} from "../../store";
import {axiosInstance} from "../../api";
import {Link} from "react-router-dom";

export default function Suggestion({user, refetch}){
    const {store : {jwtToken}} = useAppContext();
    const headers = {Authorization : `JWT ${jwtToken}`};
    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{
        setUserInfo({...user});
    },[]);

    const handleFollow = () => {
        axiosInstance({
            url : "/accounts/follow/",
            method : "post",
            data : {username : userInfo.username},
            headers
        })
            .then(response => refetch())
            .catch(error => console.error(error))
    };

    return(
        <div className={styles.suggestion}>
            <div className={styles.avatar}>
                {!userInfo.avatar &&
                    <Avatar size={40} icon={<UserOutlined />} />
                }
                {userInfo.avatar &&
                    <Avatar size={40} src={userInfo.avatar} />
                }
            </div>
            <div className={styles.username}>
                <Link to={`/accounts/profile/${userInfo.username}`} style={{color:"black"}}>
                    {userInfo.username}
                </Link>
            </div>
            {!userInfo.is_follow &&
                <div className={styles.follow} onClick={handleFollow}>Follow</div>
            }
            {userInfo.is_follow &&
            <div className={styles.follow}>Following</div>
            }
        </div>
    )
}