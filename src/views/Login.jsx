/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import logoImage from '../assets/images/babulakterfsd_circle.png';
import Error from '../components/ui/Error';
import { useLoginMutation } from '../rtk/features/auth/authAPI';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [login, { data, isLoading, isSuccess, error: responseError }] = useLoginMutation();

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError?.data);
        }
        if (isSuccess) {
            setTimeout(() => {
                navigate('/inbox');
            }, 1000);
        }
    }, [data, responseError, navigate, isSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        login({
            email,
            password,
        });
    };

    return (
        <div className="grid place-items-center h-screen bg-[#F9FAFB">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="flex justify-center flex-col items-center">
                        <Link to="/" className="flex gap-x-3 items-center">
                            <img className="h-10" src={logoImage} alt="Learn with Sumit" />
                            <span className=" font-semibold text-sm text-indigo-300">
                                আওয়াল <br /> <span className="text-[12px]">এর </span> আড্ডাঘর
                            </span>
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <span>Are you a new user? &nbsp; </span>
                                <Link
                                    to="/register"
                                    className="font-medium text-violet-600 hover:text-violet-500"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                disabled={isLoading}
                            >
                                Sign in
                            </button>
                        </div>

                        {error && <Error message={error} />}
                    </form>
                </div>
            </div>
        </div>
    );
}
