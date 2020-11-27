import React from "react";
import styles from "./ProfileEditCard.module.scss";

export default function ProfileEditCard({children}){
    return(
        <div className={styles.editCard}>
            <div className={styles.menu}>
                <div className={styles.menuItems}>Edit Profile</div>
                <div className={styles.menuItems}>Change Password</div>
                <div className={styles.menuItems}>App and Website</div>
                <div className={styles.menuItems}>Email and SNS</div>
                <div className={styles.menuItems}>Push Notifications</div>
                <div className={styles.menuItems}>Manager Contacts</div>
                <div className={styles.menuItems}>Privacy and Security</div>
                <div className={styles.menuItems}>Login Activity</div>
                <div className={styles.menuItems}>Email From Intagram</div>
            </div>
            <div className={styles.contents}>
                {children}
            </div>
        </div>
    );
}