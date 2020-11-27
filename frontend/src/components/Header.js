import React from "react";
import LogoImg from "../assets/LogoImg.png";
import "./Header.scss";
import {Input, Dropdown, Menu, Button} from "antd";
import {TagsOutlined, MailOutlined, UserOutlined, HomeFilled,
		CompassOutlined, HeartOutlined, SettingOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useAppContext} from "../store";


export default function Header() {
    const {store : {username}} = useAppContext();

    const menu = (
        <Menu>
            <Menu.Item >
                <Link to={`/accounts/profile/${username}`} className="items" >
                    <UserOutlined style={{fontSize:"16px"}}/>
                    프로필
                </Link>
            </Menu.Item>
            <Menu.Item className="items">
                <Link to="" className="items" >
                    <TagsOutlined  style={{fontSize:"16px"}}/>
                    저장됨
                </Link>
            </Menu.Item>
            <Menu.Item className="items">
                <Link to="" className="items" >
                    <SettingOutlined style={{fontSize:"16px"}} />
                    설정
                </Link>
            </Menu.Item>
            <Menu.Item className="items">
                <Link to="" className="items" >
                    <UserSwitchOutlined style={{fontSize:"16px"}} />
                    계정전환
                </Link>
            </Menu.Item>
            <Menu.Item >
                <Link to="/accounts/logout" className="items logout">
                    로그아웃
                </Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header">
            <h1 className="page-title">
                <Link to="/">
                    <img src={LogoImg} alt="logo"/>
                </Link>
            </h1>
            <div className="search">
                <Input.Search
                    placeholder="Search"
                    size="medium"
                />
            </div>
            <div className="top-nav">
                <Link to="/">
                    <HomeFilled className="icons"/>
                </Link>
                <MailOutlined className="icons"/>
                <CompassOutlined className="icons"/>
                <HeartOutlined className="icons"/>
				 <Dropdown overlay={menu} placement="bottomRight" trigger={['click']} arrow>
					 <UserOutlined className="icons" />
				</Dropdown>
            </div>
        </div>

    );
}

