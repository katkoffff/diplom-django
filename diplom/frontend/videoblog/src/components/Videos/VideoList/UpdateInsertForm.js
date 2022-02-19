import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import APIService from 'APIService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export function UpdateInsertForm(props) {  
  const [author, setAuthor] = useState('')  
  const [title, setTitle] = useState('') 
  const [description, setDescription] = useState('') 
  const [poster, setPoster] = useState(null)
  const [content, setContent] = useState(null) 
  const [token] = useCookies(['mytoken'])
  const [user_id] = useCookies(['userid'])
  
  useEffect(() => {
      setAuthor(props.video.author)
      setTitle(props.video.title)
      setDescription(props.video.description)
      setPoster(props.video.poster)
      setContent(props.video.content)         
  }, [props.video])
  
  const updateVideo = () => {    
    APIService.UpdateVideo((props.video.id), {author:user_id['userid'], title:title, description:description.toString(), poster:poster.toString(), content:content.toString()}, token['mytoken'])
    .then(resp => props.updatedInformation(resp))    
    
  }

  const insertVideo = () => {
    APIService.InsertVideo({author:user_id['userid'], title:title, description:description.toString(), poster:poster.toString(), content:content.toString()}, token['mytoken'])
    .then(resp => props.insertedInformation(resp))
  }

  return (
  <div>
      {props.video ? (
          <div className='mb-3' >
              <label htmlFor='title' className='form-label'>Title</label>
              <input type='text' className='form-control' id='title' placeholder='enter the title'
              value={title} onChange={e => setTitle(e.target.value)}/>
              <label htmlFor='description' className='form-label'>Description</label> 

              
              <CKEditor                                        
                    id='description'   
                               
                    editor={ClassicEditor}                    
                    data={description}
                    onReady={ editor => {                      
                      console.log( 'Editor is ready to use!', editor );                      
                    } }                     
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        return data ? setDescription(data) : null;
                    } }
                    
                /> 
                         
              <label htmlFor='poster' className='form-label'>Poster</label>  
              <CKEditor                     
                    id='poster'               
                    editor={ClassicEditor}
                    data={poster}
                    onReady={ editor => {                      
                      console.log( 'Editor is ready to use!', editor );                      
                    } }                    
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();                         
                        return data ? setPoster(data) : null                      
                        
                    } }
                    
                /> 
              <label htmlFor='content' className='form-label'>Content</label>  
              <CKEditor                     
                    id='content'               
                    editor={ClassicEditor}
                    
                    data={content} 
                    onReady={ editor => {                      
                      console.log( 'Editor is ready to use!', editor );                      
                    } }  
                                     
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();                        
                        return data ? setContent(data) : null;
                        
                    } }
                    onError={ ( event, editor ) => {
                      const data = editor.getData();
                      console.log( 'Error.', data );
                  } }
                    
                />
              
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


