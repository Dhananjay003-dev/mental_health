document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-btn');
    const disclaimerContainer = document.querySelector('.disclaimer-container');
    const quizContainer = document.getElementById('quiz-container');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const nextButton = document.getElementById('next-btn');
    const resultElement = document.getElementById('result');

    let currentQuestionIndex = 0;
    let userScores = [];

    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', nextQuestion);

    function startQuiz() {
        disclaimerContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.addEventListener('click', () => {
                userScores[currentQuestionIndex] = index;
                nextQuestion();
            });
            optionsContainer.appendChild(button);
        });
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        const totalScore = userScores.reduce((acc, score) => acc + score, 0);
        let result = '';

        if (totalScore < 5) {
            result = "You have no or minimal depression.";
        } else if (totalScore < 10) {
            result = "You have mild depression. It's advisable to consult a mental health professional.";
        } else if (totalScore < 15) {
            result = "You have moderate depression. Seeking professional help is recommended.";
        } else {
            result = "You have severe depression. It's crucial to seek immediate help from a mental health expert.";
        }

        resultElement.textContent = result;
        nextButton.textContent = 'Restart Quiz';
        nextButton.addEventListener('click', restartQuiz);
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        userScores = [];
        quizContainer.style.display = 'none';
        disclaimerContainer.style.display = 'block';
        resultElement.textContent = '';
        nextButton.textContent = 'Next';
        nextButton.removeEventListener('click', restartQuiz);
    }
});

const questions = [
    {
        question: "How often do you feel sad or hopeless?",
        options: [
            { text: "Rarely or none of the time" },
            { text: "Some of the time" },
            { text: "Most of the time" },
            { text: "All of the time" }
        ]
    },
    {
        question: "Do you find it difficult to enjoy the things you once loved?",
        options: [
            { text: "No, I still enjoy them" },
            { text: "Sometimes" },
            { text: "Rarely" },
            { text: "Never" }
        ]
    },
    {
        question: "How often do you experience anxiety or panic attacks?",
        options: [
            { text: "Rarely or never" },
            { text: "Sometimes" },
            { text: "Often" },
            { text: "Always" }
        ]
    },
    {
        question: "Are you having trouble sleeping?",
        options: [
            { text: "No, my sleep is fine" },
            { text: "Occasionally" },
            { text: "Frequently" },
            { text: "Yes, I can't sleep well" }
        ]
    },
    {
        question: "Do you feel tired or lack energy most of the time?",
        options: [
            { text: "No, I feel energetic" },
            { text: "Sometimes" },
            { text: "Often" },
            { text: "Always" }
        ]
    }
];
