const { SlashCommandBuilder} = require("discord.js");
const slotInfo = require("../../subCommands/slot-info");
const slotRoll = require("../../subCommands/slot-roll");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("slotmachine")
        .setDescription("Slot machine.")
        .setDMPermission(false)
        .addSubcommand(subcommand => subcommand
            .setName("roll")
            .setDescription("Take a try to the slot machine. (cost 100$)")
            .addIntegerOption(option => option
                .setName("amount").setDescription("amount of rolls you do in one go.")
                .setMinValue(1)
                .setMaxValue(50)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("info")
            .setDescription("Give info on your slot machine stat.")
        ),
    
    async execute(interaction, client) {
        await interaction.deferReply()

        if (interaction.options.getSubcommand() === 'info') {
            //==================================================================================================================================
            console.log("     [SLOT] subcommand 'info'.")
            await slotInfo(interaction,client);
        }



        else if (interaction.options.getSubcommand() === 'roll') {
            //==================================================================================================================================
            //check for the data
            console.log("     [SLOT] subcommand 'roll'.")
            let data = client.checkAccount(interaction.user.id, interaction.guildId);
            if (!data) {
                interaction.editReply("You're not registered yet.")
                return;
            }
            
            //check the bidding
            let amount = interaction.options.getInteger('amount') ?? 1;

            //check if bidding money you dont have
            if (data.money < amount*100) {
                await interaction.editReply("What do you take me for? The bank?\n You can't bet money you don't have.");
                return;
            }
            //if done only one time
            if (amount == 1) {
                let object = await slotRoll(interaction, true);
                data.SM.jackpot += object.jackpot;
                data.SM.moneyOut += object.moneyOut;
                data.money += total.moneyOut;
                data.SM.time += 1;

            }
            //if done multiple time
            else {
                let total = {moneyOut:0,jackpot:0, desc:`<@${interaction.user.id}>\n`};
                let forceDesc = `<@${interaction.user.id}>\n`;
                let jackpot = "";

                for (let i = 0; i < amount; i++) {
                    let object = await slotRoll(interaction, false);

                    total.jackpot += object.jackpot;
                    total.moneyOut += object.moneyOut;
                    total.desc += object.desc + "\n";
                    if (object.jackpot == 1) jackpot += object.emote;
                    if (object.bowl) forceDesc += object.desc + "\n";
                }

                data.SM.jackpot += total.jackpot;
                data.SM.moneyOut += total.moneyOut;
                data.money += total.moneyOut;
                data.SM.time += amount;

                if (amount > 15) {
                    interaction.editReply(forceDesc + `rolls: **${amount}** \n Jackpot hit: **${total.jackpot}** ${jackpot}\n Total money win: **${total.moneyOut}$** (profit: **${total.moneyOut - (amount*100)}$**)`);
                } else {
                    total.desc += `\n Jackpot hit: **${total.jackpot}** \n Total money win: **${total.moneyOut}$** (profit: **${total.moneyOut - (amount*100)}**$)`
                    interaction.editReply(total.desc);
                }

            }

            //save info
            data.money-=amount*100;
            data.SM.moneyIn+=amount*100;
            client.saveData(data, interaction.user.id, interaction.guildId);

        }
        else {
            interaction.editReply("Oupsi, you're not suppose to see that... well, eh.")
        }
    }
}