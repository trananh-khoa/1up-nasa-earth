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

let gameRounds = 0          // Tracker for how mahy games have been played
let successfullRounds = 0   // Tracker for how many games have been completed
let failedRounds = 0        // Tracker for how many games have been failed

////////////////////////////////////////////////////////////////////////////////
/* LAH MENU                                                                   */
////////////////////////////////////////////////////////////////////////////////

$('#lah-menu-start-button').on('click', () => {
    alert('PLAYER IS STARTING THE GAME!')
})