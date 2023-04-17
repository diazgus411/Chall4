var quizForm = document.querySelector('#quiz-form');
var quizResults = document.querySelector('#quiz-results');
var scoreElement = document.querySelector('#score');
var totalQuestionsElement = document.querySelector('#total-questions');
var timeElement = document.querySelector('#time');
var highScoresTable = document.querySelector('#high-scores');
var startButton = document.getElementById("start-button");
var quizForm = document.getElementById("quiz-form"); 


let startTime = '';
let endTime = '';
let quizTime = '';
let score = 0;
let timer = '';

// Function to calculate the time elapsed since the quiz started.
function calculateTime() {
  return (endTime - startTime) / 1000;
}


// Function to save high score and time.
function saveScoreAndTime(score, quizTime) {
  var playerName = prompt('Enter Your Initials:');
  if (playerName !== '' && playerName.trim() !== '') {
    highScoresTable.innerHTML += `
      <tr>
        <td>${playerName}</td>
        <td>${score}</td>
        <td>${quizTime.toFixed(2)}</td>
      </tr>
    `;
    highScoresTable.classList.remove('hidden');
    highScoresTable.scrollIntoView();
  }
}

// Function to handle quiz form submission.
function handleQuizFormSubmission(event) {
  event.preventDefault();
  endTime = Date.now();
  quizTime = calculateTime();
  var selectedAnswers = Array.from(new FormData(quizForm)).map(entry => entry[1]);
  score = selectedAnswers.filter(answer => answer === 'a').length;
  scoreElement.textContent = score;
  totalQuestionsElement.textContent = selectedAnswers.length;
  timeElement.textContent = quizTime.toFixed(2);
  quizResults.classList.remove('hidden');
  clearInterval(timer); // Stop the timer
  saveScoreAndTime(score, quizTime);
  display.quizTime;
}


// Add event listener to quiz form submission.
quizForm.addEventListener('submit', handleQuizFormSubmission);

startButton.addEventListener("click", () => {
    startButton.classList.add("hidden");
    quizForm.classList.remove("hidden");
    startTimer();
    startTime = Date.now();
});

// Start the quiz timer when the quiz form is displayed.
quizForm.addEventListener('click', () => {
  if (!startTime) {
    startTime = Date.now();
  }
});

function startTimer() {
  var timerStart = Date.now();
  var timerElement = document.getElementById('timer');
  function checkElapsedTime() {
    var currentTime = Date.now();
    var elapsedTime = (currentTime - timerStart) / 1000;
    timerElement.textContent = `Elapsed Time: ${elapsedTime.toFixed(1)} seconds`;
    if (elapsedTime >= 120) {
      clearInterval(intervalId);
      timerElement.textContent = 'Times Up!';
    }
  }
  // Set an interval to check the elapsed time every second
  var intervalId = setInterval(checkElapsedTime, 1000);
}