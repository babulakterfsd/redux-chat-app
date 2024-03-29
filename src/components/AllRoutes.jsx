import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuthCheck from '../hooks/useAuthCheck';
import Conversation from '../views/Conversation';
import Home from '../views/Home';
import Inbox from '../views/Inbox';
import NotFound from '../views/NotFound';
import Register from '../views/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function AllRoutes() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div>Checking Authentication...</div>
    ) : (
        <Routes>
            <Route
                path="/"
                element={
                    <PublicRoute>
                        <Home />
                    </PublicRoute>
                }
            />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />
            <Route
                path="/inbox"
                element={
                    <PrivateRoute>
                        <Conversation />
                    </PrivateRoute>
                }
            />
            <Route
                path="/inbox/:id"
                element={
                    <PrivateRoute>
                        <Inbox />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AllRoutes;
