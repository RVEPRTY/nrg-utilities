const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports={

data:new SlashCommandBuilder()
.setName("kick")
.setDescription("Kick a user")
.addUserOption(o=>o.setName("user").setRequired(true))
.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

async execute(interaction){

const user = interaction.options.getUser("user");

await interaction.guild.members.kick(user);

interaction.reply(`${user.tag} kicked`);

}

};
