import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'

import { PrivateRoutes } from './PrivateRoutes'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route
                    path='/home'
                    element={<PrivateRoutes>
                        <Home />
                    </PrivateRoutes>} />
            </Routes>
        </BrowserRouter>
    )
}