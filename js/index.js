const participants = [
    { name: 'Participant 1', secretCode: ['red', 'green', 'blue', 'yellow'] },
    { name: 'Participant 2', secretCode: ['orange', 'purple', 'red', 'blue'] },
    { name: 'Participant 3', secretCode: ['yellow', 'green', 'purple', 'orange'] },
    { name: 'Participant 4', secretCode: ['blue', 'yellow', 'orange', 'green'] },
    { name: 'Participant 5', secretCode: ['green', 'orange', 'yellow', 'blue'] },
    { name: 'Participant 6', secretCode: ['purple', 'blue', 'green', 'red'] },
    { name: 'Participant 7', secretCode: ['orange', 'purple', 'yellow', 'red'] },
    { name: 'Participant 8', secretCode: ['blue', 'red', 'orange', 'yellow'] },
    { name: 'Participant 9', secretCode: ['yellow', 'green', 'red', 'purple'] },
    { name: 'Participant 10', secretCode: ['purple', 'orange', 'green', 'blue'] },
    { name: 'Participant 11', secretCode: ['red', 'blue', 'yellow', 'green'] },
    { name: 'Participant 12', secretCode: ['green', 'yellow', 'blue', 'orange'] },
    { name: 'Participant 13', secretCode: ['orange', 'red', 'yellow', 'green'] },
    { name: 'Participant 14', secretCode: ['blue', 'green', 'purple', 'red'] },
    { name: 'Participant 15', secretCode: ['yellow', 'orange', 'red', 'green'] },
    { name: 'Participant 16', secretCode: ['purple', 'yellow', 'blue', 'orange'] },
    { name: 'Participant 17', secretCode: ['green', 'red', 'orange', 'yellow'] },
    { name: 'Participant 18', secretCode: ['orange', 'blue', 'red', 'purple'] },
    { name: 'Participant 19', secretCode: ['red', 'yellow', 'green', 'blue'] },
    { name: 'Participant 20', secretCode: ['blue', 'orange', 'purple', 'green'] },
    { name: 'Participant 21', secretCode: ['green', 'blue', 'yellow', 'orange'] },
    { name: 'Participant 22', secretCode: ['yellow', 'red', 'orange', 'purple'] },
    { name: 'Participant 23', secretCode: ['purple', 'green', 'red', 'blue'] },
    { name: 'Participant 24', secretCode: ['orange', 'yellow', 'blue', 'red'] },
    { name: 'Participant 25', secretCode: ['red', 'orange', 'purple', 'yellow'] },
    { name: 'Participant 26', secretCode: ['blue', 'purple', 'green', 'orange'] },
    { name: 'Participant 27', secretCode: ['yellow', 'blue', 'orange', 'red'] },
    { name: 'Participant 28', secretCode: ['green', 'red', 'purple', 'blue'] }
];

let selectedParticipantIndex = null;
let currentGuess = [];

// Function to display the message
function displayMessage(message, color = 'white') {
    let messageElement = document.getElementById('message');
    messageElement.style.color = color;
    messageElement.textContent = message;
}

function loadGame() {
    const participantIndex = document.getElementById('participants').value;
    if (participantIndex !== "") {
        selectedParticipantIndex = parseInt(participantIndex);
        currentGuess = [];
        clearGame();
        document.getElementById('gameBoard').style.display = 'block';
    } else {
        selectedParticipantIndex = null;
        document.getElementById('gameBoard').style.display = 'none';
    }
}

function clearGame() {
    displayGuess();
    displayResult(0, 0);
    displayMessage('');
}

function selectColor(color) {
    if (currentGuess.length < 4) {
        currentGuess.push(color);
        displayGuess();
    }
}

// Function to reset the current guess
function tryAgain() {
    currentGuess = [];
    clearGame();
}

// Function to remove the last color from the guess
function backspace() {
    currentGuess.pop();
    clearGame();
}

function displayGuess() {
    const guessCode = document.getElementById('guessCode');
    guessCode.innerHTML = '';
    currentGuess.forEach(color => {
        const peg = document.createElement('div');
        peg.className = 'peg';
        peg.style.backgroundColor = color;
        guessCode.appendChild(peg);
    });
}

function checkSolution() {
    if (selectedParticipantIndex == null) {
        displayMessage("Please select a participant.");
    }
    else if (currentGuess.length < 4) {
        displayMessage("Please choose four colors.");
    } else {
        displayMessage('');
        const participant = participants[selectedParticipantIndex];
        if (participant == null) {
            displayMessage('This participant has an invalid secret code, please choose another one.');
            return;
        }
        let secretCode = participant.secretCode.slice();
        let guess = currentGuess.slice();
        let blackPegs = 0;
        let whitePegs = 0;

        // Count black pegs
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === secretCode[i]) {
                blackPegs++;
                guess[i] = null;
                secretCode[i] = null;
            }
        }

        // Count white pegs
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] !== null) {
                const index = secretCode.indexOf(guess[i]);
                if (index !== -1) {
                    whitePegs++;
                    secretCode[index] = null;
                }
            }
        }
        

        displayResult(blackPegs, whitePegs);

        // Inside checkSolution function
        if (blackPegs === 0 && whitePegs === 0) {
            displayMessage("No pegs matched.", 'red');
        } else if (blackPegs === 4) {
            displayMessage("Congratulations! You've won!");
        }
    }
}

function displayResult(blackPegs, whitePegs) {
    const result = document.getElementById('result');
    result.innerHTML = '';
    for (let i = 0; i < blackPegs; i++) {
        const peg = document.createElement('div');
        peg.className = 'peg';
        peg.style.backgroundColor = 'black';
        result.appendChild(peg);
    }
    for (let i = 0; i < whitePegs; i++) {
        const peg = document.createElement('div');
        peg.className = 'peg';
        peg.style.backgroundColor = 'white';
        result.appendChild(peg);
    }
}