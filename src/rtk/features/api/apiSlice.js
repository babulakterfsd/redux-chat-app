import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:9000`,
    prepareHeaders: async (headers, { getState, endpoint }) => {
        const token = getState()?.auth?.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        if (token && (endpoint === 'getMessages' || endpoint === 'getMoreMessages')) {
            headers.set('User-Email', getState()?.auth?.user?.email);
        }

        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            api.dispatch(userLoggedOut());
            localStorage.clear();
        }
        return result;
    },
    tagTypes: ['GetConversation'],
    endpoints: (builder) => ({}),
});
