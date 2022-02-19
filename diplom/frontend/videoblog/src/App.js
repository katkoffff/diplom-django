import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// styles
import { Container } from 'react-bootstrap'
// components
import { Login, Videos, Home, ChatRoom } from 'components'

const routes = [
  { path: '/login', name: 'Login', Component: Login },
  { path: '/videos', name: 'Videos', Component: Videos},
  { path: '/', name: 'Home', Component: Home },
  { path: '/:roomId', name: 'ChatRoom', Component: ChatRoom }
]

export const App = () => (
  <Router>
    <Container style={{ maxWidth: '100%' }}>
      <h1 className='mt-2 text-center'>React VideoBlog</h1>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>  
        <Route path="videos" element={<Videos />}>
          {/*<Route path="video" element={<VideoDetail />} />*/}
        </Route>  
        <Route path="chat" element={<Home />} />
        <Route path=":roomID" element={<ChatRoom />} />
        
        
      </Routes>
    </Container>
  </Router>
)

