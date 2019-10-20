// JS file to contain all UI logic

////////////////////////////////////////////////////////////////////////////////
/* GAME LOGIC                                                                 */
////////////////////////////////////////////////////////////////////////////////

const TOTAL_GAMES = 10      // Max number of games to win
const TOTAL_LIVES = 3       // Max number of lives

const SUCCESS_MESSAGE = 'Correct!'
const FAILURE_MESSAGE = 'Incorrect!'
const GAME_SUCCESS_MESSAGE = 'Congratulations!'
const GAME_FAILURE_MESSAGE = 'Better luck next time!'
const GAME_TIME_LIMIT = 60

const GAME_IDS = {
    gameRoundText: $('#lah-minigame-round'),
    gameQuestionText: $('#lah-minigame-question-text'),
    startbutton: $('#lah-menu-start-button'),
    image: $('#lah-minigame-img'),
    buttons: $('#lah-minigame-options'),
    options1: $('#lah-optionA'),
    options2: $('#lah-optionB'),
    options3: $('#lah-optionC'),
    options4: $('#lah-optionD'),
    lives1: $('#lah-lives-1'),
    lives2: $('#lah-lives-2'),
    lives3: $('#lah-lives-3'),
    timerValue: $('#lah-progress-bar-value'),
    timerBar: $('#lah-progress-bar')
}

let gameRounds = 0          // Tracker for how many games have been played
let successfullRounds = 0   // Tracker for how many games have been completed
let failedRounds = 0        // Tracker for how many games have been failed
let minigameData = ''
let waitingforUserInput = false
let minigameChoice = ''

function startGame() {
    for (let i = 0; i < TOTAL_GAMES; i++) {
        // Update rounds
        gameRounds = i + 1
        GAME_IDS.gameRoundText.text(gameRounds)

        // Get Minigame Data
        getMinigameData()

        // Update minigame UI
        updateMinigameUI(minigameData)

        // Listen for input
        waitingforUserInput = true
        while(waitingforUserInput) {
            console.log('Waiting for answer...')
            setTimeout(1000)
        }

        // Check answer
        if (minigameChoice === minigameData.answer) {
            console.log('Correct answer!')
        } else {
            console.log('Failed question!')
            failedRounds = failedRounds + 1
        }

    }
}

function getMinigameData() {
    return $.getJSON('/minigame', function(result) {
        console.log(result)
        minigameData = JSON.parse(result)
        console.log(minigameData)
    })
}

function updateMinigameUI(minigameData) {
    // Update image
    GAME_IDS.image.attr('src', minigameData.img_path);

    // Update question
    GAME_IDS.gameQuestionText.text(minigameData.question)

    // Update choices
    GAME_IDS.options1.text(minigameData.choices[0])
    GAME_IDS.options2.text(minigameData.choices[1])
    GAME_IDS.options3.text(minigameData.choices[2])
    GAME_IDS.options4.text(minigameData.choices[3])
}

////////////////////////////////////////////////////////////////////////////////
/* LAH MENU                                                                   */
////////////////////////////////////////////////////////////////////////////////

GAME_IDS.startbutton.on('click', () => {
    startGame()
})

GAME_IDS.buttons.find('.btn').on('click', function() {
    minigameChoice = this.text()
    waitingforUserInput = false
})
