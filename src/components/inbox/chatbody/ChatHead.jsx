import gravatarUrl from 'gravatar-url';
import { useSelector } from 'react-redux';

export default function ChatHead({ headInfo }) {
    const { sender, receiver } = headInfo;
    const { user } = useSelector((state) => state.auth || {});
    const { email } = user || {};

    const getPartner = () => {
        let partner = {};
        if (sender?.email === email) {
            partner = receiver;
        } else {
            partner = sender;
        }
        return partner;
    };

    const partner = getPartner();

    return (
        <div className="relative flex items-center p-3 border-b border-gray-300">
            <img
                className="object-cover w-10 h-10 rounded-full"
                src={gravatarUrl(partner.email)}
                alt={partner?.name}
            />
            <span className="block ml-2 font-bold text-gray-600">{partner?.name}</span>
        </div>
    );
}
