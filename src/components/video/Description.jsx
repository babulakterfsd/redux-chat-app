/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import deleteImage from '../../assets/images/delete.svg';
import editImage from '../../assets/images/edit.svg';
import { useDeleteVideoMutation } from '../../rtk/features/api/apiSlice';

export default function Description({ video }) {
    const { id, title, description, date } = video;
    const [deleteVideo, { isSuccess, isError }] = useDeleteVideoMutation();
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteVideo(id);
    };

    if (isSuccess) {
        toast.success('Video Deleted successfully!', {
            toastId: 'success1',
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        setTimeout(() => {
            navigate('/');
        }, 1500);
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
        <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-800">{title}</h1>
            <div className="pb-4 flex items-center space-between border-b gap-4">
                <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
                    Uploaded on {date}
                </h2>

                <div className="flex gap-6 w-full justify-end">
                    <div className="flex gap-1">
                        <Link to={`/videos/edit/${id}`}>
                            <div className="shrink-0">
                                <img className="w-5 block" src={editImage} alt="Edit" />
                            </div>
                        </Link>
                        <Link to={`/videos/edit/${id}`}>
                            <span className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                                Edit
                            </span>
                        </Link>
                    </div>

                    <div className="flex gap-1">
                        <div className="shrink-0 cursor-pointer" onClick={() => handleDelete(id)}>
                            <img className="w-5 block" src={deleteImage} alt="Delete" />
                        </div>
                        <div
                            className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer"
                            onClick={() => handleDelete(id)}
                        >
                            Delete
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">{description}</div>
            <ToastContainer />
        </div>
    );
}
