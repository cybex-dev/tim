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

/**
 * Get a member by its tag
 * @param guild {Guild} Guild to fetch member from
 * @param tag {String} Tag of the member
 * @returns {undefined|*}
 */
const getMember = (guild, tag) => {
    if (typeof guild === 'undefined') return undefined;
    if (typeof tag === 'undefined') return undefined;
    if (typeof tag !== 'string') return undefined;
    return guild.members.cache.get(tag);
}


/**
 * Get a role by its name
 * @param guild {Guild} Guild to fetch role from
 * @param id {String} Role
 * @returns {undefined|*}
 */
const getRole = (guild, id) => {
    if (typeof guild === 'undefined') return undefined;
    if (typeof name === 'undefined') return undefined;
    if (typeof name !== 'string') return undefined;
    return guild.roles.cache.get(id);
}

/**
 * Get all roles from a guild
 * @param guild {Guild} Guild to fetch roles from
 * @returns {undefined|*}
 */
const getAllRoles = (guild) => {
    if (typeof guild === 'undefined') return undefined;
    return guild.roles.cache;
}

module.exports = {
    getRoleMembers,
    getAllMembers,
    getGuild,
    getMember,
    getRole,
    getAllRoles,
}
