const { Events } = require("discord.js");
const fetch = require("node-fetch");

const memory = new Map();

module.exports = (client) => {
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (!message.mentions.has(client.user)) return;

    const userId = message.author.id;
    const prompt = message.content.replace(/<@!?\d+>/g, '').trim();

    if (!prompt) return;

    // Conversation memory
    let history = memory.get(userId) || [];

    history.push({ role: "user", content: prompt });

    try {
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

RULES:
- Never ping anyone.
- Never output @everyone or @here.
- Never output role or user mentions.
- If a message contains @, replace it with ? instead.
- Keep responses short.
- Help with bot commands, links, support, and server questions.
`
            },
            ...history
          ]
        })
      });

      const data = await response.json();
      let reply = data.choices[0].message.content;

      reply = reply
        .replace(/@/g, "?")
        .replace(/<@&\d+>/g, "[role]")
        .replace(/<@\d+>/g, "[user]")
        .replace(/<@!\d+>/g, "[user]");


      if (reply.length > 2000) {
        reply = reply.slice(0, 1900) + "...";
      }

      history.push({ role: "assistant", content: reply });
      if (history.length > 6) history.shift();
      memory.set(userId, history);

      message.reply({
        content: reply,
        allowedMentions: { parse: [] }
      });

    } catch (err) {
      console.error(err);
      message.reply("AI error. Try again later.");
    }
  });
};
