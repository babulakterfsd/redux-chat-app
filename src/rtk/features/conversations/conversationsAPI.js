/* eslint-disable eqeqeq */
import { apiSlice } from '../api/apiSlice';
import { messagesApi } from '../messages/messagesAPI';

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) =>
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=5`,
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
            },
        }),
        editConversation: builder.mutation({
            query: ({ id, sender, data }) => ({
                url: `/conversations/${id}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update starts, ei function ta immer use kore. ekhane amra DB te update korar aagei local cache ta ke update kore feltesi better user experience er jonno. sumit vai er course er 10.8 video. kheyal korar bishoy hocche, ei dispatch call ta kintu async na. eta ekta action creator, thunk na. patchresultOne ekhane local cache ta ke update kore fello. tarpor try block er moddhe message ta db te entry dite jabe, success hole to holoi.. db o updated, local cache o updated.. r jodi kono karone fail hoy db update, tahole catch block e shei error ta dhore niye patchResultOne.undo() call kore patchResultOne er local update ta ke undo kore felbe. r db to update e hoy nai
                const patchResultOne = dispatch(
                    apiSlice.util.updateQueryData('getConversations', arg.sender, (draft) => {
                        const draftConversation = draft.find((conv) => conv.id == arg.id); // draft data is saved as string in the browser cache like localstorage.. and arg.id is number here .. thats why um checking with == here, not ===
                        draftConversation.message = arg.data.message;
                        draftConversation.timestamp = arg.data.timestamp;
                    })
                );
                // optimistic cache update ends

                // conversation edit korar sathei amra nicher function diye silently message tao update kore felbo. amra chaile component er vitore useQuery ba muatation hook use kore state diye skip er maddhomeo kaj ta korte partam, kintu ekhane different ekta way dekhano holo j hooks to sudhu top level e use kora jaay component er moddhe, kintu kothao jodi evabe use korte hoy tkhn ki kora jabe ! tkhn eivabe dispatch call koreo kono ekta api e hit kora jabe. eta jodi kono component e kortam, tahole hoyto, amar dharona editConversation er isSuccess paile, setake diye state update kore diye addMessage er query er skip ta false kora lagto useEffect diye
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
