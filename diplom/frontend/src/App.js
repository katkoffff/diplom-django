import React, {useState, useEffect, Fragment} from 'react';
import './App.css'
import VideoList from './components/VideoList';
import Form from './components/Form';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

function App() {
    const [videos, setVideos] = useState([])
    const [editVideo, setEditVideo] = useState(null)
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    let history = useHistory()
    
    useEffect (() => {
        fetch('http://127.0.0.1:8000/api/videos/', {
            'method': 'GET',
            headers: {
                'Content-Type':'aplication/json',
                'Authorization':`Token ${token['mytoken']}`
            }
        })
        .then(resp => resp.json())
        .then(resp => setVideos(resp))
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
        setEditVideo({title: '', description: ''})
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
            <VideoList videos = {videos} editBtn = {editBtn} deleteBtn = {deleteBtn}/>            
            {editVideo ? <Form video = {editVideo} updatedInformation = {updatedInformation}
            insertedInformation = {insertedInformation}/> : null}                
        </div>
    )
}

export default App;