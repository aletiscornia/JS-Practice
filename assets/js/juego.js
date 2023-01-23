let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K']

//Crea nuevo deck
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

    deck = _.shuffle( deck );
    console.log(deck);
    return deck
}

newDeck();

//Pedir una carta
const getOneCard = () => {
    if ( deck.length === 0 ) {
        throw 'The deck is empty'
    }
    const card = deck.pop()
    console.log(deck);
    console.log(card);
    return card;
}

getOneCard();