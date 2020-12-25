import React from "react";
import styles from "./UserList.module.scss";
import FollowingUser from "./FollowingUser";
import {useAppContext} from "../../store";
import {useAxios} from "../../api";
import {Link} from "react-router-dom";

export default function UserList() {
    const {store : {username, jwtToken}} = useAppContext();
    const headers = {Authorization : `JWT ${jwtToken}`};
    const [{data : followingList, error, loading}, repatch] = useAxios({
        url : 'accounts/chat/list',
        headers
    });
    return (
        <div className={styles.userlist}>
            <div className={styles.myprofile}>
                {username}
            </div>
            <div className={styles.list}>
                {followingList &&
                    followingList.map(user =>
                        <Link to={`/direct/inbox/${user.username}`} >
                            <FollowingUser User={user} key={user.id} />
                        </Link>
                    )
                }
            </div>
        </div>
    );
}
