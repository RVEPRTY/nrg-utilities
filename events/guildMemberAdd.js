const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {

client.on("guildMemberAdd", async member => {

const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);

if(!channel) return;

const embed = new EmbedBuilder()
.setColor("#00AEEF")
.setTitle("Welcome to the Server!")
.setDescription(`Welcome ${member} to **${member.guild.name}**!`)
.addFields(
{ name:"Member Count", value:`${member.guild.memberCount}`, inline:true }
)
.setThumbnail(member.user.displayAvatarURL({dynamic:true}))
.setFooter({text:"NRG Utilities"})
.setTimestamp();

channel.send({embeds:[embed]});

});

};
