import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import './Login.css'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [user_id, setUserId] = useCookies(['userid'])
    const [user_name, setUserName] = useCookies(['username'])
    const [isLogin, setLogin] = useState(true)
    let history = useHistory()

    useEffect(() => {
        if (token['mytoken']) {            
            history.push('/videos')
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
    
    <div className='container Login'>
        <div className='row' >
            <div className='form-group'>
                {isLogin ? <h1>Login</h1> : <h1>Register</h1>}            
            </div>
            <br/>
            <br/>
            <div className='form-group'>
                <label htmlFor='username' className='form-label'>Username</label>
                <input type='text' className='form-control' id='username' placeholder='enter your username' value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <br/>
            <br/>
            <div className='form-group'>
                <label htmlFor='password' className='form-label'>Password</label>
                {isLogin ?
                        <input type='current-password' className='form-control' id='password' placeholder='enter your password' value={password} onChange={e => setPassword(e.target.value)}/>
                        :
                        <input type='new-password' className='form-control' id='password' placeholder='enter your password' value={password} onChange={e => setPassword(e.target.value)}/>
                }
            </div>
            <br/>
            <br/>
            <div className='form-group'>
                {isLogin ? <button onClick={loginBtn} className='btn btn-primary'>Login</button>
                : <button onClick={registerBtn} className='btn btn-primary'>Register</button>
                }
            </div>
            <br/>
            <br/>
            <div className='form-group'>                
                {isLogin ? <h5>If you don't account, please
                    <button className='btn btn-primary' onClick={() => setLogin(false)}>
                        Register
                    </button>
                    
                here</h5> : <h5>or<button className='btn btn-primary' onClick={() => setLogin(true)}>
                        Login
                    </button>here</h5>}
            </div>
        </div>
    </div>
           
    
  );
}

export default Login;
