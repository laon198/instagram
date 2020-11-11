import React from "react";
import "./AccountsCard.scss";
import AppStore from "../../assets/AppStore.png";
import GoogleStore from "../../assets/GoogleStore.png";

export default function AccountsCard({style, header, content, footer}){
    return(
        <div className="accounts-card" style={style}>
            <div className="card-box">
                <div className="card-header"> {header} </div>
                <div className="card-content"> {content} </div>
            </div>
            <div className="card-footer"> {footer} </div>
            <div className="store">
                <p>Get the app.</p>
                <div className="store-link">
                    <a
                        target="_blank"
                        href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
                        <img src={AppStore} alt="AppStore" />
                    </a>
                    <a
                        target="_blank"
                        href="https://play.google.com/store/apps/details?id=com.instagram.android">
                        <img className="google" src={GoogleStore} alt="AppStore" />
                    </a>
                </div>
            </div>
        </div>

    );
}



