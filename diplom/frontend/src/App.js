import React from "react";
import ReactDom from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import {CookiesProvider} from 'react-cookie';
import Login from "./components/Login";
import VideoList from "./components/VideoList";
import Chat from "./components/Chat"



function App() {

    return (
        <CookiesProvider>
            <BrowserRouter>
            
            <Route exact path = "/" component = {Login} />            
            <Route exact path = "/videos" component = {VideoList} />
            <Route exact path = "/chats" component = {Chat} />

            </BrowserRouter>
        </CookiesProvider>
    )
}

export default App;