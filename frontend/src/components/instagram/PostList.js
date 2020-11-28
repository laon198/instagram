import React, {useEffect} from "react";
import {useAppContext} from "../../store";
import {API_HOST} from "../../Constants";
import PostCard from "./PostCard";
import {useAxios} from "../../api";

export default function PostList() {
	const {store : {jwtToken}} = useAppContext();
	
	const headers = {Authorization : `JWT ${jwtToken}`};
	
	const [{data : postList ,  error, loading}, refetch] = useAxios({
		url : "/api/post/",
		headers
	});

	//FIXME : post update
	// useEffect(()=>{
	// 	refetch()
	// },[postList])
	
	return(
		<div>
			{postList &&
				postList.map(post => <PostCard post={post} key={post.id} refetch={refetch} headers={headers}/>)
			}
		</div>
	);
}