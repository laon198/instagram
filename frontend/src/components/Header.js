import React from "react";
import LogoImg from "../assets/LogoImg.png";
import "./Header.scss";
import {Input} from "antd";
import {MailOutlined, UserOutlined, HomeFilled, CompassOutlined, HeartOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export default function Header() {
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
                <UserOutlined className="icons"/>
            </div>
        </div>

    );
}