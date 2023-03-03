'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const  diceEL = document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting conditions 
const init = function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEL.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active'); 
};
init();

const switchPlayer = function(){
document.getElementById(`current--${activePlayer}`).textContent = 0;
currentScore = 0;
activePlayer = activePlayer === 0 ? 1:0;
player0El.classList.toggle('player--active');
player1El.classList.toggle('player--active');
} 
//Rolling dice functionality...
btnRoll.addEventListener('click', function(){
    if (playing){
    // Generating a random dice roll 
const dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice); 
    //2 display dice 
diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3 check for rolled 1
    if (dice !==1){
        //add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else{
        //switch to next player
        switchPlayer();
    }
}
});

btnHold.addEventListener('click', function(){
    if(playing){
    //1 add currrent score to active player score
    scores[activePlayer] += currentScore;
    // scores[1]= scores[1]+ currentScore
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
    //2 check if players score is >= 100

    if (scores[activePlayer]>=20){
            // finish the game
            playing = false;
            diceEL.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }else {
 // switch to the next player
    switchPlayer();
    }
}
});

btnNew.addEventListener('click', init);