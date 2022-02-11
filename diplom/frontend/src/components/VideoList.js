import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import './VideoList.css'
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Chat from './Chat'
import VideoForm from './VideoForm'
import UpdateInsertForm from './UpdateInsertForm';


function VideoList() {
  const [videos, setVideos] = useState([])  
  const [viewVideo, setViewVideo] = useState(null)
  const [insertVideo, setInsertVideo] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  const [user_id, setUserId, removeUserId] = useCookies(['userid'])
  const [user_name, setUserName, removeUserName] = useCookies(['username'])
  let history = useHistory()  

  useEffect (() => {
      APIService.GetVideoList(token['mytoken']) 
          .then(resp => {setVideos(resp)})        
          .catch(error => console.log(error))
  }, [viewVideo, insertVideo])
  
  useEffect(() => {
      if (!token['mytoken']) {
          history.push('/')
      }
  }, [token])

  
    const updatedInformation = (video) => {
        const new_video = videos.map(myvideo => {
            if (myvideo.id === video.id) {                
                myvideo.author=user_name['username'];
                myvideo.title=video.title;
                myvideo.description=video.description;
                myvideo.poster=video.poster;
                myvideo.content=video.content;
                setViewVideo(myvideo);                
                return myvideo;            }
            else {
                return myvideo;
            }
        })
        setVideos(new_video)
        
    }

    const videoForm = () => {
        setInsertVideo({title: '', description: '', poster: '', content: ''})
    }

    const insertedInformation = (video) => {
        const new_videos = [...videos, video]
        setVideos(new_videos)
    }

    const deleteBtn = (video_id) => {
        const new_videos = videos.filter(myvideo => {
            if (myvideo.id === video_id) {
                return false
            }
            return true;
        })
        setVideos(new_videos)
        setViewVideo(null)
    }

    const logoutBtn = () => {
        removeToken(['mytoken'])
    }

    const viewBtn = (video) => {
        setViewVideo(video);
        setInsertVideo(null)        
    }  
    
  return (
    <div>
        <div className='container-flex VideoList'>
            <div className='row'>
                <div className='col'>            
                    <h1>Django+React Blog</h1>
                    <br/>
                </div>
                <div className='col'>
                    <form className="form-search">
                        <div className="input-append">
                            <input type="text" className="span2 search-query"/>
                            <button type="submit" className="btn btn-info">Найти</button>
                        </div>                        
                    </form>
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
                <div className='col wrappervideolist'>
                    <div className='scrollcommentvideolist' data-bs-spy="scroll" data-bs-target="#commentary"> 
                        <div id='#commentary'>  
                        {videos && videos.map(video => {
                        return (
                            <div key={video.id}>
                                <h2>{video.title}</h2>
                                <button type="button" className="btn btn-link" onClick={() => viewBtn(video)}>
                                <i>
                                {ReactHtmlParser(video.poster)}
                                </i>
                                </button>
                                
                                <hr className='hrclass'/>
                            </div>
                        )})
                        }
                        </div>
                    </div>    
                </div>
                <div className='col wraper video'>
                    {insertVideo ?  <UpdateInsertForm video = {insertVideo} insertedInformation = {insertedInformation}/> :
                     viewVideo ? <VideoForm video = {viewVideo} deleteBtn = {deleteBtn} updatedInformation = {updatedInformation}/> : null}                    
                </div>
                <div className='col'>
                    <Chat />
                </div>
            </div>        
        </div>
    </div>
    );
}

export default VideoList;