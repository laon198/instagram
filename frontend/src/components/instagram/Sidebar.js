import React from "react";
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SuggestionCard from "./SuggestionCard";
import styles from "./Sidebar.module.scss";

export const sidebar = (
		<div>
			<Link to="/newpost">
				<Button type="primary" block>새포스팅 쓰기</Button>
			</Link>
			<div className={styles.account}>
				<div className={styles.avatar}>
					<Avatar size={57} icon={<UserOutlined />} />
				</div>
                <div className={styles.username}>username</div> {/*FIXME:username change*/}
				<div className={styles.switch}>switch</div>
			</div>
			<SuggestionCard />
		</div>

);