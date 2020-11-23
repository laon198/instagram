import React, {useState, useEffect} from "react";
import styles from  "./PostCard.module.scss";
import { MoreOutlined, UserOutlined, HeartOutlined,
	   	 SendOutlined, TagOutlined, MessageOutlined
	   } from "@ant-design/icons";
import {Avatar, Modal} from "antd";
import {Link} from "react-router-dom";
import DeletePost from "./DeletePost";


export default function PostCard({post, refetch}){
	const [visible, setVisible] = useState(false);
	const [delter, setDeleter] = useState(false);
	const {id, author, caption, photo, location} = post;
	const {username} = author;
	
	const showModal = () =>  setVisible(true);
	const handleCancel = () => setVisible(false);
	
	const handleDelete = () => setDeleter(true);
	
	return(
		<div className={styles.PostCard}>
			<div className={styles.header}>
				<div className={styles.avatar} >
					<Avatar icon={<UserOutlined />} />
				</div>
				<div className={styles.username}><Link to="/accounts/profile" style={{color:"black"}}>{username}</Link></div>
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
							<HeartOutlined style={{fontSize:"27px", marginRight:"1.5rem"}}/>
							<MessageOutlined style={{fontSize:"27px", marginRight:"1.5rem"}}/>
							<SendOutlined rotate="-45" style={{fontSize:"27px", marginRight:"0.6rem"}}/>
						</div>
						<div className={styles.rightIcons}>
							<TagOutlined style={{fontSize:"27px"}}/>
						</div>
					</div>
					<div className={styles.like}> 좋아요 개 </div>
				</div>
				<div className={styles.caption}>
					<span>{username}</span>
					{caption}
				</div>
				<div className={styles.comment}>
					<div className={styles.show}>
						댓글보기
					</div>
					<div className={styles.create}>
						<form>
							<input type="text" placeholder="댓글 달기..." className={styles.input} />
							<button className={styles.submit}>게시</button>
						</form>
					</div>
				</div>
			
			</div>
		</div>
	);
}