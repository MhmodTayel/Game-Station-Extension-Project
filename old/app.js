// Array of cards
let cards = [
  'fa fa-cube',
  'fa fa-cube',
  'fa fa-paper-plane-o',
  'fa fa-paper-plane-o',
  'fa fa-bicycle',
  'fa fa-bicycle',
  'fa fa-bomb',
  'fa fa-bomb',
  'fa fa-leaf',
  'fa fa-leaf',
  'fa fa-diamond',
  'fa fa-diamond',
  'fa fa-anchor',
  'fa fa-anchor',
  'fa fa-bolt',
  'fa fa-bolt'
];

//declare global variables

let firstCard;
let secondCard;
let moveCounter = 0;
let matchCounter = 0;
let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let starCount = 3;
const deck = document.querySelector(".deck");
const displayTime = document.getElementById("time");
const restartGame = document.getElementById("restart");
restartGame.addEventListener("click", restart);
const modal = document.querySelector("#gameOverModal");
document.querySelector("#closeBtn").addEventListener("click", restart);

//Generate HTML for deck
function createDeck() {
    let shuffledCards = shuffle(cards);
    deck.innerHTML = "";
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < shuffledCards.length; i++) {
        let card = document.createElement("li");
        let cardFace = document.createElement("i");
        cardFace.className = shuffledCards[i];
        card.classList.add("card");
        card.appendChild(cardFace);
        deck.appendChild(card);
        card.addEventListener("click", checkCard);

    }
    deck.appendChild(fragment);
    startTimer();
}

//Flip card when clicked and assign cards to variables

function checkCard() {
    if (!firstCard) {
        firstCard = this;
        firstCard.removeEventListener('click', checkCard);
        firstCard.classList.add('show','open');
    } else if (!secondCard) {
        secondCard = this;
        secondCard.removeEventListener('click', checkCard);
        secondCard.classList.add('show','open');
        moveCounter++
        document.getElementById("moves").textContent = moveCounter + " Moves";
        calcStars();
        document.body.style.pointerEvents = "none";
    }
    checkMatch();
}

//Compare first and second card to see if there is a match

function checkMatch() {
    if (firstCard.firstChild.className === secondCard.firstChild.className) {
        firstCard.classList.add('match','animated','bounce');
        secondCard.classList.add('match','animated','bounce');
        firstCard = null;
        secondCard = null;
        matchCounter++;
        checkWin();
    } else {
            firstCard.classList.add('no-match','animated','shake');
            secondCard.classList.add('no-match','animated','shake');
        setTimeout(function () {
            document.body.style.pointerEvents = "initial";
            firstCard.addEventListener('click', checkCard);
            firstCard.classList.remove('open','show');
            secondCard.addEventListener('click', checkCard);
            secondCard.classList.remove('open','show');
            firstCard.classList.remove('no-match','animated','shake');
            secondCard.classList.remove('no-match','animated','shake');
            firstCard = null;
            secondCard = null;
        }, 1000)
    }
}

//Start timer

function startTimer() {
    timer = setInterval(function () {
        seconds++;
        if (seconds >= 60) {
            minutes++;
            seconds = 0;
            if (minutes >= 60) {
                hours++;
                minutes = 0;
            }
        }
        displayTime.textContent = "Time " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    }, 500)
}

//check if game is over and stop timer

function checkWin() {
    document.body.style.pointerEvents = "initial";
    if (matchCounter === 8) {
      clearInterval(timer);
      showResult();
    }
}

//calculate amount of stars
function calcStars(){
const stars = document.querySelector(".stars");
switch (moveCounter){
   case 15:
   stars.children[0].innerHTML = '<i class="fa fa-star-o"></i>';
   starCount--;
   break;
   case 20:
   stars.children[1].innerHTML = '<i class="fa fa-star-o"></i>';
   starCount--;
   break;
}

}

//show modal with final score
function showResult(){
  const modal = document.querySelector("#gameOverModal");
  document.getElementById("modalBody").children[0].textContent = "Your time was " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
if (starCount > 1 ){
  document.getElementById("modalBody").children[1].innerHTML = "You made " + moveCounter + " moves, and scored " + starCount + " stars!";
}else{document.getElementById("modalBody").children[1].innerHTML = "You made " + moveCounter + " moves, and scored " + starCount + " star!";
}
  modal.style.display = "block";
}

//restart game
function restart() {
    clearInterval(timer);
    timer = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    displayTime.textContent = "Time " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    createDeck();
    firstCard = null;
    secondCard = null;
    moveCounter = 0;
    matchCounter = 0;
    let starCount = 5;
    document.getElementById("moves").textContent = moveCounter + " Moves";
    makeStars();
    modal.style.display = "none";



}

//function to reset stars
function makeStars(){
  const stars = document.querySelector(".stars");
  for (let i = 0; i < 3 ; i++){
    stars.children[i].innerHTML = '<i class="fa fa-star"></i>';
  }

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

createDeck();
