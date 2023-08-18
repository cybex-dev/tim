const fs = require('node:fs');
const path = require('node:path');

const {Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const {loadCommands} = require("./utils/load-slashes");

const client = new Client({ intents: intentList });
client.commands = new Collection();

const commandFolderPath = path.join(__dirname, "commands");
const commands = loadCommands(commandFolderPath);
commands.forEach(command => {
    client.commands.set(command.data.name, command);
});

client.once(Events.ClientReady, c => {
    console.log(`TimBot Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    // if (!interaction.isCommand()) return;
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

// Respond to mentions messages
// client.on(Events.MessageCreate, message => {
//     if(message.content === "") {
//         return
//     }
//     let segments = message.content.split(" ")
//     if(segments.length > 1) {
//         // message content
//         let m = segments[1]
//         if (m === 'Ping') {
//             message.channel.send('Pong!');
//         }
//     }
// });

// login with DISCORD_TOKEN
client.login(process.env.DISCORD_TOKEN).then((_) => {
    console.log('Logged in!');
}).catch(console.error);