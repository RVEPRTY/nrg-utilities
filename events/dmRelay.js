const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {

client.on("messageCreate", async (message) => {

console.log("Event fired");

if (message.author.bot) return;
if (message.guild) return;

console.log("DM RECEIVED:", message.content);

try {

const channel = await client.channels.fetch(process.env.DM_LOG_CHANNEL);

if (!channel) return console.log("Channel not found");

const embed = new EmbedBuilder()
.setTitle("📩 DM Received")
.addFields(
{ name: "User", value: `${message.author.tag}` },
{ name: "ID", value: message.author.id },
{ name: "Message", value: message.content || "No text" }
)
.setColor("#00AEEF");

await channel.send({ embeds: [embed] });

console.log("Message sent to log channel");

} catch (err) {
console.error("DM ERROR:", err);
}

});

};
