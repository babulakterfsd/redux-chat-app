/* eslint-disable no-alert */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEditVideoMutation } from '../../rtk/features/api/apiSlice';
import TextArea from '../ui/TextArea';
import TextInput from '../ui/TextInput';

export default function Form({ video }) {
    const {
        id,
        title: iTitle,
        author: iAuthor,
        description: iDescription,
        link: iLink,
        thumbnail: iThumbnail,
        date: iDate,
        duration: iDuration,
        views: iViews,
    } = video; // rename kore niyechi jaate submit korar somoy conflict na hoy

    const [editVideo, { isLoading, isError, isSuccess }] = useEditVideoMutation({});

    const [title, setTitle] = useState(iTitle);
    const [author, setAuthor] = useState(iAuthor);
    const [description, setDescription] = useState(iDescription);
    const [link, setLink] = useState(iLink);
    const [thumbnail, setThumbnail] = useState(iThumbnail);
    const [date, setDate] = useState(iDate);
    const [duration, setDuration] = useState(iDuration);
    const [views, setViews] = useState(iViews);

    const data = {
        title,
        author,
        description,
        link,
        thumbnail,
        date,
        duration,
        views,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editVideo({ id, data });
    };

    const navigate = useNavigate();

    if (isSuccess) {
        toast.success('Video updated successfully!', {
            toastId: 'success1',
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }
    if (isError) {
        toast.error('Something is wrong', {
            toastId: 'error1',
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <TextInput
                                    title="Video Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <TextInput
                                    title="Author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-6">
                                <TextArea
                                    title="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-6">
                                <TextInput
                                    title="YouTube Video link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-6">
                                <TextInput
                                    title="Thumbnail link"
                                    value={thumbnail}
                                    onChange={(e) => setThumbnail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                <TextInput
                                    title="Upload Date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <TextInput
                                    title="Video Duration"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <TextInput
                                    title="Video no of views"
                                    value={views}
                                    onChange={(e) => setViews(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}
