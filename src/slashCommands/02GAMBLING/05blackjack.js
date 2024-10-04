const { SlashCommandBuilder } = require("discord.js");
const DeckOfCard = require("./../../../deckofCard")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("blackjack")
        .setDescription("description")
        .addSubcommand(s => s.setName("info").setDescription("Give info on how to play blackjack."))
        .addSubcommand(s => s.setName("start")
        .setDescription("Start a game of blackjack.")
        .addIntegerOption(o => o.setName("bet").setDescription("Amount of money bet on the game.").setMinValue(0))
        ),

    async execute(interaction, client) {
        await interaction.deferReply();

        let data = client.checkAccount(interaction.user.id, interaction.guildId);
        if (!data) {
            interaction.editReply("There's no account registered under that name.")
            return;
        }

        let game = {value:0, cards:""};

        //fonction pour add les cartes
        function add(card) {
            game.cards += card.string += " | ";
            if (card.value == 14);
            game.value += cards.value;
        }

        let deck = new DeckOfCard();

        //draw 2 first card
        let card = deck.draw();

    }
}