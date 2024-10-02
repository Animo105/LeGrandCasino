const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("atm")
        .setDescription("hold some reward for you. don't forget to check it once in a while."),

    async execute(interaction, client) {
        await interaction.deferReply();

        let data = client.checkAccount(interaction.user.id, interaction.guildId);
        if (!data) {
            interaction.editReply("There's no account registered under that name.")
            return;
        }

        let embed = new EmbedBuilder()
            .setTitle("# ===== [ATM] =====")
            .setColor([201, 18, 18]);
        
        let desc = "";
        


        
    }
}