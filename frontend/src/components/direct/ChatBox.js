import React from "react";
import styles from "./ChatBox.module.scss";
import {useAppContext} from "../../store";

export default function ChatBox({message, from}) {
    const {store : {username : myname}} = useAppContext();
    const who = myname === from ? "me" : "you" ;
    return (
        <>
            {who === "me" ?
                <div className={styles.chatBox_me}>
                    <div className={styles.msg}>
                        {message}
                    </div>
                </div>
            :
                <div className={styles.chatBox_you}>
                    <div className={styles.msg}>
                        {message}
                    </div>
                </div>
             }
        </>
    );
}
