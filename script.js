const questions = [
    {
        question: "Who is known as the 'Father of the Constitution'?",
        answers: [
            { text: "Alexander Hamilton", correct: false },
            { text: "James Madison", correct: true },
            { text: "John Jay", correct: false },
            { text: "Thomas Jefferson", correct: false }
        ]
    },
    {
        question: "Which Federalist Paper discusses the need for a strong central government to provide for the common defense?",
        answers: [
            { text: "Federalist No. 10", correct: false },
            { text: "Federalist No. 23", correct: true },
            { text: "Federalist No. 51", correct: false },
            { text: "Federalist No. 78", correct: false }
        ]
    },
    {
        question: "Who wrote the majority of the Federalist Papers?",
        answers: [
            { text: "Alexander Hamilton", correct: true },
            { text: "James Madison", correct: false },
            { text: "John Jay", correct: false },
            { text: "George Washington", correct: false }
        ]
    },
    {
        question: "What is the main subject of Federalist No. 51?",
        answers: [
            { text: "Judicial Review", correct: false },
            { text: "Separation of Powers", correct: true },
            { text: "Economic Policy", correct: false },
            { text: "Foreign Policy", correct: false }
        ]
    },
    {
        question: "Which Federalist Paper addresses the importance of an independent judiciary?",
        answers: [
            { text: "Federalist No. 10", correct: false },
            { text: "Federalist No. 23", correct: false },
            { text: "Federalist No. 51", correct: false },
            { text: "Federalist No. 78", correct: true }
        ]
    },
    {
        question: "Which of the following was NOT an author of the Federalist Papers?",
        answers: [
            { text: "Alexander Hamilton", correct: false },
            { text: "James Madison", correct: false },
            { text: "John Jay", correct: false },
            { text: "Thomas Jefferson", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Restart';
        nextButton.classList.remove('hide');
        showFinalScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showFinalScore() {
    questionContainer.innerText = `You scored ${score} out of ${questions.length}`;
    answerButtons.innerHTML = '';
}

nextButton.addEventListener('click', () => {
    if (nextButton.innerText === 'Restart') {
        startQuiz();
    } else {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    }
});

startQuiz();
