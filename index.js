const questions = [
  {
    question: "what is the largest town in aba",
    answers: [
      { text: "abayi", correct: true },
      { text: "ikoyi", correct: false },
      { text: "laga", correct: false },
      { text: "bata", correct: false },
    ],
  },

  {
    question: "what is the most popular event in aba",
    answers: [
      { text: "festival", correct: false },
      { text: "xmas", correct: false },
      { text: "new-year", correct: false },
      { text: "easter", correct: true },
    ],
  },

  {
    question: "what is the most largest market in aba",
    answers: [
      { text: "ahia nkwo", correct: false },
      { text: "abia poly", correct: false },
      { text: "semetry", correct: true },
      { text: "ore", correct: false },
    ],
  },

  {
    question: "what is the best comedian in aba",
    answers: [
      { text: "obed", correct: false },
      { text: "ayo", correct: true },
      { text: "obodo", correct: false },
      { text: "river", correct: false },
    ],
  },

  {
    question: "what is the best restuarant in aba",
    answers: [
      { text: "eldorado", correct: false },
      { text: "ubuma", correct: true },
      { text: "crunchies", correct: false },
      { text: "chicken", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((buttons) => {
    if (buttons.dataset.correct === "true") {
      buttons.classList.add("correct");
    }
    buttons.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  nextButton.innerHTML = "play again";
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", function () {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
