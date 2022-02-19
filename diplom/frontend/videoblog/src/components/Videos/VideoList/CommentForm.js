import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import APIService from 'APIService';

export function CommentForm(props) {
    const [token] = useCookies(['mytoken'])
    const [user_id] = useCookies(['userid'])
    const [user_name] = useCookies(['username'])
    const [videoid, setVideoId] = useState('') 
    const [parentid, setParentId] = useState(null)
    const [newcomment, setNewComment] = useState('')
    const [parentname, setParentName] = useState(null)    

    useEffect(() => {
        setVideoId(props.video_id)
        setParentId(props.parent_id)
        setParentName(props.parent_name)
      }, [props.video_id, props.parent_id])

    const createComment = () => {
    APIService.CreateCommentary({name:user_id['userid'], video:videoid, content:newcomment, parent:parentid}, token['mytoken'])
    .then(resp => props.insertCommentary({id:resp.id,name:user_name['username'],video:resp.video,content:resp.content,parent:resp.parent}));
    setParentId(null)    
    }

  return (
    <div className="row">
        <div className='mb-3' >
            <label htmlFor='comment' className='form-label'>{parentid ? `Комментарий к комментарию:  ${parentname}` : 'Комментарий к фильму'}</label>
            <input type='text' className='form-control' rows='5' id='comment' placeholder='enter the comment'
            value={newcomment} onChange={e => {setNewComment(e.target.value)}}/>
            <br/>    
            <button className='btn btn-success' onClick={createComment}>Create</button>    
        </div>    
    </div>
  );
}


