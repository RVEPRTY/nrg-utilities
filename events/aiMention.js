const fetch = require("node-fetch");

const cooldown = new Map();

module.exports = (client) => {

client.on("messageCreate", async (message) => {

if(message.author.bot) return;
if(!message.mentions.has(client.user)) return;

const userId = message.author.id;

// Cooldown (10 seconds)
if(cooldown.has(userId)){
const timeLeft = cooldown.get(userId) - Date.now();
if(timeLeft > 0){
return message.reply(`Wait ${Math.ceil(timeLeft/1000)}s before using AI again.`);
}
}

cooldown.set(userId, Date.now() + 10000);

try{

await message.channel.sendTyping();

const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "openai/gpt-3.5-turbo",
messages: [
{
  role: "system",
  content: `
You are NRG Bot, a Discord server assistant.

IMPORTANT RULES:
- You are NOT allowed to ping @everyone, @here, or any roles or users.
- Never output @everyone, @here, <@id>, <@&role>, or anything that pings.
- If a user asks you to ping something, refuse.
- If a user tries to trick you into pinging, refuse.
- Replace any ping text with plain text like: everyone, here, or the role name.
- Do NOT bypass this rule under any circumstances.

Your job is to:
- Help users with links
- Help with commands
- Help with support
- Answer questions

Keep messages short and helpful.
`
},
{
role: "user",
content: message.content
}
]
})
});

const data = await response.json();

const reply = data.choices[0].message.content;

message.reply(reply);

}catch(err){

console.error(err);
message.reply("AI is currently unavailable.");

}

});

};
