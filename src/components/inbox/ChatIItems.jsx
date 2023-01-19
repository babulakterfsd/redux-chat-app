import gravatarUrl from 'gravatar-url';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetConversationsQuery } from '../../rtk/features/conversations/conversationsAPI';
import getPartnerInfo from '../../utils/getPartnerInfo';
import Error from '../ui/Error';
import ChatItem from './ChatItem';

export default function ChatItems() {
    const { user } = useSelector((state) => state.auth || {});
    const { email } = user || {};
    const { data: conversations, isLoading, isError, error } = useGetConversationsQuery(email);

    // decide what to render
    let content = null;

    if (isLoading) {
        content = <li className="m-2 text-center">Loading..</li>;
    }

    if (!isLoading && isError) {
        content = (
            <li className="m-2 text-center">
                <Error message={error?.data} />{' '}
            </li>
        );
    }

    if (!isLoading && !isError && conversations?.length === 0) {
        content = <li className="m-2 text-center">No Coversations Found !</li>;
    }

    if (!isLoading && !isError && conversations?.length > 0) {
        content = conversations.map((conversation) => {
            const { id, message, timestamp, users } = conversation;
            const partner = getPartnerInfo(users, email);
            return (
                <li key={id !== undefined ? id : Math.random() * 999}>
                    <Link to={`/inbox/${id}`}>
                        <ChatItem
                            avatar={gravatarUrl(partner.email, {
                                size: 80,
                            })}
                            name={partner?.name}
                            lastMessage={message}
                            lastTime={moment(timestamp).fromNow()}
                        />
                    </Link>
                </li>
            );
        });
    }

    return <ul>{content}</ul>;
}
