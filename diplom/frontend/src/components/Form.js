import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import APIService from '../APIService';

function Form(props) {
  const [author, setAuthor] = useState('')  
  const [title, setTitle] = useState('') 
  const [description, setDescription] = useState('')  
  const [token] = useCookies(['mytoken'])

  useEffect(() => {
      setAuthor(props.video.author)
      setTitle(props.video.title)
      setDescription(props.video.description)
  }, [props.video])
  
  const updateVideo = () => {
    APIService.UpdateVideo(props.video.id, {author, title, description}, token['mytoken'])
    .then(resp => props.updatedInformation(resp))
  }

  const insertVideo = () => {
    APIService.InsertVideo({author:1, title, description}, token['mytoken'])
    .then(resp => props.insertedInformation(resp))
  }

  return (
  <div>
      {props.video ? (
          <div className='mb-3'>
              <label htmlFor='title' className='form-label'>Title</label>
              <input type='text' className='form-control' id='title' placeholder='enter the title'
              value={title} onChange={e => setTitle(e.target.value)}/> 
              <label htmlFor='description' className='form-label'>Description</label>  
              <textarea type='text' className='form-control' id='description' rows='5' 
              placeholder='enter the description'
              value={description} onChange={e => setDescription(e.target.value)}/>
              <br/>

              {
                props.video.id ? 
                <button onClick={updateVideo} className='btn btn-success'>Update</button>
                : <button onClick={insertVideo} className='btn btn-success'>Insert</button>
              }

                
          </div>  
      ) : null}
  </div>
  );
}

export default Form;
