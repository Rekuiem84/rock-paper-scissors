const playerScoreDisplay = document.querySelector(".player-score");
const computerScoreDisplay = document.querySelector(".comp-score");
let playerScore = 0;
let computerScore = 0;

const variantDisplay = document.querySelector(".variant-name");
const toggleLSVariant = document.querySelector(".toggle-variant[name=ls]");
const variantChoicesContainer = document.querySelector(
	".choice-cont.ls-variant"
);
let gameVariant = "normal";

const resultMessage = document.querySelector(".result-message");
const playerChoiceDisplay = document.querySelector(".player-choice");
const computerChoiceDisplay = document.querySelector(".comp-choice");

const choiceButtons = document.querySelectorAll(".choice");
const rockButton = document.querySelector(".rock");
const paperButton = document.querySelector(".paper");
const scissorsButton = document.querySelector(".scissors");
const lizardButton = document.querySelector(".lizard");
const spockButton = document.querySelector(".spock");

const resetButton = document.querySelector(".reset");

toggleLSVariant.addEventListener("click", () => {
	if (toggleLSVariant.checked) {
		gameVariant = "lizard-spock";
		variantDisplay.style.visibility = "visible";
		variantChoicesContainer.style.visibility = "visible";
	} else {
		gameVariant = "normal";
		variantDisplay.style.visibility = "hidden";
		variantChoicesContainer.style.visibility = "hidden";
	}
});

choiceButtons.forEach((button) => {
	button.addEventListener("click", () => {
		if (toggleLSVariant.checked) {
			variantDisplay.style.visibility = "visible";
		}
		let playerChoice = button.value;
		let computerChoice = computerPlay(gameVariant);
		playerChoiceDisplay.textContent = playerChoice;
		computerChoiceDisplay.textContent = computerChoice;
		playRound(playerChoice, computerChoice);
	});
});

function computerPlay(variant) {
	let choices = ["rock", "paper", "scissors"];
	if (variant === "lizard-spock") {
		choices = ["rock", "paper", "scissors", "lizard", "spock"];
	}
	let computerChoice = choices[Math.floor(Math.random() * choices.length)];
	return computerChoice;
}

function playRound(playerChoice, computerChoice) {
	if (playerChoice === computerChoice) {
		resultMessage.textContent = "It's a tie!";
		resultMessage.classList.value = "result-message tie";
	} else if (
		// all win conditions
		(playerChoice === "rock" && computerChoice === "scissors") ||
		(playerChoice === "paper" && computerChoice === "rock") ||
		(playerChoice === "scissors" && computerChoice === "paper") ||
		// lizard-spock variant win conditions
		(playerChoice === "rock" && computerChoice === "lizard") ||
		(playerChoice === "paper" && computerChoice === "spock") ||
		(playerChoice === "scissors" && computerChoice === "lizard") ||
		(playerChoice === "lizard" && computerChoice === "spock") ||
		(playerChoice === "lizard" && computerChoice === "paper") ||
		(playerChoice === "spock" && computerChoice === "scissors") ||
		(playerChoice === "spock" && computerChoice === "rock")
	) {
		win();
	} else {
		lose();
	}
}

function win() {
	resultMessage.textContent = "You win!";
	resultMessage.classList.value = "result-message win";
	playerScoreDisplay.textContent = ++playerScore;
}
function lose() {
	resultMessage.textContent = "You lose!";
	resultMessage.classList.value = "result-message lose";
	computerScoreDisplay.textContent = ++computerScore;
}

resetButton.addEventListener("click", (e) => {
	e.preventDefault();
	playerScore = 0;
	computerScore = 0;
	playerScoreDisplay.textContent = playerScore;
	computerScoreDisplay.textContent = computerScore;
	resultMessage.textContent = "Let's play!";
	resultMessage.classList.value = "result-message win";
});
