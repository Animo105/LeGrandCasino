const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dice")
        .setDescription("description")
        .addSubcommand(subcommand => subcommand
            .setName("roll").setDescription("Take a bet and roll the dices.")
            .addIntegerOption(o => o
                .setName("roll").setDescription("The number the dice need to display for you to win.").setRequired(true)
                .setMinValue(2).setMaxValue(12)
            )
            .addIntegerOption(o => o
                .setName("amount").setDescription("The amount of money you bet on the roll.").setRequired(true)
                .setMinValue(10).setMaxValue(10000)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("info").setDescription("Display info on how the dices works.")
        ),

    async execute(interaction, client) {
        await interaction.deferReply();

        if (interaction.options.getSubcommand() === 'info') {
            //info
            let data = client.checkAccount(interaction.user.id, interaction.guildId);
            let desc = "";
            if (data) {
            //description avec data.
                desc = `**Money put in:** ${data.dice.moneyIn} \n **Money cashed out:** ${data.dice.moneyOut} \n **Profit:** ${data.dice.moneyOut - data.dice.moneyIn} \n\n`
            } else {desc = "You don't have an account. \n\n"}

                desc += "__**Dice**__ \n The game is simple: 2 dices are rolled for a sum between 2 and 12. \n The amount you gain in case of win is affected by the probability of that number getting rolled. (2 and 12 are worth more but have less probability.)"
            
            let embed = new EmbedBuilder().setTitle("===== [Dice] =====")
            .setDescription(desc).setColor([201, 18, 18])

            await interaction.editReply({embeds: [embed]});

        }
        else {
            //roll
            let data = client.checkAccount(interaction.user.id, interaction.guildId);
            if (!data) {
            interaction.editReply("There's no account registered under that name.")
            return;
        }

        let money = interaction.options.getInteger('amount')
        if (data.money < money) {
            await interaction.editReply("What do you take me for? The bank?\n You can't bet money you don't have.");
            return;
        }

        data.dice.moneyIn += money;
        data.dice.time += 1;
        data.money -= money;

        let dies = [
            {emote:"<:dice_1:1291366215192805386>", value:1},
            {emote:"<:dice_2:1291366233161334876>", value:2},
            {emote:"<:dice_3:1291366247853850624>", value:3},
            {emote:"<:dice_4:1291366266661240853>", value:4},
            {emote:"<:dice_5:1291366282477965364>", value:5},
            {emote:"<:dice_6:1291366300123402281>", value:6},
        ];

        let rolls = [];
        rolls.push(dies[Math.floor(Math.random()*6)]);
        rolls.push(dies[Math.floor(Math.random()*6)]);

        let message = `# the dice are rolled: ${rolls[0].emote}${rolls[1].emote}.\n`
        let bet = interaction.options.getInteger('roll')
        //win
        if (bet == rolls[0].value + rolls[1].value) {
            //7 fait *3, 2 et 12 fait * 10 et le reste fait *4
            if (bet == 7) money = money*3;
            else if (bet == 2 || bet == 12) money = money*10;
            else money = money*4;


            message+=" You Win! you gained **"+money+"$**."
            data.money+= money;
            data.dice.moneyOut+= money;
        }
        //lose
        else {message+= "You lose. (**-"+money+"$**)"}

        interaction.editReply(message);

        client.saveData(data, interaction.user.id, interaction.guildId);


        }   


        
    }
}