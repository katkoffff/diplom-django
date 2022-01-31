
export default class APIService {
    static UpdateVideo(video_id, body, token) {
        return fetch(`http://127.0.0.1:8000/api/videos/${video_id}/`, {
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
        return fetch('http://127.0.0.1:8000/api/videos/', {
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
        return fetch(`http://127.0.0.1:8000/api/videos/${video_id}/`, {
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
}