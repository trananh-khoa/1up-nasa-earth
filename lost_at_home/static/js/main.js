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
let game_timer = 60

const GAME_ID = {
    startbutton: '', // $()
    question: '',
    image: '',
    options1: '',
    options2: '',
    options3: '',
    options4: '',
    lives: '',
    timer: ''
}
// HOLDS ALL IDS FOR RELEVANT ELEMENTS
// QUESTION ID
// IMAGE ID
// FOUR BUTTONS ID
// LIVES ID
// TIMER PROGRESS BAR ID

let gameRounds = 0          // Tracker for how many games have been played
let successfullRounds = 0   // Tracker for how many games have been completed
let failedRounds = 0        // Tracker for how many games have been failed

// SEND INITIAL AJAX REQUEST TO GET FIRST MINIGAME
$.ajax({
    type: 'GET',
    url: '/minigame',
    success: function (data) {
    },
    dataType: 'json'
});

// FOR LOOP ONLY TRIGGERS ONCE START BUTTON IS CLICKED
function getMinigame() {
    for (let i = 0; i < TOTAL_GAMES; i++) {
        // UPDATE VALUES FOR ROUND (gameRounds + 1 --> ID SPAN)
        // LOAD (SHOW) THE FIRST MINIGAME
        // DISPLAY IMAGE (ID IMAGE)
        $(GAME_ID.image).html(data.image);
        // DISPLAY QUESTION (ID QUESTIONS)
        $(GAME_ID.question).html(data.question);
        // DISPLAY CHOICES (ID BUTTONS)
        $(GAME_ID.options1).html(data.buttons1);
        $(GAME_ID.options2).html(data.buttons2);
        $(GAME_ID.options3).html(data.buttons3);
        $(GAME_ID.options4).html(data.buttons4);
        // SEND AJAX FOR NEXT MINIGAME
        $.ajax({
            type: 'GET',
            url: '/api/minigame',
            success: function (data2) {
            },
            dataType: 'json'
        });
        // SET TIMER AND LISTEN FOR BUTTON CLICK
        timer()
            .addEventListener("click", userTemp = /*userclicked*/);
        // COMPARE BUTTON CLICK OR TIMER END TO DETERMINE SUCCESS/FAIL
        if (data.answer === /*userclick*/) {
            successfullRounds++
            timerReset()
        }
        else {
            failedRounds++
            timerReset()
        }
        // LOOP AGAIN

        if (failedRounds === TOTAL_LIVES || /*resetButton*/) {
            break;
        }

        // BREAK CONDITIONS
        // RESET BUTTON
        // failedRounds === TOTAL_LIVES)
    }

}
////////////////////////////////////////////////////////////////////////////////
/* LAH MENU                                                                   */
////////////////////////////////////////////////////////////////////////////////

$('#lah-menu-start-button').on('click', () => {
    // CHECK ID FOR START BUTTON
    // STARTS GAME
})

$('#lah-menu-intructions-button').on('click', () => {
    // CHECK ID FOR MODAL BUTTON
    // IS THIS EVEN NEEDED?
})

function GameLogic() {
    for (var i; i < 11; i++) {
        getQuestion();

    }
}

function getMinigame() {
    $.ajax({
        type: 'GET',
        url: '/api/minigame',
        success: function (data) {
            var questionsInfo = {
                question: data.question,
                image: data.image,
                options: options.image
            }
            var answer = {
                qAnswer: data.answer
            }
            $('tbody').html(questionsInfo);
            timer()
            // wait for user click code 
            // get click answer and store in var
            var userClick
            answerValidation(userClick, answer)
        },
        dataType: 'json'
    });
}

function answerValidation(userAnswer, actualAnswer) {
    if (userAnswer === actualAnswer) {
        successfullRounds++;
        //update user square
        // get to next question?
    }
    else {
        TOTAL_LIVES--;
        // update the HTML
        if (TOTAL_LIVES === 0) {
            // you lost
        }
        else {
            // get to next question 
        }
    }
}

function timer() {
    var countDownTimer = setInterval(function () {
        // need to put this in html <div id="countdown"></div>
        document.getElementById("countdown").innerHTML = GAME_TIMER + " seconds remaining";
        GAME_TIMER -= 1;
        if (GAME_TIMER <= 0) {
            clearInterval(countDownTimer);
            document.getElementById("countdown").innerHTML = "you are out of time"
        }
    }, 1000);
}


GAME_ID.startbutton.addEventListener("click", getMinigame);
// startButton.addEventListener("click", );
submitButton.addEventListener("click", answerValidation);
