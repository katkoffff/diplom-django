import React, {useState, useEffect, Fragment} from 'react';
import APIService from './APIService';
import './App.css'
import VideoList from './components/VideoList';
import Chat from './components/Chat'
import Form from './components/Form';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

function App() {
    const [videos, setVideos] = useState([])
    const [editVideo, setEditVideo] = useState(null)
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [user_id, setUserId, removeUserId] = useCookies(['userid'])
    let history = useHistory()
    
    useEffect (() => {
        APIService.GetVideoList(token['mytoken'])        
            .then(resp => resp.json())
            .then(resp => {setVideos(resp)})        
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        if (!token['mytoken']) {
            history.push('/')
        }
    }, [token])

    const editBtn = (video) => {
        setEditVideo(video)        
    }

    const updatedInformation = (video) => {
        const new_video = videos.map(myvideo => {
            if (myvideo.id === video.id) {
                return video;
            }
            else {
                return myvideo;
            }
        })
        setVideos(new_video)
    }
    
    const videoForm = () => {
        setEditVideo({title: '', description: '', createddate: '', poster: '', content: '', commentaries:'', like:'', subscription:''})
    }

    const insertedInformation = (video) => {
        const new_videos = [...videos, video]
        setVideos(new_videos)
    }

    const deleteBtn = (video) => {
        const new_videos = videos.filter(myvideo => {
            if (myvideo.id === video.id) {
                return false
            }
            return true;
        })
        setVideos(new_videos)
    }
    const logoutBtn = () => {
        removeToken(['mytoken'])
    }

    return (
        <div className='App'>
            <div className='row'>
                <div className='col'>            
                    <h1>Django+React Blog</h1>
                    <br/>
                </div>
                <div className='col'>
                    <button onClick={videoForm} className='btn btn-primary'>Insert video</button>
                </div>
                <div className='col'>
                    <button onClick={logoutBtn} className='btn btn-primary'>Logout</button>
                </div>
            </div>            
            <br/> 
            <div className='row'>
                <div className='col'>
                    <VideoList videos = {videos} editBtn = {editBtn} deleteBtn = {deleteBtn}/>
                   
                </div>
                <div className='col'>
                {editVideo ? <Form video = {editVideo} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation}/> : null} 
                </div>
                <div className='col'>
                    <Chat />
                </div>
            </div>        
        </div>
    )
}

export default App;