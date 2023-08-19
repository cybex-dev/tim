/**
 * Get all members with a specific role
 * @param guild {Guild} Guild to fetch members from
 * @param role {String} Role ID to filter by
 * @returns {*} Collection of members
 */
const getRoleMembers = (guild, role) => {
    return guild.members.cache.filter(member => member.roles.cache.has(role));
}

/**
 * Fetch all members from the guild
 * @param guild Guild to fetch members from
 * @returns {*} Collection of members
 */
const getAllMembers = (guild) => {
    if (typeof guild === 'undefined') return undefined;
    return guild.members.cache.filter(member => !member.user.bot);
}

/**
 * Get a guild by its ID
 * @param client Discord client
 * @param guildId Guild ID
 * @returns {undefined|*}
 */
const getGuild = (client, guildId) => {
    if (typeof client === 'undefined') return undefined;
    if (typeof guildId === 'undefined') return undefined;
    if (typeof guildId !== 'string') return undefined;
    return client.guilds.cache.get(guildId);
}

module.exports = {
    getRoleMembers,
    getAllMembers,
    getGuild,
}
