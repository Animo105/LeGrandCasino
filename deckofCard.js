module.exports = class DeckOfCard {
    constructor() {
        this.deck = [];

        const suits = ['<:clubs_box:1289565464158142525>', '<:spades_box:1289565506365423648>', '<:diamond_box:1289565441257242755>', '<:heart_box:1289565484961759242>'];

        const symbols = [':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:',
            ':nine:', ':keycap_ten:', ':regional_indicator_j:', ':regional_indicator_q:',
            ':regional_indicator_k:', ':regional_indicator_a:'];
        //load dans deck les cartes
        for (let s = 0; s < suits.length; s++) {
            for (let i = 0; i < symbols.length; i++) {
                this.deck.push({ num: i + 1, suit: s + 1, string: symbols[i] + " " + suits[s] });
            }
        }
    }

    draw() {
        if (this.deck == []) {
            return undefined;
        }
        else {
            let index = Math.floor(Math.random() * this.deck.length);
            let card = this.deck[index];
            this.deck.splice(index, 1);
            return card;
        }
    }

    full() {
        if (this.deck.length === 52) {
            return true;
        }
        else return false;
    }

    getLength(){
        return this.deck.length
    }

    print(channel) {
        if (this.deck == []) {
            channel.send("I don't have any cards.")
            return;
        }

        let string = ""
        let s = 1;
        this.deck.forEach(element => {
            if (element.suit != s) {
                s++;
                if (string != "") {
                    channel.send(string);
                    string = "";
                }
            }
            else string+=element.string+"\n"
        });
        channel.send(string);
        channel.send(`There are ${this.deck.length} cards left`)
    }
}