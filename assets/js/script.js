var startButton = document.getElementById("start-button");
var container = document.getElementById("container");
console.log(startButton);

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

function gameOver() {
    console.log("Game over!");
    question.textContent = "All done!";
    answerSection.textContent = "Your score is: ";
}

// check result for 5th question?
function checkAnswer(event) {
    console.log(event.target.textContent);
    var result = document.createElement("p");
    if (event.target.textContent === questionSet[index].correctAnswer) {
        console.log("correct");
        result.textContent = "Correct!";
    } else {
        console.log("wrong");
        result.textContent = "Wrong!";
    }

    if (index === 4) {
        gameOver();
        container.appendChild(result);
    } else {
        index++;
        nextQuestion();
        container.appendChild(result);  // show result from previous question on the page with next question
    }
}

function nextQuestion(event){
    container.textContent = "";
    container.setAttribute("style","align-items: start");

    question = document.createElement("h2");
    question.textContent = questionSet[index].question;
    container.appendChild(question);
    answerSection = document.createElement("section");
    container.appendChild(answerSection);
    answerSection.setAttribute("style","display: flex; flex-direction: column");
    // Create 4 answer choice buttons 
    for (var i = 0; i < questionSet[index].options.length; i++) {
        var answerChoice = document.createElement("button");
        answerChoice.textContent = questionSet[index].options[i];
        // answerChoice.setAttribute("class","answer-choice");
        answerSection.appendChild(answerChoice);
        answerChoice.addEventListener("click", checkAnswer);
    }
}

startButton.addEventListener("click", nextQuestion);





