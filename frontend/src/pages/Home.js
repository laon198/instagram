import React from "react";
import AppLayout from "../components/AppLayout";
import HomeLayout from "../components/HomeLayout";
import PostList from "../components/instagram/PostList";
import {Sidebar} from "../components/instagram/Sidebar";

export default function Home(){
    return(
        <div>
            <AppLayout>
				<HomeLayout sidebar={<Sidebar />}>
					<PostList />
				</HomeLayout>
            </AppLayout>
        </div>
    );
}