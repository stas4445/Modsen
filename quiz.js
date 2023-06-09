const DATA = [
  {
    question: "What is the capital of France?",
    answers: [
      {
        content: "New York",
        correct: false,
      },
      {
        content: "London",
        correct: false,
      },
      {
        content: "Paris",
        correct: true,
      },
      {
        content: "Dublin",
        correct: false,
      },
    ],
  },
  {
    question: "What is the freezing point of water?",
    answers: [
      {
        content: "0",
        correct: true,
      },
      {
        content: "3",
        correct: false,
      },
      {
        content: "2",
        correct: false,
      },
      {
        content: "-5",
        correct: false,
      },
    ],
  },
  {
    question: "How many planets are in the solar system?",
    answers: [
      {
        content: "8",
        correct: true,
      },
      {
        content: "9",
        correct: false,
      },
      {
        content: "10",
        correct: false,
      },
      {
        content: "7",
        correct: false,
      },
    ],
  },
  {
    question: "Which of these characters are friends with Harry Potter?",
    answers: [
      {
        content: "Ron Weasley",
        correct: true,
      },
      {
        content: "Draco Malfoy",
        correct: false,
      },
      {
        content: "Hermione Granger",
        correct: true,
      },
      {
        content: "Tom Riddle",
        correct: false,
      },
    ],
  },
  {
    question: "How many chromosomes are in the human genome?",
    answers: [
      {
        content: "47",
        correct: false,
      },
      {
        content: "45",
        correct: false,
      },
      {
        content: "46",
        correct: true,
      },
      {
        content: "44",
        correct: false,
      },
    ],
  },
];

let questionElement = document.getElementById("question");
let answers = document.getElementById("answers");
let numberOfQuestion = document.getElementById("number");
let currentQuestionIndex = 0;
let nextButton = document.getElementById("next-btn");
let restartButton = document.getElementById("restart-btn");
let isAnswerSelected = false;
let correctAnswersCounter = 0;
let timeLeft = 10;
let timerElement = document.getElementById("timer");
let countDownIntervalId;

function countDown() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(countDown);
    currentQuestionIndex++;
    isAnswerSelected = false;
    clearQuestion();
    if (currentQuestionIndex < DATA.length) {
      setNextQuestion();
    } else {
      stopCountDown();
      showResult();
    }
    timeLeft = 10;
  }
}

function startCountDown() {
  timeLeft = 10;
  timerElement.textContent = timeLeft;
  countDownIntervalId = setInterval(countDown, 1000);
}

function stopCountDown() {
  clearInterval(countDownIntervalId);
}

function setNextQuestion() {
  stopCountDown();
  timeLeft = 10;
  showQuestion(DATA[currentQuestionIndex]);
  startCountDown();
}

function hasMultipleCorrectAnswers(answers) {
  return answers.filter((answer) => answer.correct).length > 1;
}

function showInfo() {
  let infoText = document.createElement("span");
  infoText.classList.add("info");
  infoText.innerHTML = "<br>* You can select more than one answer.";
  questionElement.append(infoText);
}

function showQuestion(question) {
  let multipleAnswers = hasMultipleCorrectAnswers(question.answers);

  questionElement.innerText = question.question;
  numberOfQuestion.innerText = `${currentQuestionIndex + 1}/${DATA.length}`;

  if (multipleAnswers) showInfo();

  let selectedAnswers = 0;
  let correctAnswers = question.answers.filter((answer) => answer.correct);

  question.answers.forEach((answer) => {
    let answerButton = document.createElement("button");

    answerButton.classList.add("answers__item");
    answerButton.innerText = answer.content;

    answerButton.addEventListener("click", function () {
      setStatus(answer, answerButton);
      isAnswerSelected = true;
      selectedAnswers++;

      if (selectedAnswers >= correctAnswers.length) {
        disableAnswerButtons();
        if (answer.correct) correctAnswersCounter++;
      }
    });

    answers.append(answerButton);
  });
}

function setStatus(answer, answerButton) {
  if (answer.correct) {
    answerButton.classList.add("correct");
  } else {
    answerButton.classList.add("wrong");
  }

  nextButton.disabled = false;
}

function disableAnswerButtons() {
  let answerButtons = document.querySelectorAll(".answers__item");
  answerButtons.forEach((button) => {
    button.disabled = true;
  });
}

function enableAnswerButtons() {
  let answerButtons = document.querySelectorAll(".answers__item");
  answerButtons.forEach((button) => {
    button.disabled = false;
  });
}

function clearQuestion() {
  questionElement.innerText = "";
  answers.innerHTML = "";
  numberOfQuestion.innerText = "";
}

function showResult() {
  timerElement.style.display = 'none';
  questionElement.innerText = `You answered correctly to ${correctAnswersCounter} out of ${DATA.length} questions.`;
  restartButton.style.display = "block";
  nextButton.style.display = "none";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  correctAnswersCounter = 0;
  timerElement.style.display = 'block';
  restartButton.style.display = "none";
  nextButton.style.display = "block";
  startQuiz();
}

function startQuiz() {
  clearQuestion();
  enableAnswerButtons();
  nextButton.disabled = true;
  isAnswerSelected = false;
  setNextQuestion();
}

const toggleButton = document.getElementById("theme-toggle");

function toggleTheme() {
  const body = document.querySelector("body");
  body.classList.toggle("dark-theme");
  const isDarkTheme = body.classList.contains("dark-theme");
  localStorage.setItem("isDarkTheme", isDarkTheme);
}

toggleButton.addEventListener("click", toggleTheme);

const isDarkTheme = localStorage.getItem("isDarkTheme") === "true";
const body = document.querySelector("body");
if (isDarkTheme) {
  body.classList.add("dark-theme");
}

nextButton.addEventListener("click", function () {
  if (isAnswerSelected) {
    currentQuestionIndex++;
    isAnswerSelected = false;
    clearQuestion();
    if (currentQuestionIndex < DATA.length) {
      setNextQuestion();
    } else {
      showResult();
    }
  }
});

restartButton.addEventListener("click", function () {
  restartQuiz();
});

restartQuiz();
