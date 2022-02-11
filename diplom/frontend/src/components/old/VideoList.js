import React from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
//import ReactHtmlParser from 'react-html-parser';

function VideoList(props) {
  
    const [token] = useCookies(['mytoken'])  
    const [user_id] = useCookies(['userid'])

    const editBtn = (video) => {
    props.editBtn(video);
    
  }  

  const deleteBtn = (video) => {
    APIService.DeleteVideo(video.id, token['mytoken'])  
    .then(() => props.deleteBtn(video))        
  } 

  return (
    <div>
        huli
        {props.videos && props.videos.map(video => {
                return (
                <div key={video.id}>
                    <h2>{video.title}</h2>                    
                    <h3>{ReactHtmlParser(video.description)}</h3>
                    <br/>
                    {ReactHtmlParser(video.poster)}
                    {ReactHtmlParser(video.content)}
                    <div className='row'>
                        <div className='col-md-1'>
                            <button className='btn btn-primary' onClick={() => editBtn(video)}>
                                Update
                            </button>
                        </div>
                        <div className='col-md-1'>
                            <button onClick={() => deleteBtn(video)} className='btn btn-danger'>
                                Delete
                            </button>

                        </div>

                    </div>
                    <hr className='hrclass'/>
                </div>
                )
            }

            )

            }
    </div>
    );
}

export default VideoList;
