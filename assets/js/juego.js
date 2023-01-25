(() => {
    'use strict'

    let deck = [];
    const types = ['C', 'D', 'H', 'S'];
    const specials = ['A', 'J', 'Q', 'K']

    let playerPoints = 0;
    let computerPoints = 0;

    //Referencias HTML
    const btnNew = document.querySelector('#btnNew');
    const btnGet = document.querySelector('#btnGet');
    const btnStop = document.querySelector('#btnStop');

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

    //Turno computadora
    const computerTurn = ( minimunPoints ) => {
        do {
            const card = getOneCard();
            computerPoints = computerPoints + cardValue( card );
            htmlPoints[1].innerText = computerPoints;

            const cardImg = document.createElement('img');
            cardImg.src = `/assets/cartas/${card}.png`
            cardImg.classList.add('cards')
            computerCardsDiv.append( cardImg );

            if( minimunPoints > 21 ) {
                break;
            }

        } while ( ( computerPoints < minimunPoints ) && ( minimunPoints <= 21 ) );

        setTimeout(() => {

            if( computerPoints === minimunPoints ) {
                alert('You tied');
            }else if ( minimunPoints > 21 ) {
                alert('Computer wins');
            }else if ( computerPoints> 21 ) {
                alert('You win');
            }else{
                alert('Computer wins')
            }

        }, 10);

    }

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
            btnStop.disabled = true;
            computerTurn(playerPoints);
        } else if ( playerPoints === 21 ) {
            console.warn('21, genial!');
            btnGet.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);

        }
    });

    btnStop.addEventListener('click', () => {
        btnGet.disabled = true;
        btnStop.disabled = true;
        computerTurn(playerPoints);
    });

    btnNew.addEventListener('click', () => {
        console.clear();
        deck=[];
        deck = newDeck();
        playerPoints = 0;
        computerPoints = 0;
        htmlPoints[0].innerText = 0;
        htmlPoints[1].innerText = 0;
        playerCardsDiv.innerHTML = '';
        computerCardsDiv.innerHTML = '';
        btnGet.disabled = false;
        btnStop.disabled = false;

    });
})(); 
