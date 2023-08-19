const {SlashCommandBuilder} = require('discord.js');
const {getRoleMembers, getGuild} = require("../../utils/guild-utils");
const {writeToCSV} = require("../../utils/csv-utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('export-role')
        .setDescription('Export users with a specific role!')
        .addMentionableOption(option => {
            return option
                .setName('role')
                .setDescription('The role to export')
                .setRequired(true);
        })
    ,
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        if (typeof role === 'undefined') {
            interaction.reply('Role not found.');
            return;
        }

        const guild = getGuild(interaction.client, interaction.guildId);

        // get members with role
        const roleMembers = getRoleMembers(guild, role.id)
        if (typeof roleMembers === 'undefined') {
            interaction.reply('Something went wrong...');
            return;
        }

        // prepare data
        const members = roleMembers.map(member => {
            return {
                tag: member.user.tag,
                username: member.user.displayName,
                role: role.name,
            }
        });
        if (members.length === 0) {
            interaction.reply('No members found with role ' + role.name);
            return;
        }

        // create file
        const headers = ["Tag", "Username", "Role"];
        const filename = `role-${role.name}.csv`.replace(/ /g, '_')
        writeToCSV(filename, members, headers).then((filePath) => {
            interaction.reply(`Found ${members.length} members to with role '${role.name}'`);
            interaction.channel.send({files: [filePath]})
        }).catch(reason => {
            console.error(reason);
            interaction.reply('Something went wrong!');
        });
    },
};