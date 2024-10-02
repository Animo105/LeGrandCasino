const DeckOfCard = require("../../../deckofCard")

module.exports = {
    name: "shuffle",
    description:"shuffle a new deck of cards.",

    execute(msg, client) {

        if (!client.deck || !client.deck.full()) {

            client.deck = new DeckOfCard();
            msg.react(client.customEmojis.get('3cards'));
        }
        else {msg.reply("The deck is already good as new.")}
    }
}