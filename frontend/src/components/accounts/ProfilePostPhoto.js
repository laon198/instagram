import React from "react";
import styles from "./ProfilePostPhoto.module.scss";

export default function ProfilePostPhoto({photo}){
    return(
        <div className={styles.postPhoto}>
            <img src={photo} alt="photo" className={styles.photo}/>
        </div>
    );
}