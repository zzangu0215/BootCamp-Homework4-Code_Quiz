// Get APIs for the Buttons
var startButton = document.getElementById("start-button");
var highScoreButton = document.getElementById("highscore-button");

var optionButton_A = document.getElementById("optionA");
var optionButton_B = document.getElementById("optionB");
var optionButton_C = document.getElementById("optionC");
var optionButton_D = document.getElementById("optionD");

var submitInitialBtn = document.getElementById("submit-initial");

var playAgainBtn = document.getElementById("play-again");
var clearScoresBtn = document.getElementById("clear-scores");

// Get API for the user initial input
var initialInput = document.getElementById("initial");

// Get APIs for the classes
var mainPageEl = document.querySelector(".main-page");
var quizInProgressEl = document.querySelector(".quiz-in-progress");
var timerEl = document.querySelector(".timer");
var questionsEl = document.querySelector(".questions");
var answerCheckEl = document.querySelector(".answer-check");
var quizOverEl = document.querySelector(".quiz-over");
var finalScoreEl = document.querySelector(".final-score");
var highScorePageEl = document.querySelector(".high-score-page");
var scoreInitialEl = document.querySelector(".score-initial");
var highestScoreEl = document.querySelector(".highest-score");

// Declare and Initialize variables
var timerCount = 100;
var questionIndex = 0;
var score = 0;
var timerInterval;

// Array of Quiz Question Object
var questionObject = [
    {
        question: "1. Inside which HTML element do we put the JavaScript?",
        optionA: "A: <script>",
        optionB: "B: <js>",
        optionC: "C: <javascript>",
        optionD: "D: <scripting>",
        answer: "A",
    }, 
    {
        question: "2. Which event occurs when the user clicks on an HTML element?",
        optionA: "A: onmouseover",
        optionB: "B: onchange",
        optionC: "C: onmouseclick",
        optionD: "D: onclick",
        answer: "D",
    }, 
    {
        question: "3. What does DOM stand for?",
        optionA: "A: Data Object Muted",
        optionB: "B: Data Oriented Model",
        optionC: "C: Document Object Model",
        optionD: "D: Domestic Object Model",
        answer: "C",
    }, 
    {
        question: "4. What HTML attribute references an external file from HTML?",
        optionA: "A: src",
        optionB: "B: section",
        optionC: "C: h3",
        optionD: "D: href",
        answer: "A",
    }, 
    {
        question: "5. If you want to store the data to your browser locally, what method should you use?",
        optionA: "A: globalStorage.setItem()",
        optionB: "B: globalStorage.getItem()",
        optionC: "C: localStorage.getItem()",
        optionD: "D: localStorage.setItem()",
        answer: "D",
    }, 
    {
        question: "6. If you want to use the data that you stored locally, what method should you use?",
        optionA: "A: globalStorage.setItem()",
        optionB: "B: globalStorage.getItem()",
        optionC: "C: localStorage.getItem()",
        optionD: "D: localStorage.setItem()",
        answer: "C",
    }, 
    {
        question: "7. To prevent bubbling on your website, what method would you use on your attribute A?",
        optionA: "A: A.noBubbling()",
        optionB: "B: A.preventBubble()",
        optionC: "C: A.preventDefault()",
        optionD: "D: None of above",
        answer: "C",
    }, 
    {
        question: "8. You want to have an action if you click a button (id=submitButton). What JavaScript method would you use?",
        optionA: "A: setAttribute()",
        optionB: "B: addEventListener()",
        optionC: "C: getAttribute()",
        optionD: "D: querySelector()",
        answer: "B",
    }, 
    {
        question: "9. What would you primarily use if you want to style your HTML?",
        optionA: "A: CSS",
        optionB: "B: node.js",
        optionC: "C: HTML",
        optionD: "D: Java",
        answer: "A",
    }, 
    {
        question: "10. When you are stuck on studying, what would you do?",
        optionA: "A: Read Documents",
        optionB: "B: Come to Office Hour",
        optionC: "C: Ask to BCS!",
        optionD: "D: All of the above",
        answer: "D",
    }
];

quizInProgressEl.style.display = "none";
quizOverEl.style.display = "none";
highScorePageEl.style.display = "none";

// functions declaration
function quizStart() {
    quizInProgressEl.style.display = "block";
    mainPageEl.style.display = "none";
    highScorePageEl.style.display = "none";
    timerEl.textContent = 100;
    answerCheckEl.textContent = '';
    displayQuestions();
    handleInterval();
}

