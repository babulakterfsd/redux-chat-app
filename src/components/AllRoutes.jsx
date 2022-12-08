import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Add from '../views/Add';
import Edit from '../views/Edit';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import Video from '../views/Video';
import Footer from './Footer';
import Navigation from './Navigation';

function AllRoutes() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/videos/:videoId" element={<Video />} />
                <Route path="/videos/add" element={<Add />} />
                <Route path="/videos/edit/:videoId" element={<Edit />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default AllRoutes;
