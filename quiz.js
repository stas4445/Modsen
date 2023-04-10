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
];

let questionElement = document.getElementById("question");
let answers = document.getElementById("answers");
let numberOfQuestion = document.getElementById("number");
let currentQuestionIndex = 0;
let nextButton = document.getElementById("next-btn");
let isAnswerSelected = false;
let correctAnswersCounter = 0;

function setNextQuestion() {
  showQuestion(DATA[currentQuestionIndex]);
}

function hasMultipleCorrectAnswers(answers) {
  return answers.filter(answer => answer.correct).length > 1;
}

function showQuestion(question) {
  let multipleAnswers = hasMultipleCorrectAnswers(question.answers);

  questionElement.innerText = question.question;
  numberOfQuestion.innerText = `${currentQuestionIndex + 1}/${DATA.length}`;

  if (multipleAnswers) {
    questionElement.classList.add("item__question_withInfo");
    let infoText = document.createElement("span");
    infoText.classList.add("info");
    infoText.innerHTML = "<br>* You can select more than one answer.";
    questionElement.appendChild(infoText);
  }

  question.answers.forEach((answer) => {
    let answerButton = document.createElement("button");

    answerButton.classList.add("answers__item");
    answerButton.innerText = answer.content;

    answerButton.addEventListener("click", function () {
      setStatus(answer, answerButton);
      isAnswerSelected = true;
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
}

document.addEventListener("DOMContentLoaded", function () {
  setNextQuestion();
});

nextButton.addEventListener("click", () => {
  if (isAnswerSelected) {
    answers.innerHTML = "";
    currentQuestionIndex++;
    setNextQuestion();
    isAnswerSelected = false;
  } else {
    alert("Пожалуйста, выберите ответ.");
  }
});


