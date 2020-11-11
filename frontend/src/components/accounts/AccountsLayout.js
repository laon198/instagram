import React from "react";
import "./AccountsLayout.scss";
import AppStore from "../../assets/AppStore.png";
import GoogleStore from "../../assets/GoogleStore.png";

export default function AccountsLayout({children}) {
    return (
        <div>
            <div className="contents">
                {children}
            </div>
            <div className="footer">
                <div className="info">
                    <div className="nav">
                        <div>About</div> <div>Blog</div> <div>Jobs</div>
                        <div>Help</div> <div>API</div> <div>Privacy</div>
                        <div>Terms</div> <div>Top Accounts</div>
                        <div>Hashtags</div> <div>Loactions</div>
                    </div>
                    <div className="copyright">© 2020 Instagram from Facebook</div>
                </div>
            </div>
        </div>
    );
}