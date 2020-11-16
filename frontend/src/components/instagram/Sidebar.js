import React from "react";
import {Button} from "antd";
import { Link } from "react-router-dom";

export const sidebar = (
		<div>
			<Link to="/newpost">
				<Button type="primary" block>새포스팅 쓰기</Button>
			</Link>
		</div>

);