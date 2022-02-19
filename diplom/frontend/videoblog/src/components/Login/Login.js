import React, { useState, useEffect } from 'react';
import APIService from 'APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'


export function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [user_id, setUserId] = useCookies(['userid'])
    const [user_name, setUserName] = useCookies(['username'])
    const [isLogin, setLogin] = useState(true)
    let navigate = useNavigate()

    useEffect(() => {
        if (token['mytoken']) {            
          navigate('/videos')
        }
    }, [token])

    const loginBtn = () => {
        APIService.LoginUser({username, password})             
        .then(resp => {setToken('mytoken', resp.token);
                       setUserId('userid', resp.user_id);
                       setUserName('username', resp.user_name);
                       (console.log(token, user_id))})                               
        .catch(error => console.log(error))
    }

    const registerBtn = () => {
        APIService.RegisterUser({username, password})
        .then(() => loginBtn())
        .catch(error => console.log(error))
    }

  return (
    <Form className='mt-5' style={{ maxWidth: '50%', margin: '0 auto' }}>
      <Form.Group>
        <Form.Label>{isLogin ? <h1>Login</h1> : <h1>Register</h1>}</Form.Label>        
      </Form.Group>  
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder='enter your username' value={username} onChange={e => setUsername(e.target.value)}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        {isLogin ?
            <Form.Control placeholder='enter your password' value={password} onChange={e => setPassword(e.target.value)}/>
            :
            <Form.Control placeholder='enter your password' value={password} onChange={e => setPassword(e.target.value)}/>
        }
      </Form.Group>
      {isLogin ? 
        <Button variant='success' onClick={loginBtn} >Login</Button>
        : 
        <Button variant='success' onClick={registerBtn} >Register</Button>
      }
      {isLogin ?
        <h5>If you don't account, please
            <Button variant='primary' onClick={() => setLogin(false)}>
                Register
            </Button>            
        here</h5> 
        :
        <h5>or
            <Button variant='primary' onClick={() => setLogin(true)}>
            Login
            </Button>here</h5>
        }
    </Form>
  );
}

