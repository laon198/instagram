import React from "react";
import "./AppLayout.scss";
import Header from "./Header";


export default function AppLayout({children}) {
    return (
        <div className="app">
            <div id="header">
                <div className="container">
                    <Header />
                </div>
            </div>
            <div id="content">
                <div className="container">
                    {children}
                </div>
            </div>
            <div id="footer">
                <div className="container">
                </div>
            </div>
        </div>
    );
}

