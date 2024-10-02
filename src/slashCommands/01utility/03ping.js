const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder() 
        .setName("ping")
        .setDescription("Reply with 'Pong!'"),
    
    execute(interaction) {
        interaction.reply("Pong!")
    }
}