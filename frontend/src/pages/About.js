import React from "react";
import AppLayout from "../components/AppLayout";
import {useAppContext} from "../store";

export default function Home(){
    return(
        <div>
            <AppLayout>
                About
            </AppLayout>
        </div>
    );
}