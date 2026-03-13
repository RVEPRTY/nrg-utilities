const { SlashCommandBuilder } = require("discord.js");
const Links = require("../../database/links");

module.exports = {

data: new SlashCommandBuilder()
.setName("removelink")
.setDescription("Remove a link from the database")
.addStringOption(option =>
option
.setName("url")
.setDescription("The link to remove")
.setRequired(true)
),

async execute(interaction){

if(!interaction.member.roles.cache.has(process.env.ADMIN_ROLE)){
return interaction.reply({content:"No permission",ephemeral:true});
}

await interaction.deferReply({ephemeral:true});

const url = interaction.options.getString("url");

const result = await Links.findOneAndDelete({url});

if(!result){
return interaction.editReply("Link not found");
}

interaction.editReply("Link removed");

}

};
