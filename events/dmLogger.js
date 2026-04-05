const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {

client.on("messageCreate", async (message) => {

// ONLY DMs
if(message.guild) return;
if(message.author.bot) return;

const channel = client.channels.cache.get(process.env.DM_LOG_CHANNEL);
if(!channel) return;

const embed = new EmbedBuilder()
.setColor("#00AEEF")
.setTitle("📩 New DM Received")
.addFields(
{ name: "User", value: `${message.author.tag} (${message.author.id})` },
{ name: "Message", value: message.content || "No text (maybe attachment)" }
)
.setTimestamp();

channel.send({ embeds: [embed] });

});

};
