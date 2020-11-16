import React from "react";
import AppLayout from "../../components/AppLayout";
import HomeLayout from "../../components/HomeLayout";
import NewPostCard from "../../components/instagram/NewPostCard";

export default function NewPost(){
	return(
		<AppLayout>
			<NewPostCard />
		</AppLayout>
	);
}