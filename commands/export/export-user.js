const {SlashCommandBuilder} = require('discord.js');
const {getGuild, getRoleMembers, getMember} = require("../../utils/guild-utils");
const {writeToCSV} = require("../../utils/csv-utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('export-user')
        .setDescription('Export a user with all their roles')
        .addUserOption(option => {
            return option
                .setName('tag')
                .setDescription('The user to export')
                .setRequired(true);
        })
    ,
    async execute(interaction) {
        const member = interaction.options.getMember('tag');
        if (typeof member === 'undefined') {
            interaction.reply('Member not found.');
            return;
        }

        // prepare data
        const data = [
            {
                tag: member.user.tag,
                username: member.user.displayName,
                roles: member.roles.cache.map(role => role.name).join(","),
            }
        ];

        // create file
        const headers = ["Tag", "Username", "Roles"];

        const filename = `member-${member.user.tag}.csv`.replace(/ /g, '_')
        writeToCSV(filename, data, headers).then((filePath) => {
            interaction.reply(`Found ${member.roles.cache.length} roles associated with member '${member.user.displayName}'`);
            interaction.channel.send({files: [filePath]})
        }).catch(reason => {
            console.error(reason);
            interaction.reply('Something went wrong!');
        });
    },
};