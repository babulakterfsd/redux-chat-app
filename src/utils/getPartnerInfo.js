const getPartnerInfo = (participants, email) =>
    participants.find((participant) => participant.email !== email);

export default getPartnerInfo;
