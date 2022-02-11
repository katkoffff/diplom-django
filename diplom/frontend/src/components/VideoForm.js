import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import ReactHtmlParser from 'react-html-parser';
import './VideoForm.css'
import CommentForm from './CommentForm';
import APIService from '../APIService';
import UpdateInsertForm from './UpdateInsertForm';


function VideoForm(props) {
  const [videoid, setVideoId] = useState('')  
  const [author, setAuthor] = useState('')  
  const [title, setTitle] = useState('') 
  const [description, setDescription] = useState('') 
  const [poster, setPoster] = useState(null)
  const [content, setContent] = useState(null)
  const [commentary, setCommentary] = useState(null) 
  const [subscription, setSubscription] = useState([]) 
  const [like, setLike] = useState([])  
  const [token] = useCookies(['mytoken'])
  const [user_id] = useCookies(['userid'])
  const [user_name] = useCookies(['username'])  
  const [parentid, setParentId] = useState(null)
  const [parentname, setParentName] = useState(null)
  const [dis, setDis] = useState(true)
  const [likestatus, setLikeStatus] = useState(true)   
  const [editVideo, setEditVideo] = useState(null)

  
  useEffect(() => {
    setVideoId(props.video.id)
    setAuthor(props.video.author)
    setTitle(props.video.title)
    setDescription(props.video.description)
    setPoster(props.video.poster)
    setContent(props.video.content) 
    setCommentary(props.video.commentaries)
    setSubscription(props.video.subscriptions)
    setLike(props.video.likes)  
    setEditVideo(null)     
  }, [props.video])

  useEffect(() => {
    setDis(true)
    setLikeStatus(true)
  },[videoid])

  

  const insertCommentary = (comment) => {
    
    if (comment.parent) {
        const new_commentary = commentary.map(com => {             
            if (com.id === comment.parent) {                
                com.children.push(comment)  
                return com              
            } else {
                return com
            }
        })        
        setCommentary(new_commentary)        
    } else {
        const new_comment = [...commentary, comment]        
        setCommentary(new_comment)
    }} 

    const createSubscription = () => {        
        APIService.CreateSubscription({author: user_id['userid'], video: videoid, subscription: true}, token['mytoken'])
        .then(resp => setSubscription(subscription.push(resp)))
        setDis(false)
    }  
    
    const createLike = () => {        
        APIService.CreateLike({author: user_id['userid'], video: videoid, grade: 'like'}, token['mytoken'])
        .then(resp => setLike(like.push(resp)))
        setLikeStatus(false)
    }  
    const createDislike = () => {        
        APIService.CreateLike({author: user_id['userid'], video: videoid, grade: 'dislike'}, token['mytoken'])
        .then(resp => setLike(like.push(resp)))
        setLikeStatus(false)
    }  

    const deleteBtn = (video_id) => {
        APIService.DeleteVideo(video_id, token['mytoken'])  
        .then(() => props.deleteBtn(video_id))             
      } 

    const editBtn = (video) => {
        setEditVideo(video)       
    }

    
  return (
    <div className='container-fluid'>        
        <div className='row'>
            <div className='col'> 
                <div className='row'>
                    {ReactHtmlParser(content)} 
                </div>               
            </div>
            <div className='col'>                
                <div className='row'>
                    {ReactHtmlParser(description)}
                    
                </div>
                <div className='row'>
                {author === user_name['username'] | author === user_id['userid'] ?
                  <div className="btn-group" role="group" aria-label="edit-delete">
                    <button type="button" className="btn btn-success" onClick={() => editBtn({id:videoid, author: author, title: title, description: description, poster: poster, content: content})}>Update</button>
                    <button type="button" className="btn btn-danger" onClick={() => deleteBtn(videoid)}>Delete</button>                                                        
                  </div>: null
                  }
                </div>  
            </div>            
        </div> 
        {!editVideo ?
        <div>
        <div className='row'>        
            <div className='col'>          
                {
                subscription.length ? subscription.map(sub => {
                    return (
                        <div key={sub.id}>                        
                        {sub.video === videoid & sub.author === parseInt(user_id['userid'], 10) & sub.subscription ? 
                            <button type="button" className="btn btn-warning" disabled>Вы подписаны</button> : 
                            sub.video === videoid & sub.author === parseInt(user_id['userid'], 10) & !sub.subscription ?
                            <button type="button" className="btn btn-danger" disabled>Нужен апдейт</button> : dis ?
                            <button type="button" className="btn-success" onClick={createSubscription}>Подписаться?</button>:
                            <button type="button" className="btn-success" onClick={createSubscription} disabled>Подписаться?</button>
                        }
                    </div>

                    )
                }): <div> 
                    {dis ?
                    <button type="button" className="btn-success" onClick={createSubscription}>Подписаться?</button>:
                    <button type="button" className="btn-success" onClick={createSubscription} disabled>Подписаться?</button>
                        }
                    </div>
                } 
            </div> 
            <div className='col'>
                {
                    like.length ? like.map(lk => {
                        return (
                            <div className='row' key={lk.id}>
                                {
                                    lk.author === parseInt(user_id['userid'], 10) & lk.video === videoid & lk.grade !== 'without' ?
                                    <button type="button" className="btn btn-warning" disabled>Вы уже оценили видео - {lk.grade}</button>:
                                    lk.author === parseInt(user_id['userid'], 10) & lk.video === videoid & lk.grade === 'without' ?
                                    <button type="button" className="btn btn-danger" disabled>Нужен апдейт оценки - {lk.grade}</button>: likestatus ?
                                    <div className="btn-group" role="group" aria-label="likes">
                                        <button type="button" className="btn btn-light">Оцените</button>
                                        <button type="button" className="btn btn-primary" onClick={createLike}>Like</button>
                                        <button type="button" className="btn btn-danger" onClick={createDislike}>Dislike</button>                                        
                                    </div>:
                                    <div className="btn-group" role="group" aria-label="likes">
                                        <button type="button" className="btn btn-light" disabled>Оцените</button>
                                        <button type="button" className="btn btn-primary" disabled>Like</button>
                                        <button type="button" className="btn btn-danger" disabled>Dislike</button>                                        
                                    </div>
                                }
                            </div>
                        )
                    }): <div className='row'>
                            {
                                likestatus ?
                                <div className="btn-group" role="group" aria-label="likes">
                                    <button type="button" className="btn btn-light">Оцените</button>
                                    <button type="button" className="btn btn-primary" onClick={createLike}>Like</button>
                                    <button type="button" className="btn btn-danger" onClick={createDislike}>Dislike</button>                                        
                                </div>:
                                <div className="btn-group" role="group" aria-label="likes">
                                    <button type="button" className="btn btn-light" disabled>Оцените</button>
                                    <button type="button" className="btn btn-primary" disabled>Like</button>
                                    <button type="button" className="btn btn-danger" disabled>Dislike</button>                                        
                                </div>
                            }
                        </div>
                }
            </div>                       
        </div> 

        <CommentForm video_id={videoid} parent_id={parentid} parent_name={parentname} insertCommentary={insertCommentary}/>
        <div className='scrollcomment' data-bs-spy="scroll" data-bs-target="#commentary">
            <div id='#commentary'>
            {commentary ? commentary.map(comment => {
                    return (
                        
                        <div className='item_parent' key={comment.id}> 
                            
                            <button type="button" className="btn btn-link" onClick={() => {setParentId(comment.id);
                            setParentName(comment.name)
                            }}>                     
                                {comment.name}:{comment.content} 
                            </button>                         
                            {comment.children ? comment.children.map(child => {
                                return (
                                    <div className='item_child' key={child.id}>
                                    {child.name}:{child.content}                                    
                                    </div>)    
                            }) : null}
                        </div>
                    )
                }) : null}
            </div>
        </div>
        </div> : 
        <UpdateInsertForm video = {editVideo} updatedInformation = {props.updatedInformation}/>
        }
    </div>
    );
}

export default VideoForm;
