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

function setNextQuestion() {
   showQuestion(DATA[currentQuestionIndex]);
}

function showQuestion(question) {
   questionElement.innerText = question.question;
   numberOfQuestion.innerText = `${currentQuestionIndex + 1}/${DATA.length}`;
   question.answers.forEach(answer => {
      let answerButton = document.createElement("button");
      answerButton.classList.add("answers__item");
      answerButton.innerText = answer.content;
      answers.append(answerButton);
    })
}

document.addEventListener("DOMContentLoaded", function() {
   setNextQuestion();
 });

function selectAnswer() {}
