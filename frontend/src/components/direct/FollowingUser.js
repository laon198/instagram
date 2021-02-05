import styles from "./FollowingUser.module.scss";
import React from "react";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

export default function FollwingUser({User}) {
    const {username, avatar} = User;
    return (
        <div className={styles.followinguser}>
            <div className={styles.avatar}>
                {!avatar &&
                    <Avatar icon={<UserOutlined />} size={64} />
                }
                {avatar &&
                    <Avatar src={avatar} size={64} />
                }
            </div>
            <div className={styles.username}>
                {username}
            </div>
        </div>
    );
}
