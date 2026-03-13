const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { sendModLog } = require("../../core/modLogs");
const mongoose = require("mongoose");

const warnSchema = new mongoose.Schema({
userId: String,
warnings: Array
});

const Warn = mongoose.models.Warn || mongoose.model("Warn", warnSchema);

module.exports = {

data: new SlashCommandBuilder()
.setName("warn")
.setDescription("Warn a user")
.addUserOption(o =>
o.setName("user").setDescription("User to warn").setRequired(true))
.addStringOption(o =>
o.setName("reason").setDescription("Reason").setRequired(true))
.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

async execute(interaction){

try{

const user = interaction.options.getUser("user");
const reason = interaction.options.getString("reason");

let data = await Warn.findOne({ userId: user.id });

if(!data){
data = await Warn.create({ userId: user.id, warnings: [] });
}

data.warnings.push({
reason,
moderator: interaction.user.id,
date: Date.now()
});

await data.save();

await interaction.reply({content:`${user.tag} warned.`, ephemeral:true});

await sendModLog(interaction.client, interaction.guild, {
title:"⚠ Warning",
color:"Yellow",
user:user.tag,
moderator:interaction.user.tag,
reason
});

}catch(error){

console.error(error);
interaction.reply({content:"Failed to warn user.", ephemeral:true});

}

}

};
