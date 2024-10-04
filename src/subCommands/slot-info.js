const {EmbedBuilder } = require("discord.js");

module.exports = async (interaction, client) => {

    let data = client.checkAccount(interaction.user.id, interaction.guildId);
    let desc = "";
    if (!data) {
        desc = "You don't own an account.";
    }
    else {
        desc = `Total money put in: ${data.SM.moneyIn}\nMoney cashed out: ${data.SM.moneyOut}\nProfit: ${data.SM.moneyOut - data.SM.moneyIn}\n\nJackpot won: ${data.SM.jackpot}`

    }

    //flieds for embed. list all the prises


    //embed description
    
    let embed = new EmbedBuilder()
        .setTitle("=================== [SLOT MACHINE] ===================\n")
        .setColor([201, 18, 18])
        .setFields(infoFlieds)
        .setDescription(desc);
        if (data) embed.setFooter({text:`Time used: ${data.SM.time}`})


        await interaction.editReply({embeds: [embed]})
}