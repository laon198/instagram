import React from "react";
import styles from "./SuggestionCard.module.scss";
import Suggestion from "./Suggestion";
import {useAxios} from "../../api";
import {useAppContext} from "../../store";

export default function SuggestionCard(){
    const {store : {jwtToken}} = useAppContext();
    const headers = {Authorization : `JWT ${jwtToken}`};

    const [{data : suggestionList , loading, error}, refetch] = useAxios({
        url : "/accounts/suggestion",
        headers,
    });

    return(
        <div className={styles.suggestionCard}>
            <div className={styles.header}>
                <div className={styles.title}>Suggestion For You</div>
                <div className={styles.more}>See All</div>
            </div>
            {suggestionList &&
            suggestionList.map((suggestionUser, index) =>
                index < 5 ? <Suggestion user={suggestionUser} key={suggestionUser.id} refetch={refetch}/> : null
            )}
        </div>
    );
}