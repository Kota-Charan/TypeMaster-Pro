const levels = {
    easy: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    medium: ["coding", "syntax", "github", "variable", "function", "array", "object"],
    hard: ["Patience is the key to mastering code.", "Always keep learning and building.", "Clean code is a sign of a professional.","The quick brown fox jumps over the lazy dog.","Pack my box with five dozen liquor jugs","Sphinx of black quartz, judge my vow.","How vexingly quick daft zebras jump!"]
};

let currentTarget = "";
let startTime;
let timerInterval;
let isRunning = false;

// DOM Elements
const displayArea = document.getElementById('display-area');
const inputField = document.getElementById('input-field');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const levelSelect = document.getElementById('level-select');
const levelName = document.getElementById('level-name');

const startBtn = document.getElementById('startBtn'); 
const endBtn = document.getElementById('endBtn'); 

function startTest() {
    const bank = levels[levelSelect.value];
    currentTarget = bank[Math.floor(Math.random() * bank.length)];
    
    // Update UI
    levelName.innerText = levelSelect.options[levelSelect.selectedIndex].text.split(':')[0];
    displayArea.innerText = currentTarget;
    displayArea.style.color = "white";
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();
    
    // Toggle buttons
    startBtn.disabled = true;
    endBtn.disabled = false;
    levelSelect.disabled = true;
    
    clearInterval(timerInterval);
    isRunning = false;
    timerDisplay.innerText = "0";
    wpmDisplay.innerText = "0";
}

inputField.addEventListener('input', () => {
    // Start timer on first keystroke
    if (!isRunning && inputField.value.length > 0) {
        isRunning = true;
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    const val = inputField.value;

    if (val === currentTarget) {
        completeLevel();
    } else if (currentTarget.startsWith(val)) {
        inputField.style.borderColor = "#4ade80"; // Success green
    } else {
        inputField.style.borderColor = "#f87171"; // Error red
    }
});

function updateTimer() {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.innerText = seconds;
    
    if (seconds > 0) {
        const wpm = Math.round(((inputField.value.length / 5) / (seconds / 60)));
        wpmDisplay.innerText = wpm;
    }
}

function completeLevel() {
    clearInterval(timerInterval);
    displayArea.innerText = "Correct! Get Ready...";
    displayArea.style.color = "#4ade80";
    inputField.disabled = true;
    inputField.style.borderColor = "#334155";
    setTimeout(startTest, 1200); 
}

// Button Listeners
startBtn.addEventListener('click', startTest);

endBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
    
    inputField.disabled = true;
    inputField.value = "";
    inputField.style.borderColor = "#334155";
    displayArea.innerText = "Session Ended. Press Start to try again.";
    displayArea.style.color = "white";
    
    startBtn.disabled = false;
    endBtn.disabled = true;
    levelSelect.disabled = false;
});