import React from "react";
import AppLayout from "../../components/AppLayout";
import styles from "./Profile.module.scss";

export default function Profile(){
    return(
        <AppLayout>
            <div className={styles.profile}>
                <div className={styles.userInfo}>

                </div>
                <div className={styles.posts}>
                    posts
                </div>
            </div>
        </AppLayout>
    );
}