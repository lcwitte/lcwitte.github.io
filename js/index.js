const participants = [
    { name: 'Participant 1', secretCode: ['red', 'green', 'blue', 'yellow'] },
    { name: 'Participant 2', secretCode: ['orange', 'purple', 'red', 'blue'] }
    // Add more participants with their secret codes as needed
];

let selectedParticipantIndex = null;
let currentGuess = [];

function loadGame() {
    const participantIndex = document.getElementById('participants').value;
    if (participantIndex !== "") {
        selectedParticipantIndex = parseInt(participantIndex);
        currentGuess = [];
        displayGuess();
        document.getElementById('gameBoard').style.display = 'block';
    } else {
        selectedParticipantIndex = null;
        document.getElementById('gameBoard').style.display = 'none';
    }
}

function selectColor(color) {
    if (currentGuess.length < 4) {
        currentGuess.push(color);
        displayGuess();
    }
}

function displayGuess() {
    const guessPegs = document.getElementById('guessPegs');
    guessPegs.innerHTML = '';
    currentGuess.forEach(color => {
        const peg = document.createElement('div');
        peg.className = 'peg';
        peg.style.backgroundColor = color;
        guessPegs.appendChild(peg);
    });
}

function checkSolution() {
    if (selectedParticipantIndex !== null) {
        const participant = participants[selectedParticipantIndex];
        let blackPegs = 0;
        let whitePegs = 0;
        const guess = currentGuess.slice();

        // Count black pegs
        for (let i = 0; i < participant.secretCode.length; i++) {
            if (guess[i] === participant.secretCode[i]) {
                blackPegs++;
                guess[i] = null;
            }
        }

        // Count white pegs
        for (let i = 0; i < participant.secretCode.length; i++) {
            const index = guess.indexOf(participant.secretCode[i]);
            if (index > -1) {
                whitePegs++;
                guess[index] = null;
            }
        }

        displayResult(blackPegs, whitePegs);
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