import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import styles from './NewPostCard.module.scss';
import {useAppContext} from "../../store";
import { Form, Input, Button, Upload} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {axiosInstance} from "../../api";

export default function NewPostCard() {
	const [fileList, setFileList] = useState([]);
	const {store : {jwtToken}} = useAppContext();
	const history = useHistory();
	
	const onFinish = values => {
		const {caption, location, photo : {fileList}} = values;
		const headers = {Authorization : `JWT ${jwtToken}`};
		const formData = new FormData();
		
		formData.append("caption", caption);
		formData.append("location", location);
		
		fileList.forEach(file=>{
			formData.append("photo", file.originFileObj);
		})
		
		axiosInstance({
			method:"post",
			url:"api/post/",
			data:formData,
			headers
		}).then(response=>{
			history.push("/");
		}).catch(error=>{
			console.error(error);
		})
		
		
		
	};
	
	const handleUploadChange = ({fileList}) => setFileList(fileList);
	
	return (
		<div className={styles.card}>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					label="Caption"
					name="caption"
					rules={[{ required: true, message: 'Please input your caption!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="location"
					name="location"
					rules={[{ required: true, message: 'Please input your location!' }]}
				>
					<Input />
				</Form.Item>
				
				<Form.Item
					label="Photo"
					name="photo"
					rules={[{ required: true, message: 'Please upload your photo!' }]}
				>
					<Upload
						listType="picture-card"
						fileList={fileList}
						onChange={handleUploadChange}
						beforeUpload={()=>{
							return false;
						}}
					>
						{fileList.length > 0 ? null : 
                        <div>
                            <PlusOutlined />
                            <div className="ant-upload-text">Upload</div>
                        </div>
						}
					</Upload>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};