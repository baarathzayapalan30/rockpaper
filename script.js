
/* ==============================
   ELEMENTS
============================== */

const gameArea = document.getElementById("gameArea");
const resultArea = document.getElementById("resultArea");

const playerChoice = document.getElementById("playerChoice");
const computerChoice = document.getElementById("computerChoice");

const resultText = document.getElementById("resultText");
const scoreElement = document.getElementById("score");

const playAgainButton = document.getElementById("playAgain");

const rulesButton = document.getElementById("rulesButton");
const rulesModal = document.getElementById("rulesModal");
const closeRulesButton = document.getElementById("closeRules");


/* ==============================
   GAME DATA
============================== */

const choices = {
    rock: "./images/icon-rock.svg",
    paper: "./images/icon-paper.svg",
    scissors: "./images/icon-scissors.svg"
};

const computerChoices = [
    "rock",
    "paper",
    "scissors"
];


/* ==============================
   SCORE
============================== */

let score = Number(localStorage.getItem("gameScore")) || 0;

scoreElement.textContent = score;


/* ==============================
   PLAYER SELECTION
============================== */

document.querySelectorAll(".choice").forEach(button => {

    button.addEventListener("click", () => {

        const selectedChoice = button.dataset.choice;

        playGame(selectedChoice);

    });

});


/* ==============================
   COMPUTER SELECTION
============================== */

function getComputerChoice() {

    const randomIndex = Math.floor(
        Math.random() * computerChoices.length
    );

    return computerChoices[randomIndex];

}


/* ==============================
   DETERMINE WINNER
============================== */

function getWinner(player, computer) {

    if (player === computer) {
        return "draw";
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {

        return "win";

    }

    return "lose";

}


/* ==============================
   PLAY GAME
============================== */

function playGame(player) {

    const computer = getComputerChoice();

    const result = getWinner(player, computer);


    // Display player selection

    displayChoice(playerChoice, player);

    // Display computer selection

    displayChoice(computerChoice, computer);


    // Remove previous winner effects

    playerChoice.classList.remove("winner");
    computerChoice.classList.remove("winner");


    // Update score and result

    if (result === "win") {

        score++;

        resultText.textContent = "YOU WIN";

        playerChoice.classList.add("winner");

    }

    else if (result === "lose") {

        score--;

        resultText.textContent = "YOU LOSE";

        computerChoice.classList.add("winner");

    }

    else {

        resultText.textContent = "DRAW";

    }


    // Save score

    localStorage.setItem("gameScore", score);

    scoreElement.textContent = score;


    // Switch screens

    gameArea.style.display = "none";

    resultArea.hidden = false;

}


/* ==============================
   DISPLAY CHOICE
============================== */

function displayChoice(container, choice) {

    container.className = "result-circle " + choice;

    container.innerHTML = `
        <img src="${choices[choice]}" alt="${choice}">
    `;

}


/* ==============================
   PLAY AGAIN
============================== */

playAgainButton.addEventListener("click", () => {

    resultArea.hidden = true;

    gameArea.style.display = "block";

});


/* ==============================
   OPEN RULES
============================== */

rulesButton.addEventListener("click", () => {

    rulesModal.hidden = false;

});


/* ==============================
   CLOSE RULES
============================== */

closeRulesButton.addEventListener("click", () => {

    rulesModal.hidden = true;

});


/* ==============================
   CLOSE WHEN CLICKING OUTSIDE
============================== */

rulesModal.addEventListener("click", (event) => {

    if (event.target === rulesModal) {

        rulesModal.hidden = true;

    }

});


/* ==============================
   CLOSE WITH ESCAPE KEY
============================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        rulesModal.hidden = true;

    }

});
