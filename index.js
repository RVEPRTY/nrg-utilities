require("dotenv").config();

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const mongoose = require("mongoose");

const loadCommands = require("./core/loader");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User
  ]
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"));

loadCommands(client);

require("./events/interactionCreate")(client);
require("./events/buttons")(client);
require("./events/ready")(client);
require("./events/guildMemberAdd")(client);
require("./events/dmRelay")(client);
require("./events/aiMention")(client);

client.login(process.env.TOKEN);

client.once("ready", () => {
  console.log("BOT ONLINE");
});

client.on("raw", (packet) => {
  if (packet.t === "MESSAGE_CREATE") {
    console.log("RAW EVENT RECEIVED");
  }
});

client.on("messageCreate", (msg) => {
  console.log("MESSAGE EVENT:", msg.content, "| Guild:", !!msg.guild);
});
