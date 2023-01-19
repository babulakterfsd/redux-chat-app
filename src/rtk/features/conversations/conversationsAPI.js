/* eslint-disable eqeqeq */
import io from 'socket.io-client';
import { apiSlice } from '../api/apiSlice';
import { messagesApi } from '../messages/messagesAPI';

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) =>
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=5`,

            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                // create socket
                const socket = io('http://localhost:9000', {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttempts: 10,
                    transports: ['websocket'],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });
                try {
                    await cacheDataLoaded;
                    socket.on('conversation', (data) => {
                        updateCachedData((draft) => {
                            const conversation = draft.find((c) => c.id == data?.data?.id);
                            if (conversation.id) {
                                // jodi draft e data khuje paay
                                conversation.message = data?.data?.message;
                                conversation.timestamp = data?.data?.timestamp;
                            } else {
                                // jodi draft e server theke asha data khuje na paay
                            }
                        });
                    });
                } catch (error) {
                    // ami jodi onno component e jai, tahole to socket connection ta khule rakhar dorkar nai. tkhn dorkar hoy cacheEntryRemoved er
                    await cacheEntryRemoved;
                    socket.close();
                }
            },
        }),
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) =>
                `/conversations?participants_like=${userEmail}-${participantEmail}&participants_like=${participantEmail}-${userEmail}`,
        }),
        addConversation: builder.mutation({
            query: ({ sender, data }) => ({
                url: '/conversations',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const patchResultTwo = dispatch(
                    apiSlice.util.updateQueryData('getConversations', arg.sender, (draft) => {
                        draft.push(arg.data);
                    })
                );

                try {
                    const conversation = await queryFulfilled;
                    if (conversation?.data?.id) {
                        const { sender, data } = arg;
                        const { users, message } = data;
                        const senderUser = users.find((user) => user.email === sender);
                        const receiverUser = users.find((user) => user.email !== sender);
                        dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation?.data?.id,
                                sender: senderUser,
                                receiver: receiverUser,
                                message,
                                timestamp: data.timestamp,
                            })
                        );
                    }
                } catch (error) {
                    patchResultTwo.undo();
                }
            },
        }),
        editConversation: builder.mutation({
            query: ({ id, sender, data }) => ({
                url: `/conversations/${id}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update starts for updating conversation
                // ei function ta immer use kore. ekhane amra DB te update korar aagei local cache ta ke update kore feltesi better user experience er jonno. sumit vai er course er 10.8 video. kheyal korar bishoy hocche, ei dispatch call ta kintu async na. eta ekta action creator, thunk na. patchresultOne ekhane local cache ta ke update kore fello. tarpor try block er moddhe message ta db te entry dite jabe, success hole to holoi.. db o updated, local cache o updated.. r jodi kono karone fail hoy db update, tahole catch block e shei error ta dhore niye patchResultOne.undo() call kore patchResultOne er local update ta ke undo kore felbe. r db to update e hoy nai
                const patchResultOne = dispatch(
                    // ei dispatch ta variable e rakhar karon hocche eta response ashar aagei call kore dicchi. tai response jodi error ashe, tahole jaate nicher catch block e ei variable er undo call kore local update ta undo kora jay. jehetu db te update hoy nai, so local er update to undo kortei hobe.
                    apiSlice.util.updateQueryData('getConversations', arg.sender, (draft) => {
                        const draftConversation = draft.find((conv) => conv.id == arg.id); // draft data is saved as string in the browser cache like localstorage.. and arg.id is number here .. thats why um checking with == here, not ===
                        draftConversation.message = arg.data.message;
                        draftConversation.timestamp = arg.data.timestamp;
                    })
                );
                // optimistic cache update ends for updating conversation

                // conversation edit korar sathei amra nicher function diye silently message tao update kore felbo. amra chaile component er vitore useQuery ba muatation hook use kore state diye skip er maddhomeo kaj ta korte partam, kintu ekhane different ekta way dekhano holo j hooks to sudhu top level e use kora jaay component er moddhe, kintu kothao jodi evabe use korte hoy tkhn ki kora jabe ! tkhn eivabe dispatch call koreo kono ekta api e hit kora jabe. eta jodi kono component e kortam, tahole hoyto, amar dharona editConversation er isSuccess paile, setake diye state update kore diye addMessage er query er skip ta false kora lagto useEffect diye
                try {
                    const conversation = await queryFulfilled;
                    if (conversation?.data?.id) {
                        const { sender, data } = arg;
                        const { users, message } = data;
                        const senderUser = users.find((user) => user.email === sender);
                        const receiverUser = users.find((user) => user.email !== sender);
                        const res = await dispatch(
                            // ei dispatch db te message ke sliently entry koray
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation?.data?.id,
                                sender: senderUser,
                                receiver: receiverUser,
                                message,
                                timestamp: data.timestamp,
                            })
                        ).unwrap();

                        // update messages cache pessimistically starts for updating message locally
                        dispatch(
                            // ei dispatch instant user ke update message ta dekhabe.ei dispatch ta variable e rakhar dorkar nai, karon eta ami uporer dispatch call kore response ta res variable e joma kortesi. orthat ei dispatch ta call kora hocche response ashar pore, tai eta ke ar variable e rakhte hocche na
                            apiSlice.util.updateQueryData(
                                'getMessages',
                                res.conversationId.toString(), // jehetu cache e shob string hishebe thake, tai id ta string kore dite holo. uporer taay email dite hoiche, ja ekti string. tai notun kore kora lage nai
                                (draft) => {
                                    draft.push(res);
                                }
                            )
                        );
                        // update messages cache pessimistically ends for updating message
                    }
                } catch (err) {
                    patchResultOne.undo();
                }
            },
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationQuery,
    useAddConversationMutation,
    useEditConversationMutation,
} = conversationsApi;
