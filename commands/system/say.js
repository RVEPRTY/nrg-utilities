const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {

data: new SlashCommandBuilder()
.setName("say")
.setDescription("Make the bot say something")
.addStringOption(option =>
option
.setName("message")
.setDescription("Message for the bot to send")
.setRequired(true)
)
.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

async execute(interaction){

const message = interaction.options.getString("message");

// Delete the command reply so it looks clean
await interaction.reply({ content:"Sent.", ephemeral:true });

// Send the message in the channel
await interaction.channel.send(message);

}

};
