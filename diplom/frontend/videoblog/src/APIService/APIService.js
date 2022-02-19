
export default class APIService {

    static GetVideoList(token) {
        return fetch('http://127.0.0.1:8000/api/videos/', {
            'method': 'GET',
            headers: {
                'Content-Type':'multipart/form-data',
                'Authorization':`Token ${token}`
            },            
        })
        .then(resp => resp.json())        
    }

    static UpdateVideo(video_id, body, token) {
        return fetch(`http://127.0.0.1:8000/api/videos_detail/${video_id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())        
    }

    static InsertVideo(body, token) {
        return fetch('http://127.0.0.1:8000/api/videos_create/', {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())        
    }

    static DeleteVideo(video_id, token) {
        return fetch(`http://127.0.0.1:8000/api/videos_detail/${video_id}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
             
    }

    static LoginUser(body) {
        return fetch('http://127.0.0.1:8000/auth/', {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json',                
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())        
    }

    static RegisterUser(body) {
        return fetch('http://127.0.0.1:8000/api/users/', {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json',                
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())        
    }

    static UserInfo(token) {
        return fetch('http://127.0.0.1:8000/auth/users/me/', {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },            
        })
        .then(resp => resp.json())        
    }

    static CreateCommentary(body, token) {
        return fetch('http://127.0.0.1:8000/api/commentary/', {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())        
    }

    static CreateSubscription(body, token) {
        return fetch('http://127.0.0.1:8000/api/subscription/', {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())        
    }

    static CreateLike(body, token) {
        return fetch('http://127.0.0.1:8000/api/like/', {
            'method': 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())        
    }
}