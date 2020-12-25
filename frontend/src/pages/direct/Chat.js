import React from "react";
import styles from "./Chat.module.scss";
import Inbox from "./Inbox";
import {useParams} from "react-router-dom";
import {useAppContext} from "../../store";
import {useAxios} from "../../api";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

export default function Chat() {
    const {username : UrlUsername} = useParams();
    const {store : {jwtToken}} = useAppContext();
    const headers = {Authorization : `JWT ${jwtToken}`};
    const [{data : talker, error, loading}, repatch] = useAxios({
        url : `accounts/${UrlUsername}`,
        headers
    });
    return (
        <Inbox>
            <div className={styles.header}>
                {!talker.avatar &&
                <Avatar icon={<UserOutlined />} size="small" />
                }
                {talker.avatar &&
                <Avatar src={talker.avatar} size="small" />
                }
                {talker.username}
            </div>
            <div className={styles.body}>
                body
            </div>
            <div className={styles.footer}>
                footer
            </div>
        </Inbox>
    );
}
