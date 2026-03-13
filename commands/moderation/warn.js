const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
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

interaction.reply({content:`${user.tag} warned.`, ephemeral:true});

}

};
