import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AllRoutes;
