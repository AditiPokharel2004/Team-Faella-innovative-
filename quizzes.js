const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timer');
const timeElement = document.getElementById('time');

let shuffledQuestions, currentQuestionIndex;
let timeLeft, timerInterval;

const questions = [
    {
        question: '1. Which of the following is an example of good etiquette?',
        answers: [
            { text: 'Interrupting someone while they are speaking', correct: false },
            { text: ' Ignoring someone while they are speaking', correct: false },
            { text: 'Saying "please" and "thank you', correct: true },
            { text: 'Speaking loudly in public places', correct: false }
        ]
    },
    {
        question: 'What is the best way to manage your time?',
        answers: [
            { text: 'Procrastinate', correct: false },
            { text: ' Prioritize tasks', correct: true },
            { text: 'Avoid planning', correct: false },
            { text: ' Multitask everything', correct: false }
        ]
    },

    {
        question: 'Which of the following is a good financial habit?',
        answers: [
            { text: 'Spend more than you earn', correct: false },
            { text: 'Save a portion of your income', correct: true },
            { text: 'Avoid budgeting', correct: false },
            { text: 'Borrow money unnecessarily ', correct: false }
        ]
    },

    {
        question: 'What is critical thinking?',
        answers: [
            { text: 'Accepting information without questioning', correct: false },
            { text: 'Analyzing and evaluating information', correct: true },
            { text: 'Believing everything you hear', correct: false },
            { text: 'Relying on emotions to make decisions ', correct: false }
        ]
    },

    {
        question: 'What should you do if you disagree with someone?',
        answers: [
            { text: ' Shout at them ', correct: false },
            { text: ' Listen to their perspective', correct: true },
            { text: 'Ignore them', correct: false },
            { text: 'Walk away without discussion', correct: false }
        ]
    },
    // Add more questions as needed
];

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    timerElement.classList.remove('hide');
    setNextQuestion();
    startTimer();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        alert('Correct!');
    } else {
        alert('Wrong!');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endGame();
    }
}

function startTimer() {
    timeLeft = 15;
    timeElement.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timeElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time\'s up!');
            currentQuestionIndex++;
            if (currentQuestionIndex < shuffledQuestions.length) {
                setNextQuestion();
                startTimer();
            } else {
                endGame();
            }
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    alert('Quiz Over!');
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
    questionContainerElement.classList.add('hide');
    timerElement.classList.add('hide');
}
