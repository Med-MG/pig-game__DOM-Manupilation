/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScores, activePlayer, ableToplay;
Init();


//role the dice and add roundScore
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (ableToplay) {
        //1. Random Number
        var dice = Math.floor(Math.random() * 6 + 1);

        //2. Display that number
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score IF the rolled number was not a 1

        if (dice !== 1) {
            //Add Score
            roundScores += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            NextPLayer();
        }
    }


});



//Holding the score and passing to next player
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (ableToplay) {
        scores[activePlayer] += roundScores;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 20) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
            document.querySelector('.dice').style.display = 'none';
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
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', Init);

//Initilazing Function
function Init() {
    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    ableToplay = true;


    document.querySelector('.dice').style.display = 'none';

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




//document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-0').innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);