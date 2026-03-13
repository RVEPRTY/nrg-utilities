const { EmbedBuilder } = require("discord.js");

async function sendModLog(guild, embed){

const logChannelId = process.env.MOD_LOG_CHANNEL;
if(!logChannelId) return;

const channel = guild.channels.cache.get(logChannelId);
if(!channel) return;

channel.send({ embeds: [embed] });

}

module.exports = { sendModLog };
