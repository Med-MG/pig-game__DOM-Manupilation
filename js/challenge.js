/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
Additional rules to the game:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScores, activePlayer, ableToplay, diceVal, diceVal2;
Init();


//role the dice and add roundScore
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (ableToplay) {
        //1. Random Number for dice1 ****************Dice 1*************
        var dice = Math.floor(Math.random() * 6 + 1);
        dice === 6 ? diceVal += 1 : diceVal = 0;
        //2. Display that number
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //************************************************************ */

        //1. Random Number for dice1 ****************Dice 1*************
        var dice2 = Math.floor(Math.random() * 6 + 1);
        dice2 === 6 ? diceVal2 += 1 : diceVal2 = 0;
        //2. Display that number
        var diceDOM = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice2 + '.png';
        //************************************************************ */

        //3. Update the round score IF the rolled number was not a 1

        if (dice === 1 || diceVal === 2 || dice2 === 1 || diceVal2 === 2) {
            //Next PLayer
            NextPLayer();
        } else {
            //Add Score
            roundScores += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        }
    }



});



//Holding the score and passing to next player
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (ableToplay) {
        scores[activePlayer] += roundScores;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= document.getElementById('winingScore').value) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            ableToplay = false;
        } else {
            //Next Player
            NextPLayer();
        }
    }



});


//Next Player Function
function NextPLayer() {
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    // document.querySelector('.dice').style.display = 'none';
    // document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', Init);

//Initilazing Function
function Init() {
    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    ableToplay = true;
    diceVal = 0;
    diceVal2 = 0;


    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
}


