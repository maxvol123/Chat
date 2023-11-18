import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom"
import { privateRoutes, publicRoutes } from '../router';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/const';
const Approuter = () => {
    const isLogin = false
    return isLogin ? 
    (
        <Routes>
            {privateRoutes.map(({path, Component})=>
                <Route path={path} element={<Component/>}/>
            )}
            <Navigate to={CHAT_ROUTE}/>
        </Routes>
    )
    :
    (
        <Routes>
           {publicRoutes.map(({path, Component})=>
                <Route path={path} element={<Component/>}/>
            )}
            <Navigate to={LOGIN_ROUTE}/>
        </Routes>
    )
};

export default Approuter;