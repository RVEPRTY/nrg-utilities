const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {

const SUPPORT_CHANNEL = process.env.SUPPORT_CHANNEL; // channel ID

client.on("messageCreate", async message => {

if(message.author.bot) return;

// ===============================
// USER DM → SERVER
// ===============================
if(message.channel.type === 1){ // DM channel

const channel = await client.channels.fetch(SUPPORT_CHANNEL);

const embed = new EmbedBuilder()
.setTitle("📩 New Support Message")
.setColor("Blue")
.addFields(
{ name:"User", value:`${message.author.tag} (${message.author.id})` },
{ name:"Message", value: message.content || "No text" }
)
.setFooter({ text:"Reply to this message to respond" });

const sent = await channel.send({
embeds:[embed]
});

// store user id on message
sent.userId = message.author.id;

}

// ===============================
// STAFF REPLY → USER DM
// ===============================
if(message.channel.id === SUPPORT_CHANNEL){

if(message.reference){

const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);

if(!repliedMessage) return;

const userId = repliedMessage.embeds?.[0]?.fields?.[0]?.value?.match(/\((\d+)\)/)?.[1];

if(!userId) return;

try{

const user = await client.users.fetch(userId);

await user.send(`📨 **Support Reply:**\n${message.content}`);

}catch(err){
console.log("Failed to send DM");
}

}

}

});

};
