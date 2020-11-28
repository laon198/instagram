import React, {useState} from "react";
import styles from "./CommentForm.module.scss";
import {axiosInstance} from "../../api";

export default function CommentForm({postId,  headers, refetch}){
    const [comment, setComment] = useState();

    const handleChange = e => setComment(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        axiosInstance({
            url : `/api/post/${postId}/comment/`,
            method : "post",
            data : {message : comment},
            headers,
        }).then(response => {
            setComment("");
            refetch();
        }).catch(error=>{
            console.error(error);
        })
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text" placeholder="Add a comment..."
                className={styles.text} onChange={handleChange}
                value={comment}
            />
            <input type="submit" value="Post" className={styles.submit}/>
        </form>
    );
};