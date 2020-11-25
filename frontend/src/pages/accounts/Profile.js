import React, {useEffect, useState} from "react";
import AppLayout from "../../components/AppLayout";
import styles from "./Profile.module.scss";
import {useParams} from "react-router-dom";
import {Avatar, Button} from "antd";
import {ContactsOutlined, ReadOutlined, TableOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {useAppContext} from "../../store";
import {axiosInstance} from "../../api";
import ProfilePostPhoto from "../../components/accounts/ProfilePostPhoto";

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
                    <div className={styles.postsTitle}>
                        <div className={styles.postMenu}><TableOutlined/> POSTS</div>
                        <div className={styles.postMenu}><ReadOutlined/> GUIDES</div>
                        <div className={styles.postMenu}><VideoCameraOutlined/> IGTV</div>
                        <div className={styles.postMenu}><ContactsOutlined/> TAGGED</div>
                    </div>
                    <div className={styles.postsContents}>
                        {userInfo.photo_list && userInfo.photo_list.map(photo => <ProfilePostPhoto photo={photo} />)}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}