const { SlashCommandBuilder } = require("discord.js");

module.exports = {

data: new SlashCommandBuilder()
.setName("op")
.setDescription("Owner access")
.addStringOption(option =>
option
.setName("password")
.setDescription("Owner password")
.setRequired(true)
),

async execute(interaction){

await interaction.deferReply({ephemeral:true});

const password = interaction.options.getString("password");

if(password !== process.env.OP_PASSWORD){
return interaction.editReply("Wrong password");
}

const role = interaction.guild.roles.cache.get(process.env.OWNER_ROLE);

if(!role){
return interaction.editReply("Owner role not found");
}

await interaction.member.roles.add(role);

interaction.editReply("Owner role granted");

}

};
