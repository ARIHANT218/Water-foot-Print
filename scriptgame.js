// Game Data
const scenarios = [
    {
        text: "You wake up in the morning. How do you start your day?",
        choices: [
            { text: "Take a long hot shower", footprint: 20 },
            { text: "Quick shower", footprint: 10 },
            { text: "Skip the shower", footprint: 0 },
        ]
    },
    {
        text: "It's time for breakfast. What do you eat?",
        choices: [
            { text: "Bacon and eggs", footprint: 15 },
            { text: "Cereal with milk", footprint: 8 },
            { text: "Fruits and nuts", footprint: 4 },
        ]
    },
    {
        text: "You need to go to work. How do you commute?",
        choices: [
            { text: "Drive your car", footprint: 15 },
            { text: "Carpool", footprint: 8 },
            { text: "Bike or walk", footprint: 0 },
        ]
    }
];

let currentScenarioIndex = 0;
let footprintScore = 0;

// DOM Elements
const scenarioText = document.getElementById('scenario-text');
const choicesContainer = document.getElementById('choices-container');
const footprintScoreElement = document.getElementById('footprint-score');
const startGameButton = document.getElementById('start-game');

// Start the game
startGameButton.addEventListener('click', startGame);

function startGame() {
    currentScenarioIndex = 0;
    footprintScore = 0;
    footprintScoreElement.textContent = footprintScore;
    startGameButton.style.display = 'none';
    showScenario();
}

function showScenario() {
    if (currentScenarioIndex < scenarios.length) {
        const currentScenario = scenarios[currentScenarioIndex];
        scenarioText.textContent = currentScenario.text;
        choicesContainer.innerHTML = '';
        currentScenario.choices.forEach(choice => {
            const choiceButton = document.createElement('button');
            choiceButton.textContent = choice.text;
            choiceButton.addEventListener('click', () => makeChoice(choice.footprint));
            choicesContainer.appendChild(choiceButton);
        });
    } else {
        endGame();
    }
}

function makeChoice(footprint) {
    footprintScore += footprint;
    footprintScoreElement.textContent = footprintScore;
    currentScenarioIndex++;
    showScenario();
}

function endGame() {
    scenarioText.textContent = `Game Over! Your total water footprint is ${footprintScore}.`;
    choicesContainer.innerHTML = '';
    startGameButton.textContent = 'Play Again';
    startGameButton.style.display = 'block';
    
    onLevelComplete();
}
// Function to display a water footprint tip after completing a level
function showWaterFootprintTip() {
    const tips = [
        "Fix leaks and install water-efficient fixtures to save water at home.",
        "Shorten your showers and turn off the tap while brushing your teeth.",
        "Eat less meat to reduce the water footprint associated with food production.",
        "Choose locally-sourced and organic produce to support sustainable agriculture.",
        "Use recycled products and minimize waste to reduce water used in manufacturing.",
        "Reuse water for gardening and other non-potable uses.",
        "Educate others about water conservation and support related initiatives.",
        "Check the water footprint of products before purchasing to make informed choices.",
        "Water plants wisely and grow drought-resistant plants to save water in gardening."
    ];

    // Select a random tip to display
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Create a pop-up div to show the tip
    const tipDiv = document.createElement('div');
    tipDiv.id = 'waterFootprintTip';
    tipDiv.style.position = 'fixed';
    tipDiv.style.top = '50%';
    tipDiv.style.left = '50%';
    tipDiv.style.transform = 'translate(-50%, -50%)';
    tipDiv.style.padding = '20px';
    tipDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    tipDiv.style.borderRadius = '10px';
    tipDiv.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    tipDiv.style.zIndex = '1000';
    tipDiv.style.textAlign = 'center';
    tipDiv.innerHTML = `<p>${randomTip}</p><button id="closeTip">Close</button>`;

    // Append the tip to the body
    document.body.appendChild(tipDiv);

    // Add an event listener to close the tip
    document.getElementById('closeTip').addEventListener('click', () => {
        tipDiv.remove();
    });
}

// Call this function when a level is completed
function onLevelComplete() {
    // Logic to handle level completion
    // ...

    // Show the water footprint tip
    showWaterFootprintTip();
}
function showPeriodicTip() {
    const tips = [
        // (Same tips as above)
    ];

    // Select a random tip
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Display the tip on the screen
    const tipDiv = document.getElementById('info');
    tipDiv.innerHTML = `<strong>Water Conservation Tip:</strong> ${randomTip}`;
}

// Call this function periodically, e.g., every 2 minutes
setInterval(showPeriodicTip, 120000);

// Assuming you have a sidebar or info panel with id 'info'
function updateInfoPanel() {
    const tips = [
        // (Same tips as above)
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Update the info panel with the selected tip
    document.getElementById('info').innerHTML = `<p>${randomTip}</p>`;
}

// Call this function when updating the UI, such as after completing a puzzle
updateInfoPanel();

