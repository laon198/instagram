import LoginRequiredRouter from "../../utils/LoginRequiredRouter";
import AppLayout from "../../components/AppLayout";
import Inbox from "./Inbox";
import Chat from "./Chat";
import React from "react";

export default function Root({match}) {
    return (
        <AppLayout>
            <LoginRequiredRouter exact path={`${match.url}/inbox`} Component={Inbox} />
            <LoginRequiredRouter exact path={`${match.url}/inbox/:username`} Component={Chat} />
        </AppLayout>
    );
}
