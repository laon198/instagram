import React from "react";
import styles from "./Comment.module.scss";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {axiosInstance} from "../../api";

export default function Comment({postId, comment, refetch, headers}){
    const {id, message, author, is_like} = comment;
    const {username, avatar} = author;

    const handleLike = () => {
        const method = is_like==true ? "delete" : "post" ;
        axiosInstance({
            url : `/api/post/${postId}/comment/${id}/like/`,
            method : method,
            headers
        }).then(response=>{
            refetch();
        }).catch(error=>{
            console.error(error);
        });
    };

    return(
        <div className={styles.comment}>
            <div className={styles.message}>
                <span>{username}</span>
                {message}
            </div>
            <div className={styles.like}>
                {is_like==true ?
                    <HeartFilled
                        style={{fontSize:"14px", color:"red",cursor:"pointer"}}
                        onClick={handleLike}
                    />:
                    <HeartOutlined
                        style={{fontSize:"14px",cursor:"pointer"}}
                        onClick={handleLike}
                    />
                }
            </div>
        </div>
    );
}