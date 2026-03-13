const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {

data: new SlashCommandBuilder()
.setName("serverstats")
.setDescription("Show server statistics"),

async execute(interaction){

const guild = interaction.guild;

const embed = new EmbedBuilder()
.setTitle("Server Stats")
.addFields(
{ name:"Members", value:`${guild.memberCount}`, inline:true },
{ name:"Channels", value:`${guild.channels.cache.size}`, inline:true },
{ name:"Roles", value:`${guild.roles.cache.size}`, inline:true }
)
.setColor(0x2b2d31);

interaction.reply({embeds:[embed]});

}

};
