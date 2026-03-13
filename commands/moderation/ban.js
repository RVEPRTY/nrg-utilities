const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { sendModLog } = require("../../core/modLogs");

module.exports = {

data: new SlashCommandBuilder()
.setName("ban")
.setDescription("Ban a user")
.addUserOption(option =>
option
.setName("user")
.setDescription("User to ban")
.setRequired(true)
)
.addStringOption(option =>
option
.setName("reason")
.setDescription("Reason for ban")
.setRequired(false)
)
.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

async execute(interaction){

try{

const user = interaction.options.getUser("user");
const reason = interaction.options.getString("reason") || "No reason provided";

await interaction.guild.members.ban(user, { reason });

await interaction.reply(`${user.tag} banned`);

await sendModLog(interaction.client, interaction.guild, {
title:"🔨 Ban",
color:"Red",
user:user.tag,
moderator:interaction.user.tag,
reason
});

}catch(error){

console.error(error);
interaction.reply({content:"Failed to ban user.", ephemeral:true});

}

}

};
