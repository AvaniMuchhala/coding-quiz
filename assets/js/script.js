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
    console.log(formEl);
    container.append(formEl);
    formEl.setAttribute("style","display: block");

}

// Function checks whether answer is correct/wrong and shows result while next question displayed
function checkAnswer(event) {
    console.log(event.target.textContent);

    // Check if the answer button clicked on is the correct choice 
    if (event.target.textContent === questionSet[index].correctAnswer) {
        console.log("correct");
        result.textContent = "Correct!";
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
        container.appendChild(result);
    // If not last question, increment index and call nextQuestion()
    } else {
        index++;
        nextQuestion();
        container.appendChild(result);  // Show result from previous question on the page with next question
    }
}

// Function displays each question-answer set
function nextQuestion(event){
    // timerEl.textContent = timeLeft;
    if (index === 0) {
        runClock();
    }

    // Remove content within container from starting page / previous question
    container.textContent = "";
    // Change alignment of flex items to left
    container.setAttribute("style","align-items: start");

    // Display current question
    question = document.createElement("h2");
    question.textContent = questionSet[index].question;
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
        answerSection.appendChild(answerChoice); 
        // Each button is clickable and triggers checkAnswer()
        answerChoice.addEventListener("click", checkAnswer);    
    }
}

startButton.addEventListener("click", nextQuestion);





