const { Client, Intents } = require('discord.js');

const intentList = new Intents();
intentList.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: intentList });

client.once('ready', () => {
    console.log('Ping Pong Bot Loaded!');
});

client.on('message', message => {
    if (message.content === 'Ping') {
        message.channel.send('Pong!');
    }
});

// login if environment variable DISCORD_TOKEN exists
if(process.env.DISCORD_TOKEN)
    client.login(process.env.DISCORD_TOKEN).catch(console.error);