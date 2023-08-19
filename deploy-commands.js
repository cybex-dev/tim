const {REST, Routes} = require('discord.js');
const {clientId, guildId} = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const {loadCommands} = require("./utils/load-slashes");

const commandFolderPath = path.join(__dirname, "commands");
const commands = loadCommands(commandFolderPath, command => command.data.toJSON());

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(Routes.applicationCommands(clientId), {body: commands});

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();