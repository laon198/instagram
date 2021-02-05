import React, {useEffect, useState} from "react";
import styles from "./Chat.module.scss";
import Inbox from "./Inbox";
import {useParams} from "react-router-dom";
import {useAppContext} from "../../store";
import {useAxios} from "../../api";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import ChatBox from "../../components/direct/ChatBox";

export default function Chat() {
    const {username : UrlUsername} = useParams();
    const [inputMessage, setInputMessage] = useState("");
    const [msgLog, setMsgLog] =useState([]);
    const [ws, setWs] = useState();
    const {store : {jwtToken, username : myname}} = useAppContext();
    const headers = {Authorization : `JWT ${jwtToken}`};
    const [{data : talker, error, loading}, repatch] = useAxios({
        url : `accounts/${UrlUsername}`,
        headers
    });

    useEffect(()=>{
        const endpoint = "ws://192.168.0.8:8080/ws/chat/test/";
        const chatSocket = new WebSocket(endpoint);
        setWs(chatSocket);
        chatSocket.onmessage = e => {
            const data = JSON.parse(e.data);
            const {message, username : chatUser} = data;

            setMsgLog(prevState => [
                ...prevState,
                {
                    "username" : chatUser,
                    "message" : message
                }
            ])
        }
    },[])

    const handleChange = e => {
        setInputMessage(e.target.value);
    }

    const handleInput = e => {
        if (e.key === "Enter"){
            ws.send(JSON.stringify({
                "username" : myname,
                'message' : inputMessage,
            }));
            setInputMessage("");
        }
    };


    return (
        <Inbox>
            <div className={styles.header}>
                {talker && !talker.avatar &&
                <Avatar icon={<UserOutlined />} size="small" />
                }
                {talker && talker.avatar &&
                <Avatar src={talker.avatar} size="small" />
                }
                {talker && talker.username}
            </div>
            <div className={styles.body}>
                {msgLog &&
                    msgLog.map(msgObj => <ChatBox message={msgObj.message} from={msgObj.username}/>)
                }
            </div>
            <div className={styles.footer}>
                <input type="text" onKeyPress={handleInput} onChange={handleChange} value={inputMessage}/>
            </div>
        </Inbox>
    );
}
