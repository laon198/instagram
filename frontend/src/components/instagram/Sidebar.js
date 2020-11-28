import React, {useEffect, useState} from "react";
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SuggestionCard from "./SuggestionCard";
import styles from "./Sidebar.module.scss";
import {useAppContext} from "../../store";
import {axiosInstance} from "../../api";

export function Sidebar(){
	const {store : {jwtToken, username}} = useAppContext();
	const headers = {Authorization : `JWT ${jwtToken}`};
	const [userInfo, setUserInfo] = useState({});

	useEffect(()=>{
	    axiosInstance({
			url : `/accounts/${username}/`,
			method : "get",
			headers
		}) .then(response=>{
			setUserInfo({
				...response.data
			})
			}).catch(error=>{
				console.error(error);
		})
	},[]);
    return(
		<div>
			<Link to="/newpost">
				<Button type="primary" block>새포스팅 쓰기</Button>
			</Link>
			<div className={styles.account}>
				<div className={styles.avatar}>
					{!userInfo.avatar &&
						<Avatar size={57} icon={<UserOutlined />} />
					}
					{userInfo.avatar &&
						<Avatar size={57} src={userInfo.avatar} />
					}
				</div>
				<div className={styles.username}>{userInfo.username}</div>
				<div className={styles.switch}>switch</div>
			</div>
			<SuggestionCard />
		</div>
	);
};