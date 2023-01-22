import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:9000`,
        // baseUrl: process.env.REACT_APP_API,
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const token = getState()?.auth?.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            if (token && endpoint === 'getMessages') {
                headers.set('User-Email', getState()?.auth?.user?.email);
            }
            return headers;
        },
    }),
    tagTypes: [],
    endpoints: (builder) => ({
        // endpoints
    }),
});
