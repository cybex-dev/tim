/**
 * Get all members with a specific role
 * @param guild {Guild} Guild to fetch members from
 * @param role {String} Role ID to filter by
 * @returns {Promise<Collection<Snowflake, GuildMember>>}
 */
const getRoleMembers = (guild, role) => {
    return guild.members.fetch().then(members => members.filter(member => member.roles.cache.has(role)));
}

/**
 * Fetch all members from the guild
 * @param guild Guild to fetch members from
 * @returns {Promise<Collection<Snowflake, GuildMember>>}
 */
const getAllMembers = (guild) => {
    if (typeof guild === 'undefined') return undefined;
    return guild.members.fetch().then(members => members.filter(member => !member.user.bot));
}

/**
 * Get a guild by its ID
 * @param client Discord client
 * @param guildId Guild ID
 * @returns {Promise<Guild|undefined>}
 */
const getGuild = (client, guildId) => {
    if (typeof client === 'undefined') return undefined;
    if (typeof guildId === 'undefined') return undefined;
    if (typeof guildId !== 'string') return undefined;
    return client.guilds.fetch({guild: guildId});
}

/**
 * Get a member by its tag
 * @param guild {Guild} Guild to fetch member from
 * @param tag {String} Tag of the member
 *
 */
const getMember = (guild, tag) => {
    if (typeof guild === 'undefined') return undefined;
    if (typeof tag === 'undefined') return undefined;
    if (typeof tag !== 'string') return undefined;
    // linter complains about this, but it's correct - returns Collection and not a GuildMember|undefined
    return guild.members.fetch({id: tag, limit: 1}).then(member => member.first());
}


/**
 * Get a role by its name
 * @param guild {Guild} Guild to fetch role from
 * @param id {String} Role
 * @returns {Promise<Role|undefined>}
 */
const getRole = (guild, id) => {
    if (typeof guild === 'undefined') return undefined;
    if (typeof name === 'undefined') return undefined;
    if (typeof name !== 'string') return undefined;
    return guild.roles.fetch({id: id});
}

/**
 * Get all roles from a guild
 * @param guild {Guild} Guild to fetch roles from
 * @returns {Promise<Collection<Snowflake, Role>>}
 */
const getAllRoles = (guild) => {
    if (typeof guild === 'undefined') return undefined;
    return guild.roles.fetch();
}

module.exports = {
    getRoleMembers,
    getAllMembers,
    getGuild,
    getMember,
    getRole,
    getAllRoles,
}
