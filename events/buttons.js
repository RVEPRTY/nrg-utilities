const Links = require("../database/links");
const Usage = require("../database/usage");

module.exports = (client)=>{

// Store temporary selections
client.linkDelivery = {};
client.linkType = {};

client.on("interactionCreate", async interaction=>{

//
// ===============================
// HELP BUTTONS
// ===============================
//

if(interaction.isButton()){

if(interaction.customId === "help_mod"){
return interaction.reply({
content:"/ban /kick /timeout /warn /purge",
ephemeral:true
});
}

if(interaction.customId === "help_links"){
return interaction.reply({
content:"/addlink /bulkadd /panel",
ephemeral:true
});
}

if(interaction.customId === "help_utils"){
return interaction.reply({
content:"/status /info",
ephemeral:true
});
}

if(interaction.customId === "help_fun"){
return interaction.reply({
content:"/coinflip /8ball /roll /joke /avatar",
ephemeral:true
});
}

}

//
// ===============================
// DROPDOWN HANDLING (NEW)
// ===============================
//

if(interaction.isStringSelectMenu()){

// Delivery Dropdown
if(interaction.customId === "link_delivery"){
client.linkDelivery[interaction.user.id] = interaction.values[0];

return interaction.reply({
content:`Delivery set to **${interaction.values[0].toUpperCase()}**`,
ephemeral:true
});
}

// Type Dropdown
if(interaction.customId === "link_type"){
client.linkType[interaction.user.id] = interaction.values[0];

return interaction.reply({
content:`Link type set to **${interaction.values[0].toUpperCase()}**`,
ephemeral:true
});
}

}

//
// ===============================
// LINK SYSTEM
// ===============================
//

if(!interaction.isButton()) return;
if(!interaction.customId.startsWith("link")) return;

const WEEK = 604800000;
const now = Date.now();

let user = await Usage.findOne({ userId: interaction.user.id });

if(!user){

user = await Usage.create({
userId: interaction.user.id,
weekStart: now,
count: 0
});

}

if(now - user.weekStart > WEEK){
user.weekStart = now;
user.count = 0;
}

let limit = 1;

if(
interaction.member.roles.cache.has(process.env.PREMIUM_ROLE) ||
interaction.member.roles.cache.has(process.env.BOOSTER_ROLE)
){
limit = 3;
}

if(user.count >= limit){
return interaction.reply({
content:"Weekly link limit reached.",
ephemeral:true
});
}

// Get selected type (full or lite)
const type = client.linkType[interaction.user.id] || "full";

// Get link matching type
const link = await Links.findOneAndUpdate(
{ used:false, type:type },
{ used:true, claimedBy:interaction.user.id, claimedAt:now }
);

if(!link){
return interaction.reply({
content:`No **${type.toUpperCase()}** links available.`,
ephemeral:true
});
}

user.count++;
await user.save();

const delivery = client.linkDelivery[interaction.user.id] || "reply";

if(delivery === "dm"){

try{

await interaction.user.send(`Your NRG ${type.toUpperCase()} Link:\n${link.url}`);

return interaction.reply({
content:"Check your DMs!",
ephemeral:true
});

}catch{

return interaction.reply({
content:"Enable DMs to receive links.",
ephemeral:true
});

}

}

if(delivery === "reply"){

return interaction.reply({
content:`Your NRG ${type.toUpperCase()} Link:\n${link.url}`,
ephemeral:true
});

}

});

};
