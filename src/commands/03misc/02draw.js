module.exports = {
    name: "draw",
    description:"draw a card from the shuffled deck.",
    execute(msg, client) {
        if (client.deck == [] || client.deck == undefined) {
            msg.reply("I don't have any card. Try to shuffle a new deck.");
        }
        else {
            let card = client.deck.draw();

            try {
                if (card === undefined) {
                    throw "Card is undefined."
                }
                else {
                    msg.reply(card.string);
                }

            } catch (error) {
                console.log("[ERROR]", error);
                msg.reply("Something went wrong.");
            }
        }
    }
}