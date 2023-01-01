const getPartnerInfo = (participants, loggedInUserEmail) =>
    participants.find((participant) => participant.email !== loggedInUserEmail);

export default getPartnerInfo;