function displayQuestions() {
    quizOverEl.style.display = "none";

    var currQuestion = questionObject[questionIndex];

    if (questionIndex === questionObject.length) {
        return showScore();
    }
    questionsEl.textContent = currQuestion.question;
    optionButton_A.textContent = currQuestion.optionA;
    optionButton_B.textContent = currQuestion.optionB;
    optionButton_C.textContent = currQuestion.optionC;
    optionButton_D.textContent = currQuestion.optionD;
}

function handleInterval() {
    timerInterval = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;

        if(timerCount < 0 && questionIndex !== questionObject.length) {
            clearInterval(timerInterval);
            alert("You ran out of TIME!");
            showScore();
        }
    }, 1000);
}

function checkAnswer(userPick) {
    //isChecked = true;
    var correctAnswer = questionObject[questionIndex].answer;

    if (correctAnswer === userPick) {
        score++;
        answerCheckEl.textContent = "Correct!";
    }
    else {
        timerCount = timerCount - 10;
        answerCheckEl.textContent = "Wrong!\nThe correct answer is: ".concat(correctAnswer);
    }

    questionIndex++;
    displayQuestions();
    
    setTimeout(function() {
        answerCheckEl.textContent = "";
    }, 1000);
}

function showScore() {
    clearInterval(timerInterval);
    quizInProgressEl.style.display = "none";
    quizOverEl.style.display = "block";

    finalScoreEl.textContent = score;
}

function submitInitial() {

    quizInProgressEl.style.display = "none";
    quizOverEl.style.display = "none";
    highScorePageEl.style.display = "block";

    var user = initialInput.value.trim();
    initialInput.value = '';
    var currentUserScores = {
        name: user.toUpperCase(),
        score: score,
    };
    var stackedUserScores = [];
    stackedUserScores = JSON.parse(localStorage.getItem("savedScores")) || [];

    if (user === "") {
        alert("Type your INITIAL correctly!");
        return;
    } else {
        stackedUserScores.push(currentUserScores);
        localStorage.setItem("savedScores", JSON.stringify(stackedUserScores));
        displayUserAndScores();
    }
}

function displayUserAndScores() {
    scoreInitialEl.textContent = "";
    var stackedUserScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    var numOfUsers = stackedUserScores.length;
    var space = ": ";

    for(var i=0; i<numOfUsers; i++) {
        var nameScoreStack = document.createElement("li");

        nameScoreStack.textContent = stackedUserScores[i].name.concat(space, stackedUserScores[i].score);
        scoreInitialEl.appendChild(nameScoreStack);
    }

    var scoreArray = [];
    for(var j=0; j<numOfUsers; j++) {
        scoreArray.push(Object.values(stackedUserScores[j])[1]);
    }

    var maxScore = Math.max(...scoreArray);

    for (var k=0; k<numOfUsers; k++) {
        if (stackedUserScores[k].score === maxScore) {
            highestScoreEl.textContent = stackedUserScores[k].name.concat(space, stackedUserScores[k].score);
        }
    }

}

function gotoHighScorePage() {
    mainPageEl.style.display = "none";
    quizInProgressEl.style.display = "none";
    quizOverEl.style.display = "none";
    highScorePageEl.style.display = "block";

    playAgainBtn.textContent = "BACK TO PLAY";

    displayUserAndScores();
}

function playAgain() {
    mainPageEl.style.display = "block";
    quizInProgressEl.style.display = "none";
    quizOverEl.style.display = "none";
    highScorePageEl.style.display = "none";

    timerCount = 100;
    score = 0;
    questionIndex = 0;

    // moveOnButton.textContent = "Move On";
    // optionButton_A.disabled = false;
    // optionButton_B.disabled = false;
    // optionButton_C.disabled = false;
    // optionButton_D.disabled = false;
}

function clearScore() {
    window.localStorage.clear();
    scoreInitialEl.textContent = "";
    highestScoreEl.textContent = "";
}

// addEventListeners
startButton.addEventListener("click", quizStart);
submitInitialBtn.addEventListener("click", submitInitial);
highScoreButton.addEventListener("click", gotoHighScorePage);
playAgainBtn.addEventListener("click", playAgain);
clearScoresBtn.addEventListener("click", clearScore);