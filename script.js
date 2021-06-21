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
var gameTitleEl = document.querySelector(".game-title");
var mainPageEl = document.querySelector(".main-page");
var greetingEl = document.querySelector(".greeting");
var mainStartBtnEl = document.querySelector(".main-start-button");
var quizInProgressEl = document.querySelector(".quiz-in-progress");
var timerEl = document.querySelector(".timer");
var questionsEl = document.querySelector(".questions");
var answerOptionsEl = document.querySelector(".answer-options");
var answerCheckEl = document.querySelector(".answer-check");
var quizOverEl = document.querySelector(".quiz-over");
var finalScoreEl = document.querySelector(".final-score");
var highScorePageEl = document.querySelector(".high-score-page");
var showScoreEl = document.querySelector(".show-scores");

// Declare and Initialize variables
var timerCount = 80;
var questionIndex = 0;
var score = 0;

// Array of Quiz Question Object
var questionObject = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        optionA: "A: <script>",
        optionB: "B: <js>",
        optionC: "C: <javascript>",
        optionD: "D: <scripting>",
        answer: "A: <script>",
    }, 
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        optionA: "A: onmouseover",
        optionB: "B: onchange",
        optionC: "C: onmouseclick",
        optionD: "D: onclick",
        answer: "D: onclick",
    }, 
    {
        question: "What does DOM stand for?",
        optionA: "A: Data Object Muted",
        optionB: "B: Data Oriented Model",
        optionC: "C: Document Object Model",
        optionD: "D: Domestic Object Model",
        answer: "C: Document Object Model",
    }, 
    {
        question: "What HTML attribute references an external file from HTML?",
        optionA: "A: src",
        optionB: "B: section",
        optionC: "C: h3",
        optionD: "D: href",
        answer: "A: src",
    }, 
    {
        question: "If you want to store the data to your browser locally, what method should you use?",
        optionA: "A: globalStorage.setItem()",
        optionB: "B: globalStorage.getItem()",
        optionC: "C: localStorage.getItem()",
        opcionD: "D: localStorage.setItem()",
        answer: "D: localStorage.setItem()",
    }, 
    {
        question: "If you want to use the data that you stored locally, what method should you use?",
        optionA: "A: globalStorage.setItem()",
        optionB: "B: globalStorage.getItem()",
        optionC: "C: localStorage.getItem()",
        opcionD: "D: localStorage.setItem()",
        answer: "C: localStorage.getItem()",
    }, 
    {
        question: "To prevent bubbling on your website, what method would you use on your attribute A?",
        optionA: "A: A.noBubbling()",
        optionB: "B: A.preventBubble()",
        optionC: "C: A.preventDefault()",
        optionD: "D: None of above",
        answer: "C: A.preventDefault()",
    }, 
    {
        question: "You want to have an action if you click a button (id=submitButton). What JavaScript method would you use?",
        optionA: "A: setAttribute()",
        optionB: "B: addEventListener()",
        optionC: "C: getAttribute()",
        optionD: "D: querySelector()",
        answer: "B: addEventListener()",
    }, 
    {
        question: "What would you primarily use if you want to style your HTML?",
        optionA: "A: CSS",
        optionB: "B: node.js",
        optionC: "C: HTML",
        optionD: "D: Java",
        answer: "A: CSS",
    }, 
    {
        question: "When you are stuck on studying, what would you do?",
        optionA: "A: Read Documents",
        optionB: "B: Come to Office Hour",
        optionC: "C: Ask to BCS!",
        optionD: "D: All of the above",
        answer: "D: All of the above",
    }
];

// functions declaration
function quizStart() {
    mainPageEl.style.display = "none";
    highScorePageEl.style.display = "none";
    displayQuestions();
    handleInterval();
}

function displayQuestions() {
    quizOverEl.style.display = "none";

    var currQuestion = questionObject[questionIndex];
    questionsEl.textContent = currQuestion.question;
    optionButton_A.textContent = currQuestion.optionA;
    optionButton_B.textContent = currQuestion.optionB;
    optionButton_C.textContent = currQuestion.optionC;
    optionButton_D.textContent = currQuestion.optionD;
}

function handleInterval() {
    var timerInterval = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;

        if(timerCount === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
}

function checkAnswer_A(currQuestion) {
    var correctAnswer = currQuestion.answer;

    if (correctAnswer === optionButton_A.textContent) {
        score++;
        questionIndex++;
        answerCheckEl.textContent = "Correct!";
        displayQuestions();
    }
    else {
        questionIndex++;
        answerCheckEl.textContent = "Wrong!\n".concat(correctAnswer);
        displayQuestions();
    }
}

// addEventListeners
startButton.addEventListener("click", quizStart);
optionButton_A.addEventListener("click", checkAnswer_A);
//optionButton_B.addEventListener("click", checkAnswer_B);
//optionButton_C.addEventListener("click", checkAnswer_C);
//optionButton_D.addEventListener("click", checkAnswer_D);