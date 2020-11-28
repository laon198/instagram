import React, {useState, useEffect} from "react";
import styles from  "./PostCard.module.scss";
import {
	MoreOutlined, UserOutlined, HeartOutlined,
	SendOutlined, TagOutlined, MessageOutlined, HeartFilled
} from "@ant-design/icons";
import {Avatar, Modal} from "antd";
import {Link} from "react-router-dom";
import DeletePost from "./DeletePost";
import CommentForm from "./CommentForm";
import {axiosInstance, useAxios} from "../../api";
import Comment from "./Comment";


export default function PostCard({post, refetch, headers}){
	const [visible, setVisible] = useState(false);
	const [delter, setDeleter] = useState(false);
	const {id, author, caption, photo,
		location, is_like, how_like, created_at} = post;
	const {username, avatar} = author;
	const [like, setLike] = useState({is_like:is_like, how_like:how_like});

	const [{data : commentList, error, loading}, commentRefetch] = useAxios({
		url : `/api/post/${id}/comment/`,
        headers
	});
	
	const showModal = () =>  setVisible(true);
	const handleCancel = () => setVisible(false);
	
	const handleDelete = () => setDeleter(true);

	const handleLike = () => {
	    const method = like.is_like==true ? "delete" : "post" ;
	    axiosInstance({
			url : `/api/post/${id}/like/`,
			method : method,
			headers
		}).then(response=>{
		    axiosInstance({
				url : `/api/post/${id}/`,
				method : "get",
				headers
			}).then(response=>{
				const {data : {is_like, how_like}} = response;
			    setLike({is_like:is_like, how_like:how_like});
			}).catch(error=>{
				console.error(error);
			})
		}).catch(error=>{
			console.error(error);
		});
	};
	
	return(
		<div className={styles.PostCard}>
			<div className={styles.header}>
				<div className={styles.avatar} >
					{!avatar &&
						<Avatar icon={<UserOutlined />} />
					}
					{avatar &&
						<Avatar src={avatar} />
					}
				</div>
				<div className={styles.username}>
					<Link to={`/accounts/profile/${username}`} style={{color:"black"}}>{username}</Link>
				</div>
				<div className={styles.more}>
					<MoreOutlined onClick={showModal} rotate="90" style={{fontSize:"23px", fontWight:"bold"}}/> 
					<Modal
						width={400} 
						footer={null} closable={false}
						centered bodyStyle={{padding:"0"}}
						visible={visible}
					>
						<div 
							style={{width:"100%", borderBottom:"1px solid #dbdbdb", color:"red", cursor:"pointer",
								textAlign:"center", fontSize:"14px", padding:"10px 0 10px 0" }}
							onClick={handleDelete} 
						>
							<DeletePost action={delter} postId={post.id} setters={{setDeleter, setVisible}} refetch={refetch}/>
						</div>
						<div 
							style={{width:"100%", borderBottom:"1px solid #dbdbdb",cursor:"pointer",
								textAlign:"center", fontSize:"14px", padding:"10px 0 10px 0"}}
							onClick={handleCancel}
						>
							취소
						</div>
					</Modal>
				</div>
			</div>
			<div className={styles.photo}>
				<img src={photo} alt={caption} className={styles.photo} />
			</div>
			<div className={styles.contents}>
				<div className={styles.interactive}>
					<div className={styles.btns}>
						<div className={styles.leftIcons} >
							{like.is_like==true ?
								<HeartFilled
									style={{fontSize:"27px", color:"red", marginRight:"1.5rem", cursor:"pointer"}}
									onClick={handleLike}
								/>:
								<HeartOutlined
									style={{fontSize:"27px", marginRight:"1.5rem", cursor:"pointer"}}
									onClick={handleLike}
								/>
							}
							<MessageOutlined style={{fontSize:"27px", marginRight:"1.5rem"}}/>
							<SendOutlined rotate="-45" style={{fontSize:"27px", marginRight:"0.6rem"}}/>
						</div>
						<div className={styles.rightIcons}>
							<TagOutlined style={{fontSize:"27px"}}/>
						</div>
					</div>
					<div className={styles.like}> 좋아요 {like.how_like}개 </div>
				</div>
				<div className={styles.caption}>
					<span>{username}</span>
					{caption}
				</div>
				<div className={styles.comment}>
                    <b>댓글 {commentList ? commentList.length : 0}개 모두 보기</b>
					{commentList &&
						commentList.map((comment, index) =>
						    index<2 ?
							<Comment postId={id} comment={comment} headers={headers}
									 key={comment.id} refetch={commentRefetch}/> :
							null
						)
					}
				</div>
				<div className={styles.date}>
					{created_at}
				</div>
			</div>
			<div className={styles.inputComment}>
                <CommentForm postId={id} headers={headers} refetch={commentRefetch} />
			</div>
		</div>
	);
}