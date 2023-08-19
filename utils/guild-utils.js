/**
 * Fetch all members from the guild
 * @param guild Guild to fetch members from
 * @returns {*} Collection of members
 */
const getAllMembers = (guild) => {
    if (typeof guild === 'undefined') return undefined;
    return guild.members.cache.filter(member => !member.user.bot);
}

module.exports = {
    getAllMembers,
}
