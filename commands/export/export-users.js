const {SlashCommandBuilder} = require('discord.js');
const {writeToCSV} = require("../../utils/csv-utils");
const {getAllMembers} = require("../../utils/guild-utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('export-all')
        .setDescription('Export all users with their roles')
    ,
    async execute(interaction) {
        const allMembers = getAllMembers(interaction.guild)
        if (allMembers === undefined) {
            interaction.reply('Something went wrong!');
            return;
        }

        if (allMembers.length === 0) {
            interaction.reply('No members found');
            return;
        }

        const data = allMembers.map(member => {
            return {
                tag: member.user.tag,
                username: member.user.displayName,
                roles: member.roles.cache.map(role => role.name).join(","),
            }
        });

        // create file
        const headers = ["Tag", "Username", "Roles"];
        const filename = `all-members-roles.csv`.replace(/ /g, '_')

        writeToCSV(filename, data, headers).then((filePath) => {
            interaction.reply(`Found ${allMembers.size} members.`);
            interaction.channel.send({files: [filePath]})
        }).catch(reason => {
            console.error(reason);
            interaction.reply('Something went wrong!');
        });
    },
};
