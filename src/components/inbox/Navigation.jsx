/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/babulakterfsd_circle.png';
import { userLoggedOut } from '../../rtk/features/auth/authSlice';

export default function Navigation() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth || {});
    const { name } = user || {};

    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.removeItem('auth');
    };

    return (
        <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex gap-x-3 items-center">
                        <img className="h-10" src={logoImage} alt="Learn with Sumit" />
                        <span className="text-white font-semibold text-sm">
                            আওয়াল <br /> <span className="text-[12px]">এর </span> আড্ডাঘর
                        </span>
                    </Link>
                    <div className="flex gap-x-4 justify-center items-center">
                        <span className="text-white font-semibold text-sm">{`You're logged in as ${name}`}</span>
                    </div>
                    <ul>
                        <li className="text-red-400 font-semibold p-1 rounded-md">
                            <span className="cursor-pointer" onClick={logout}>
                                Logout
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
