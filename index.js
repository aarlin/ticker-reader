const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const tickerMatch = msg.content.match(/\$[a-zA-Z.]+/)
    console.log(tickerMatch)
    if (tickerMatch.length > 0) {
        message.channel.send(tickerMatch[0]);
    }
});

client.login(process.env.DISCORD_TOKEN);