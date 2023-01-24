let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K']

let playerPoints = 0;
let computerPoints = 0;

//Referencias HTML
const btnGet = document.querySelector('#btnGet');

const playerCardsDiv = document.querySelector('#player-cards');
const computerCardsDiv = document.querySelector('#computer-cards');
const htmlPoints = document.querySelectorAll('small');

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
    return card;
}

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1 );
    return ( isNaN( value ) ) ?
                ( value === 'A' ) ? 11 : 10
                : value * 1;
}

// const value = cardValue( getOneCard() );

//Eventos
btnGet.addEventListener('click', () => {
    const card = getOneCard();
    playerPoints = playerPoints + cardValue( card );
    htmlPoints[0].innerText = playerPoints;

    const cardImg = document.createElement('img');
    cardImg.src = `/assets/cartas/${card}.png`
    cardImg.classList.add('cards')
    playerCardsDiv.append( cardImg );

    if( playerPoints > 21 ) {
        console.warn('Te pasaste de 21');
        btnGet.disabled = true;
    } else if ( playerPoints === 21 ) {
        console.warn('21, genial!');
        btnGet.disabled = true;

    }
});

