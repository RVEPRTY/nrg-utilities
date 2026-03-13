const { SlashCommandBuilder } = require("discord.js");

module.exports = {
data: new SlashCommandBuilder()
.setName("roll")
.setDescription("Roll a dice")
.addIntegerOption(o =>
o.setName("max")
.setDescription("Maximum number (default 6)")
.setRequired(false)),

async execute(interaction){

const max = interaction.options.getInteger("max") || 6;
const result = Math.floor(Math.random() * max) + 1;

await interaction.reply(`🎲 You rolled: **${result}**`);

}
};
