import React from "react";
import styles from "./Suggestion.module.scss";
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useAppContext} from "../../store";
import {axiosInstance} from "../../api";

export default function Suggestion({user, refetch}){
    const {store : {jwtToken}} = useAppContext();
    const headers = {Authorization : `JWT ${jwtToken}`};
    const {username, is_follow : isFollow} = user;

    const handleFollow = () => {
        axiosInstance({
            url : "/accounts/follow/",
            method : "post",
            data : {username : username},
            headers
        })
            .then(response => refetch())
            .catch(error => console.error(error))
    };

    return(
        <div className={styles.suggestion}>
            <div className={styles.avatar}><Avatar size={40} icon={<UserOutlined />} /></div>
            <div className={styles.username}>{username}</div>
            {!isFollow &&
                <div className={styles.follow} onClick={handleFollow}>Follow</div>
            }
            {isFollow &&
            <div className={styles.follow}>Following</div>
            }
        </div>
    )
}