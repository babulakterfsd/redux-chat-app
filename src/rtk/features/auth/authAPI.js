import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `/register`,
                method: 'POST',
                body: data,
            }),
            // get the register api result with the help of this function and we will store returned data both in localstorage and local redux store to keep the users session tracked.
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // queryfullfilled data ta return kore diye rakhbe result.data er moddhe
                    const result = await queryFulfilled;

                    // localstorage e data ta rakhtesi session user loggedin ache kina dekhar jonno
                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    // local redux store update kora hocche ekhane
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (error) {
                    // ekhane error handle korar dorkar nai karon ami jkhn UI te useRegisterMutation er maddhome register api e hit krbo, tkhn kono error ghotle oi hook e amake isError e bole dibe, tkhn ami oita dhorei just UI te dekhiye dibo. tai ekhane error handle er dorkar nai
                }
            },
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `/login`,
                method: 'POST',
                body: data,
            }),
            // register er moto same vaabe login holeo amake jinishgula track korte hobe, tai nicher function ta...
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // queryfullfilled data ta return kore diye rakhbe result.data er moddhe
                    const result = await queryFulfilled;

                    // localstorage e data ta rakhtesi session user loggedin ache kina dekhar jonno
                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    // local redux store update kora hocche ekhane
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (error) {
                    // ekhane error handle korar dorkar nai karon ami jkhn UI te useLoginMutation er maddhome login api e hit krbo, tkhn kono error ghotle oi hook e amake isError e bole dibe, tkhn ami oita dhorei just UI te dekhiye dibo. tai ekhane error handle er dorkar nai
                }
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
