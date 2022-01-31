import React from "react";
import ReactDom from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import {CookiesProvider} from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import Login from "./components/Login";

function Router() {
    return(
        <CookiesProvider>
        <BrowserRouter>
            
            <Route exact path = "/" component = {Login} />
            <Route exact path = "/videos" component = {App} />
            
        </BrowserRouter>
        </CookiesProvider>
    )
}

ReactDom.render(
    <React.StrictMode>
        <Router/>
    </React.StrictMode>,
 document.getElementById("root"));