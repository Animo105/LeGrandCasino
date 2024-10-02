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
    let infoFlieds =[ {
        name:"__Prize__",
        value:"in case of **Double**, win only half.:pineapple: => blank slate (no value)\n:ring::ring::ring: => 200\n"
             +":sleeping_accommodation::sleeping_accommodation::sleeping_accommodation: => 400\n"
             +":fishing_pole_and_fish::fishing_pole_and_fish::fishing_pole_and_fish: => 700\n"
             +":ice_cube::ice_cube::ice_cube: => 1 000\n"
             +":game_die::game_die::game_die: => 5 000\n"
             +":person_in_manual_wheelchair::person_in_manual_wheelchair::person_in_manual_wheelchair: => 10 000\n"
             +":lobster::lobster::lobster: => 50 000\n"
             +":bowl_with_spoon::bowl_with_spoon::bowl_with_spoon: => 100 000\n"
    }
];

    //embed description
    
    let embed = new EmbedBuilder()
        .setTitle("=================== [SLOT MACHINE] ===================\n")
        .setColor([201, 18, 18])
        .setFields(infoFlieds)
        .setDescription(desc);
        if (data) embed.setFooter({text:`Time used: ${data.SM.time}`})


        await interaction.editReply({embeds: [embed]})
}