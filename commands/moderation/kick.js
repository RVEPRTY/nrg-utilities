const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { sendModLog } = require("../../core/modLogs");

module.exports = {

data: new SlashCommandBuilder()
.setName("kick")
.setDescription("Kick a user")
.addUserOption(option =>
option
.setName("user")
.setDescription("User to kick")
.setRequired(true)
)
.addStringOption(option =>
option
.setName("reason")
.setDescription("Reason for kick")
.setRequired(false)
)
.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

async execute(interaction){

try{

const user = interaction.options.getUser("user");
const reason = interaction.options.getString("reason") || "No reason provided";

const member = await interaction.guild.members.fetch(user.id);

await member.kick(reason);

await interaction.reply(`${user.tag} kicked`);

await sendModLog(interaction.client, interaction.guild, {
title:"👢 Kick",
color:"Orange",
user:user.tag,
moderator:interaction.user.tag,
reason
});

}catch(error){

interaction.reply({content:"Failed to kick user.", ephemeral:true});

}

}

};
