/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatBody from '../components/inbox/chatbody/ChatBody';
import Navigation from '../components/inbox/Navigation';
import Sidebar from '../components/inbox/Sidebar';
import { useGetConversationsQuery } from '../rtk/features/conversations/conversationsAPI';
import NotFound from './NotFound';

export default function Inbox() {
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth || {});
    const { email: loggedInUserEmail } = user || {};
    const { data, isLoading } = useGetConversationsQuery(loggedInUserEmail) || {};
    const { data: conversations } = data || {};

    useEffect(() => {
        const isIdMatched = conversations?.find((conv) => conv.id == id);
        if (isIdMatched === undefined) {
            setRedirect(true);
        } else if (isIdMatched.id) {
            setRedirect(false);
        }
    }, [id, conversations]);

    if (isLoading) {
        return (
            <div>
                <Navigation />
                <div className="max-w-7xl mx-auto -mt-1">
                    <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
                        <Sidebar />
                        <ChatBody />
                    </div>
                </div>
            </div>
        );
    }

    if (redirect) {
        return <NotFound />;
    }
    return (
        <div>
            <Navigation />
            <div className="max-w-7xl mx-auto -mt-1">
                <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
                    <Sidebar />
                    <ChatBody />
                </div>
            </div>
        </div>
    );
}
