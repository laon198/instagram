import React from "react";
import AppLayout from "../components/AppLayout";
import HomeLayout from "../components/HomeLayout";
import PostList from "../components/instagram/PostList";
import {sidebar} from "../components/instagram/Sidebar";
import {useAppContext} from "../store";

export default function Home(){
    return(
        <div>
            <AppLayout>
				<HomeLayout sidebar={sidebar}>
					<PostList />
				</HomeLayout>
            </AppLayout>
        </div>
    );
}