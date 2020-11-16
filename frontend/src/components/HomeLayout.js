import React from "react";
import styles from "./HomeLayout.module.scss";


export default function HomeLayout({children, sidebar}) {
    return (
        <div className={styles.wrapper}>
			<div className={styles.postList} >
				{children}
			</div>
			<div className={styles.sidebar} >
				{sidebar}
			</div>
        </div>
    );
}
