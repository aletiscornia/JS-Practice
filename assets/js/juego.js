const myModule = (() => {
    'use strict'

    let deck = [];
    const types = ['C', 'D', 'H', 'S'];
    const specials = ['A', 'J', 'Q', 'K']

    let playersPoints = [];

    //Referencias HTML
    const btnNew = document.querySelector('#btnNew');
    const btnGet = document.querySelector('#btnGet');
    const btnStop = document.querySelector('#btnStop');

    const  cardsPlayersDiv = document.querySelectorAll('.cardDiv')
    const htmlPoints = document.querySelectorAll('small');

    const startNewGame = (numplayers = 2) => {
        deck = newDeck();

        playersPoints = [];
        for(let i = 0; i < numplayers; i++) {
            playersPoints.push(0);
        }

        htmlPoints.forEach(elem => elem.innerText = 0 );
        cardsPlayersDiv.forEach(elem => elem.innerHTML = '');

        btnGet.disabled = false;
        btnStop.disabled = false;
    }
    //Crea nuevo deck
    const newDeck = () => {
        deck = [];
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

        return _.shuffle( deck );
    }

    //Pedir una carta
    const getOneCard = () => {
        if ( deck.length === 0 ) {
            throw 'The deck is empty'
        }

        return deck.pop();
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1 );
        return ( isNaN( value ) ) ?
                    ( value === 'A' ) ? 11 : 10
                    : value * 1;
    }
    const accumulatePlayerPoints = (card, turn) => {
        playersPoints[turn] = playersPoints[turn] + cardValue( card );
        htmlPoints[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    };

    const createCard = (card, turn) => {
        const cardImg = document.createElement('img');
            cardImg.src = `/assets/cartas/${card}.png`
            cardImg.classList.add('cards')
            cardsPlayersDiv[turn].append( cardImg );
    };

    //Ganador
    const winner = () => {
        const [ minimunPoints, computerPoints ] = playersPoints;

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
    };

    //Turno computadora
    const computerTurn = ( minimunPoints ) => {
        let computerPoints = 0;
        do {
            const card = getOneCard();
            computerPoints = accumulatePlayerPoints(card, playersPoints.length - 1 );
            createCard(card, playersPoints.length - 1);

        } while ( ( computerPoints < minimunPoints ) && ( minimunPoints <= 21 ) );
        winner();
    }

    //Eventos
    btnGet.addEventListener('click', () => {
        const card = getOneCard();
        const playerPoints = accumulatePlayerPoints(card, 0);

        createCard(card, 0)

        if( playerPoints > 21 ) {
            btnGet.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);
        } else if ( playerPoints === 21 ) {
            btnGet.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);

        }
    });

    btnStop.addEventListener('click', () => {
        btnGet.disabled = true;
        btnStop.disabled = true;
        computerTurn(playersPoints[0]);
    });

    btnNew.addEventListener('click', () => {
        startNewGame();
    });

    return {
        newGame: startNewGame
    };
})();
