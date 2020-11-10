import React from "react";
import LogoImg from "../assets/LogoImg.png";
import "./Header.scss";
import {Input} from "antd";
import {MailOutlined, UserOutlined, HomeFilled, CompassOutlined, HeartOutlined} from "@ant-design/icons";

export default function Header() {
    return (
        <div className="header">
            <h1 className="page-title"><img src={LogoImg} alt="logo"/>
            </h1>
            <div className="search">
                <Input.Search
                    placeholder="Search"
                    size="medium"
                />
            </div>
            <div className="top-nav">
                <HomeFilled style={{fontSize:"23px", margin:"0.5em"}}/>
                <MailOutlined style={{fontSize:"23px", margin:"0.5em"}}/>
                <CompassOutlined style={{fontSize:"23px", margin:"0.5em"}}/>
                <HeartOutlined style={{fontSize:"23px", margin:"0.5em"}}/>
                <UserOutlined style={{fontSize:"23px", margin:"0.5em"}}/>
            </div>
        </div>

    );
}