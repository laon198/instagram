import React, {useEffect, useState} from "react";
import AppLayout from "../../components/AppLayout";
import styles from "./Profile.module.scss";
import {useParams} from "react-router-dom";
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useAppContext} from "../../store";
import {axiosInstance} from "../../api";

export default function Profile(){
    const {username : UrlUsername} = useParams();
    const {store : {jwtToken}} = useAppContext();
    const headers = {Authorization : `JWT ${jwtToken}`};
    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{
        axiosInstance({
            url : `/accounts/profile/${UrlUsername}/`,
            headers
        }).then(response => {
            const {data} = response;
            setUserInfo(prevState => ({...prevState, ...data}));
        }).catch(error => {
            console.error(error);
        });
    },[])

    return(
        <AppLayout>
            <div className={styles.profile}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}><Avatar size={150} icon={<UserOutlined />} /></div>
                    <div className={styles.userDesc}>
                        <div className={styles.username}>
                            {userInfo.username}
                            <Button className={styles.btn}>Edit Profile</Button>
                        </div>
                        <div className={styles.action}>
                            <span><b>{userInfo.how_posts}  </b>posts</span>
                            <span><b>{userInfo.how_followings}  </b>followings</span>
                            <span><b>{userInfo.how_followers}  </b>followers</span>
                        </div>
                    </div>

                </div>
                <div className={styles.posts}>
                    posts
                </div>
            </div>
        </AppLayout>
    );
}