/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useGetVideosQuery } from '../../rtk/features/api/apiSlice';
import Error from '../ui/Error';
import VideoLoader from '../ui/loaders/VideoLoader';
import VideoCard from './VideoCard';

export default function Videos() {
    const [request, setRequest] = useState(false);
    const {
        data: videos,
        isLoading,
        isError,
        refetch,
    } = useGetVideosQuery(undefined, {
        skip: !request,
        // pollingInterval: 10000,
        //  eta miliseconds e dite hoy, polling interval default e 0 thake, but ekhane milisecond deya thakle oi somoy por por automatic refetch hote thakbe .. eka ekai oi time por por request kre data update korte thakbe.. awesome.. mojar bepar hocche, oi page e na thakle taile ar request korte thakbe na, abar jkhn oi page e ashbo browse korte korte , tkhn theke abar request korte thakbe
    });
    // refetch ekta function, etar maddhome manually refetch kora jay. niche ekta button click e example dekhiye comment kore rekhechi

    useEffect(() => {
        setRequest(true);
    }, []);

    /* skip: true, skip true use kora hoy jodi ami aumatic fetch na cheye manually fetch korte chai sekhetre, default vabe false thake. rtkQuery er default behave hocche automatic fetch kora, kintu ami jodi manually fetch korte chai tahole uporer moto amake ekta state niye useEffect er maddhome evabe korte hobe. ekhane prothom e request false, tai !request peye se skip kore jabe, kintu didMount houar por useEffect jkhn request ke true kore dibe, tkhn skip: !request pabe false, tkhn se ashole request ta korbe  */

    // decide what to render
    let content = null;

    if (isLoading) {
        content = (
            <>
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
            </>
        );
    }

    if (!isLoading && isError) {
        content = <Error message="There was an error while fetching" />;
    }

    if (!isLoading && !isError && videos?.length === 0) {
        content = <Error message="No videos found!" />;
    }

    if (!isLoading && !isError && videos?.length > 0) {
        content = videos.map((video) => <VideoCard key={video.id} video={video} />);
    }

    return (
        <>
            {/* <button
                onClick={refetch}
                type="button"
                className="bg-slate-300 text-slate-600 p-1 rounded-md"
            >
                Refetch
            </button> */}
            {content}
        </>
    );
}
