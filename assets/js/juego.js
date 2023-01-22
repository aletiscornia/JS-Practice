let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K']

const newDeck = () => {
    for( let i = 2; i <= 10; i++ ) {
        for( let type of types ) {
            deck.push( i + type );
        }
    }

    for( let type of types ){
        for( let spe of specials ) {
            deck.push( spe + type )
        }
    }
    console.log(deck);
    deck = _.shuffle( deck );
    console.log(deck);
    return deck
}

newDeck();