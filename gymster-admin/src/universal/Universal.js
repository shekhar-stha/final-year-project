import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import SelectionPage from './selection-page/SelectionPage'
import Unauthorized from './unauthorized/Unauthorized'

export default function Universal() {
    return (
        <Routes>
            <Route path="/" element={<SelectionPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    )
}

