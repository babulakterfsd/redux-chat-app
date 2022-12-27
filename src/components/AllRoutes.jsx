import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuthCheck from '../hooks/useAuthCheck';
import Conversation from '../views/Conversation';
import Home from '../views/Home';
import Inbox from '../views/Inbox';
import NotFound from '../views/NotFound';
import Register from '../views/Register';

function AllRoutes() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div>Checking Authentication...</div>
    ) : (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inbox" element={<Conversation />} />
            <Route path="/inbox/:id" element={<Inbox />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AllRoutes;
