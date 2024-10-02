const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("donate")
        .setDescription("Donate money to another user.")
        .addUserOption(option => option
            .setName("user")
            .setDescription("Another user.")
            .setRequired(true)
        )
        .addIntegerOption(option => option
            .setName("amount")
            .setDescription("Amount to donate.")
            .setMinValue(1)
            .setRequired(true)
        ),
        
    async execute(interaction, client) {
        await interaction.deferReply();

        //check for your account
        let data = client.checkAccount(interaction.user.id, interaction.guildId);
        if (!data) {
            interaction.editReply("You don't own an account");
            return;
        }

        //check if you have the money
        let amount = interaction.options.getInteger('amount');
        if (amount > data.money) {
            interaction.editReply("You don't have that kind of money. Stop dreaming.");
            return;
        }

        //check if you donate to yourself
        let user = interaction.options.getUser('user');
        if (user.id === interaction.user.id) {
            interaction.editReply("You can't donate to yourself.");
            return;
        }

        //check for other user account
        let otherdata = client.checkAccount(user.id, interaction.guildId)
        if (!otherdata) {
            await interaction.editReply("There's no one registered under that name.");
            return;
        }

        data.money-=amount;
        data.donation.given+=amount;
        otherdata.money+=amount;
        otherdata.donation.recived+=amount;
        interaction.editReply(`**${data.name}** donated ${amount}$ to **${otherdata.name}**.`);

        client.saveData(data, interaction.user.id, interaction.guildId);
        client.saveData(otherdata, user.id, interaction.guildId);
    }
}