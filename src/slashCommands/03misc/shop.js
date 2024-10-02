const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("description"),

    async execute(interaction, client) {
        await interaction.deferReply();

        let data = client.checkAccount(interaction.user.id, interaction.guildId);
        if (!data) {
            interaction.editReply("You have to have an account to use this command.")
            return;
        }

        //load shop
        interaction.editReply("Hey, this feature is not ready yet.\n If you have anything you would like to find here in the future, try /suggest. \n Who knows, maybe it will get added.")
        
    }
}