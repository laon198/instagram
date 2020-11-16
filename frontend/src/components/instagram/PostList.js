import React from "react";
import useAxios from "axios-hooks";
import {useAppContext} from "../../store";
import {API_HOST} from "../../Constants";
import PostCard from "./PostCard";

export default function PostList() {
	const {store : {jwtToken}} = useAppContext();
	
	const headers = {Authorization : `JWT ${jwtToken}`};
	
	const [{data : postList ,  error, loading}, refetch] = useAxios({
		url : API_HOST+"api/post/",
		headers
	});
	
	return(
		<div>
			{postList &&
				postList.map(post => <PostCard post={post} key={post.id} refetch={refetch}/>)
			}
		</div>
	);
}