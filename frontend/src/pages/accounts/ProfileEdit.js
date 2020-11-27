import React, {useEffect, useState} from "react";
import AppLayout from "../../components/AppLayout";
import ProfileEditCard from "../../components/accounts/ProfileEditCard";
import styles from "./ProfileEdit.module.scss";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {axiosInstance} from "../../api";
import {useAppContext} from "../../store";
import {useParams} from "react-router-dom";

export default function ProfileEdit(){
    const {username : UrlUsername} = useParams();
    const [userInfo, setUserInfo] = useState({profile:{}});
    const [avatarPreview, setAvatarPreview] = useState(null);

    const {store : {jwtToken}} = useAppContext();
    const headers = {Authorization : `JWT ${jwtToken}`};

    useEffect(()=>{
        axiosInstance({
            url : `/accounts/profile/${UrlUsername}/edit`,
            headers,
        }).then(response => {
            const { data } = response;
            setUserInfo(prevState=>({...prevState, ...data}));
        }).catch(error => {
            console.error(error);
        });
    },[]);

    useEffect(()=>{
        setAvatarPreview(userInfo.profile.avatar);
    },[userInfo.profile.avatar]);

    const handleUserChange = (e) => {
        const { value, name} = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name] : value,
        }))
    };

    const handleProfileChange = e => {
        const {value, name} = e.target;
        const newProfile = {
            ...userInfo.profile,
            [name] : value,
        };
        setUserInfo(prevState => ({
            ...prevState,
            profile : newProfile,
        }))
    };

    const handleUpload = e => {
        const {files} = e.target;
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result;
            if(base64){
                setAvatarPreview(base64.toString());
            }
        }
        if (files[0]){
            reader.readAsDataURL(files[0]);
            setUserInfo(prevState => ({
                ...prevState,
                profile : {
                    ...prevState.profile,
                    avatar : files[0],
                }
            }))
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();


        for(const key in userInfo){
            if(typeof(userInfo[key])==="object"){
               for(const subKey in userInfo[key]){
                    if(userInfo[key].avatar === avatarPreview && subKey === "avatar"){
                        formData.append(`${key}.${subKey}`, "");
                    }else{
                        formData.append(`${key}.${subKey}`, userInfo[key][subKey]);
                    }
                }
            }else{
                formData.append(`${key}`, userInfo[key]);
            }
        }

        axiosInstance({
            url : `/accounts/profile/${userInfo.username}/edit/`,
            method : "patch",
            data : formData,
            headers
        }).then(response=>{
            console.log(response);
        }).catch(error=>{
            console.error(error);
        })
    };


    return(
        <AppLayout>
            <ProfileEditCard>
                <div className={styles.edit}>
                    <div className={styles.labels}>
                        <div className={styles.avatar}>
                            {!avatarPreview && <Avatar icon={<UserOutlined />}/> }
                            {avatarPreview &&
                                <Avatar src={avatarPreview} />
                            }
                        </div>
                        <div className={styles.website}>Website</div>
                        <div className={styles.bio}>Bio</div>
                        <div className={styles.email}>Email</div>
                        <div className={styles.phoneNumber}>Phone Number</div>
                        <div className={styles.gender}>Gender</div>
                    </div>
                    <div className={styles.inputs}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.avatar}>
                                <span>{userInfo.username}</span>
                                <label htmlFor="upload">Change Profile Photo</label>
                                <input type="file" id="upload" name="avatar" accept="image/*" onChange={handleUpload} />
                            </div>
                            <div className={styles.website}>
                                <input placeholder="Website" name="website"
                                       value={userInfo.profile.website}
                                       onChange={handleProfileChange}
                                />
                            </div>
                            <div className={styles.bio}>
                            <textarea
                                name="bio" value={userInfo.profile.bio}
                                onChange={handleProfileChange}
                            />
                            </div>
                            <div className={styles.email}>
                                <input
                                    name="email" onChange={handleUserChange}
                                    placeholder="Email" value={userInfo.email}
                                />
                            </div>
                            <div className={styles.phoneNumber}>
                                <input
                                    placeholder="Phone Number" name="phone_number"
                                    value={userInfo.phone_number} onChange={handleUserChange}
                                />
                            </div>
                            <div className={styles.gender}>
                                <select
                                    value={userInfo.profile.gender}
                                    onChange={handleProfileChange}
                                    name="gender"
                                >
                                    <option value="N">None</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    className={styles.submit}
                                    type="submit"
                                />
                            </div>

                        </form>
                    </div>
                </div>
            </ProfileEditCard>
        </AppLayout>
    );
}
