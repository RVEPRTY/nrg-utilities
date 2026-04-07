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
    Partials.Channel,  // Needed for DMs
    Partials.Message,
    Partials.User
  ]
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Load commands
loadCommands(client);

// Event handlers
require("./events/interactionCreate")(client);
require("./events/buttons")(client);
require("./events/ready")(client);
require("./events/guildMemberAdd")(client);
require("./events/dmRelay")(client);      // Logs DMs
require("./events/aiMention")(client);    // AI mentions handling

// Login
client.login(process.env.TOKEN);

// Ready event
client.once("ready", () => {
  console.log(`${client.user.tag} is ONLINE`);
});
