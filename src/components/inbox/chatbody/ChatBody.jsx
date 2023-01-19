// import Blank from "./Blank";
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery } from '../../../rtk/features/messages/messagesAPI';
import Error from '../../ui/Error';
import ChatHead from './ChatHead';
import Messages from './Messages';
import Options from './Options';

export default function ChatBody() {
    const { id } = useParams();
    const { data: messages, isLoading, isError, error } = useGetMessagesQuery(id);

    // decide what to render
    let content = null;

    if (isLoading) {
        content = <div>Loading...</div>;
    }

    if (!isLoading && isError) {
        content = (
            <div>
                <Error message={error?.data} />
            </div>
        );
    }

    if (!isLoading && !isError && messages?.length === 0) {
        content = (
            <div className="flex justify-center items-center min-h-screen">No Messages Found !</div>
        );
    }

    if (!isLoading && !isError && messages?.length > 0) {
        content = (
            <>
                <ChatHead headInfo={messages[0]} />
                <Messages messages={messages} />
                <Options usersInfoInMessage={messages[0]} />
            </>
        );
    }

    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                {content}
                {/* <Blank /> */}
            </div>
        </div>
    );
}
