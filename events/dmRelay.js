const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {

  client.on("messageCreate", async (message) => {

    try {

      // 🔥 IMPORTANT: Fetch partials
      if (message.partial) {
        await message.fetch();
      }

      console.log("MESSAGE EVENT FIRED");

      if (message.author.bot) return;

      // Only DMs
      if (message.guild) return;

      console.log("DM RECEIVED:", message.content);

      const channel = await client.channels.fetch(process.env.DM_LOG_CHANNEL);

      if (!channel) {
        console.log("Channel not found");
        return;
      }

      const embed = new EmbedBuilder()
        .setColor("#00AEEF")
        .setTitle("📩 New DM Received")
        .addFields(
          { name: "User", value: `${message.author.tag} (${message.author.id})` },
          { name: "Message", value: message.content || "No text" }
        )
        .setTimestamp();

      await channel.send({ embeds: [embed] });

      console.log("DM SENT TO CHANNEL");

    } catch (err) {
      console.error("DM RELAY ERROR:", err);
    }

  });

};
