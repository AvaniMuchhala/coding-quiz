var startButton = document.getElementById("start-button");
var container = document.getElementById("container");
var timerEl = document.getElementById("timer");

var timeLeft = 75;
var quizDone = false;
var question;
var answerSection; 
var questionSet =
[{
    question: "Question 1:",
    correctAnswer: "Answer 1",
    options: ["Answer 1","Answer 2", "Answer 3", "Answer 4"]
}, 
{
    question: "Question 2:",
    correctAnswer: "Answer 2",
    options: ["Answer 1","Answer 2", "Answer 3", "Answer 4"]
},
{
    question: "Question 3:",
    correctAnswer: "Answer 3",
    options: ["Answer 1","Answer 2", "Answer 3", "Answer 4"]
},
{
    question: "Question 4:",
    correctAnswer: "Answer 4",
    options: ["Answer 1","Answer 2", "Answer 3", "Answer 4"]
},
{
    question: "Question 5:",
    correctAnswer: "Answer 1",
    options: ["Answer 1","Answer 2", "Answer 3", "Answer 4"]
}];

var index = 0;
// Create <p> to store the result of current question
var result = document.createElement("p");
result.setAttribute("style","color: gray; font-style: italic");

// Retrieve local storage
var playerScoreList = JSON.parse(localStorage.getItem("highscores"));   // should be array of objects
// If no scores stored, set playerScoreList as empty array
if(playerScoreList === null) {
    playerScoreList = [];
}

function renderScores() {
    playerScoreList.sort((a, b) => b.score - a.score);

    // Create ordered list of highscores
    var highscoresList = document.createElement("ol");
    container.appendChild(highscoresList);

    // Create and append each list item (player scores)
    for (var i = 0; i < playerScoreList.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = (i+1) + ". " + playerScoreList[i].initials + ": " + playerScoreList[i].score;
        highscoresList.appendChild(liEl);
    }
}

function storeScores(playerScore) {
    console.log("storeScores() called");
    playerScoreList.push(playerScore);
    localStorage.setItem("highscores", JSON.stringify(playerScoreList));
}

function runClock() {
    timerEl.textContent = timeLeft;
    var timeInterval = setInterval(function() {
        // If time left is 0 sec or user completed quiz, stop execution
        if (timeLeft === 0 || quizDone) {
            clearInterval(timeInterval);
            if (timeLeft === 0) {
                gameOver();
                result.textContent = "Time!";
                container.appendChild(result);
            }
        } else {
            timeLeft--;
            timerEl.textContent = timeLeft;
        }
    }, 1000);
}

// Function to view scoreboard
function viewScores(event) {
    event.preventDefault();
    console.log("viewScores called");

    var initialsInput = document.querySelector("#initials").value;
    var score = timeLeft;
    console.log(initialsInput + " " + score);
    var playerScore = {
        initials: initialsInput,
        score: score
    };
    // Store current player's score
    storeScores(playerScore);

    // Remove content within container from previous page
    container.textContent = "";

    // Create and append Highscores title
    var highscoreTitle = document.createElement("h1");
    highscoreTitle.textContent = "Highscores";
    container.append(highscoreTitle);

    renderScores();

    // Create two buttons
    var goBack = document.createElement("button");
    goBack.textContent = "Go Back";
    container.append(goBack);
    // Refresh webpage to return to starting page upon click of Go Back button
    goBack.addEventListener("click", function() {
        window.location.reload();
    });

    var clearScores = document.createElement("button");
    clearScores.textContent = "Clear Highscores";
    container.append(clearScores);
    // Clear local storage and remove highscores from page upon click
    clearScores.addEventListener("click", function() {
        localStorage.clear();
        document.querySelector("ol").textContent = "";
    });
}

function gameOver() {
    console.log("Game over!");

    // Remove content within container from the last question 
    container.textContent = "";

    // Show score
    question.textContent = "All done!";
    answerSection.textContent = "Your score is: " + timeLeft;
    container.append(question);
    container.append(answerSection);

    // Display form to enter user's initials within container element
    var formEl = document.querySelector("form");
    container.append(formEl);
    formEl.setAttribute("style","display: block");

    // When Submit button clicked, show scoreboard
    var submitEl = document.querySelector("#submit");
    submitEl.addEventListener("click", viewScores);

}

// Function checks whether answer is correct/wrong and shows result while next question displayed
function checkAnswer(event) {
    console.log(event.target.textContent);

    // Check if the answer button clicked on is the correct choice 
    if (event.target.textContent === questionSet[index].correctAnswer) {
        console.log("correct");
        result.textContent = "Correct!";
    // If wrong answer, deduct 10 seconds from timeLeft and update time immediately    
    } else {
        console.log("wrong");
        result.textContent = "Wrong!";
        timeLeft = timeLeft - 10;
        timerEl.textContent = timeLeft;
    }

    // If last question answered, call gameOver()
    if (index === questionSet.length-1) {
        quizDone = true;
        gameOver();
    // If not last question, increment index and call nextQuestion()
    } else {
        index++;
        nextQuestion();
    }
    // Show result from previous question on the page with next question
    container.appendChild(result);
}

// Function displays each question-answer set
function nextQuestion(event){
    // If first question, start timer
    if (index === 0) {
        runClock();
    }

    // Remove content within container from starting page / previous question
    container.textContent = "";
    // Change alignment of flex items from center to left
    container.setAttribute("style","align-items: start");

    // Display current question
    question = document.createElement("h2");
    question.textContent = questionSet[index].question;
    question.setAttribute("style","font-size: 2rem; margin-bottom: 1rem");
    container.appendChild(question);

    // Add section for all answer choice buttons
    answerSection = document.createElement("section");
    container.appendChild(answerSection);
    // All buttons are flex items, stacked vertically
    answerSection.setAttribute("style", "display: flex; flex-direction: column");  

    // Create 4 answer choice buttons within answer section 
    for (var i = 0; i < questionSet[index].options.length; i++) {
        var answerChoice = document.createElement("button");
        answerChoice.textContent = questionSet[index].options[i];
        answerChoice.setAttribute("style","font-size: 1.2rem; margin: 0 0 1rem 0.5rem; color: white; background-color: purple; padding: 0.3rem");
        answerSection.appendChild(answerChoice); 
        // Each button is clickable and triggers checkAnswer()
        answerChoice.addEventListener("click", checkAnswer);    
    }
}


// viewScoreEl = document.getElementById("view-scores");
// console.log(viewScoreEl);
// viewScoreEl.addEventListener("click",viewScores);
startButton.addEventListener("click", nextQuestion);