import React, { useState, useEffect, useRef } from 'react';
import APIService from 'APIService';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormControl, Button, Container, Navbar, Card, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import { VideoForm } from './VideoForm';
import { UpdateInsertForm } from './UpdateInsertForm';

export function VideoList() {
  const [videos, setVideos] = useState([])  
  const [viewVideo, setViewVideo] = useState(null)
  const [insertVideo, setInsertVideo] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  const [user_id, setUserId, removeUserId] = useCookies(['userid'])
  const [user_name, setUserName, removeUserName] = useCookies(['username'])
  let navigate = useNavigate() 
  
  useEffect (() => {
    APIService.GetVideoList(token['mytoken']) 
        .then(resp => {setVideos(resp)})        
        .catch(error => console.log(error))
  }, [viewVideo, insertVideo])

  useEffect(() => {
    if (!token['mytoken']) {
      navigate('/')
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
    removeUserId(['userid'])
    removeUserName(['username'])
  }

  const viewBtn = (video) => {
    setViewVideo(video);
    setInsertVideo(null)        
  } 

  return (
    <Container fluid>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
            <Form className="d-flex">
              <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Button variant="success" onClick={videoForm}>Create Video</Button>
            <Button variant="primary" as={Link} to={'/chat'}>Go ChatRoom</Button>
            <Button variant="danger" onClick={logoutBtn}>LOGOUT</Button>
        </Container>
      </Navbar>
      
      <Row xs={2} md={2} lg={2} className="g-4" >
        <Col>VideoList
        {videos && videos.map((video, idx) => (
            <Card key={idx}>
              <Button variant="link" onClick={() => viewBtn(video)}><i dangerouslySetInnerHTML={ {__html:  video.poster}} /></Button> 
              <Card.Body>
                <Card.Title>{parse(video.title)}</Card.Title>
                <Card.Text>
                  <span dangerouslySetInnerHTML={ {__html:  video.description}} />
                </Card.Text>
              </Card.Body>
            </Card>))}
        </Col> 
        <Col>
        {insertVideo ?  <UpdateInsertForm video = {insertVideo} insertedInformation = {insertedInformation}/> :
         viewVideo ? <VideoForm video = {viewVideo} deleteBtn = {deleteBtn} updatedInformation = {updatedInformation}/> : null} 
        </Col>   
      </Row>
      
    </Container>
    
  )
}

