const { SlashCommandBuilder } = require("discord.js");

module.exports = {
data: new SlashCommandBuilder()
.setName("dm")
.setDescription("Send a DM to a user (Owner Only)")
.addStringOption(option =>
    option.setName("userid")
    .setDescription("User ID to DM")
    .setRequired(true)
)
.addStringOption(option =>
    option.setName("message")
    .setDescription("Message to send")
    .setRequired(true)
),

async execute(interaction){

// OWNER ONLY
if(interaction.user.id !== process.env.OWNER_ID){
return interaction.reply({ content: "Owner only command.", ephemeral: true });
}

const userId = interaction.options.getString("userid");
const message = interaction.options.getString("message");

try{

const user = await interaction.client.users.fetch(userId);

await user.send(message);

await interaction.reply({
content: `✅ DM sent to ${user.tag}`,
ephemeral: true
});

}catch(err){

await interaction.reply({
content: "❌ Failed to send DM. User may have DMs disabled.",
ephemeral: true
});

}

}
};
