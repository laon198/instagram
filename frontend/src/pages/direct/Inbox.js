import React, {useState} from "react";
import styles from "./Inbox.module.scss"
import UserList from "../../components/direct/UserList";

export default function Inbox({children}) {
    return (
        <div>
            <div className={styles.inbox}>
                <div className={styles.list}>
                    <UserList />
                </div>
                <div className={styles.chat}>
                    {!children && "message go!"}
                    {children}
                </div>
            </div>
        </div>
    );
}
