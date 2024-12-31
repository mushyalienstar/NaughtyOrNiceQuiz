const questions = [
    {
        question: "What is your favorite season?",
        answers: [
            { text: "A. Spring", points: 5 },
            { text: "B. Winter", points: 10 },
            { text: "C. Summer", points: 0},
            { text: "D. Autumn", points: 5 }
        ],
        image: 'q1.jpg'  
    },
    {
        question: "How good have you've been this year?",
        answers: [
            { text: "A. Very good", points: 10},
            { text: "B. Pretty good", points: 7},
            { text: "C. Not very good", points: 3},
            { text: "D. Very bad", points: 0}
        ],
        image: 'q2.jpg'  
    },
    {
        question: "When you wrap presents, you...",
        answers: [
            { text: "A. Wrap them carefully with ribbons and bows", points: 10},
            { text: "B. Use gift bags to make it easier", points: 2},
            { text: "C. Wrap them messily but with love", points: 7},
            { text: "D. Use duct tape and old newspaper", points: 2}
        ],
        image: 'q3.jpg' 
    },
    {
        question: "How do you spend Christmas Eve?",
        answers: [
            { text: "A. Read by the fire", points: 10},
            { text: "B. Cuddle up and watch a movie", points: 10},
            { text: "C. Play video games until midnight", points: 7},
            { text: "D. Sneak around to find any hidden presents", points: 0}
        ],
        image: 'q4.jpg'  
    },
    {
        question: "How do you react to the first snowfall?",
        answers: [
            { text: "A. Help shovel the driveway", points: 10},
            { text: "B. Build a snowman OF COURSE!", points: 7},
            { text: "C. Throw snowballs at random people >:)", points: 0},
            { text: "D. Stay inside where it's warm and cozy", points: 5}
        ],
        image: 'q5.jpg' 
    },
    {
        question: "Do you brush your teeth regularly?",
        answers: [
            { text: "A. About once a day", points: 5},
            { text: "B. At least two times everyday", points: 10},
            { text: "C. Depends", points: 3},
            { text: "D. Not at all!", points: 0}
        ],
        image: 'q6.jpg' 
    },
    {
        question: "How tidy has your room been?",
        answers: [
            { text: "A. Like a tornado happened", points: 0},
            { text: "B. Absolutely spotless!", points: 10},
            { text: "C. Manageable", points: 5},
            { text: "D. Not super clean but also not a mess either", points: 7}
        ],
        image: 'q7.jpg' 
    },
    {
        question: "Have you been doing your homework on time?",
        answers: [
            { text: "A. Never miss it!", points: 10},
            { text: "B. I can forget it sometimes", points: 5},
            { text: "C. Uhh what homework??", points: 0},
            { text: "D. Not always on time but I still do it!", points: 7}
        ],
        image: 'q8.jpg' 
    },
    {
        question: "How do you react to a not so good meal?",
        answers: [
            { text: "A. Say nothing", points: 7},
            { text: "B. Lie and say it was delicious", points: 5},
            { text: "C. Complain and don't eat it", points: 3},
            { text: "D. Throw it away", points: 0}
        ],
        image: 'q9.jpg'  
    },
    {
        question: "You're in school and you find someones water bottle with no one to claim it. Would you...",
        answers: [
            { text: "A. Leave it there", points: 5},
            { text: "B. Put it in the lost and found", points: 10},
            { text: "C. Take it for yourself", points: 0},
            { text: "D. Pick it up and throw it for fun", points: 0}
        ],
        image: 'q10.jpg' 
    },
    {
        question: "How long does it take to get ready in the morning?",
        answers: [
            { text: "A. I don't", points: 0},
            { text: "B. 3 hours on a good day", points: 5},
            { text: "C. Let's just say I'm always late", points: 3},
            { text: "D. A good 20 minutes", points: 10}
        ],
        image: 'q11.jpg' 
    },
    {
        question: "What's your favorite part about the holidays?",
        answers: [
            { text: "A. The food!", points: 7},
            { text: "B. The presents, of course", points: 3},
            { text: "C. Ugly sweaters", points: 0},
            { text: "D. Family", points: 10}
        ],
        image: 'q12.jpg'  
    },
];

const questionsContainer = document.getElementById('questions-container');
const submitButton = document.getElementById('submit-btn');
let score = 0;
let answeredQuestions = 0;

function createQuiz() {
    questions.forEach((currentQuestion, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        questionDiv.innerHTML += `<h2>${index + 1}. ${currentQuestion.question}</h2>`;
        
        if (currentQuestion.image) {
            const img = document.createElement('img');
            img.src = currentQuestion.image;
            img.alt = 'Question image';
            img.classList.add('question-image');
            questionDiv.appendChild(img);
        }

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => handleAnswerSelection(answer.points, button));
            questionDiv.appendChild(button);
        });

        questionsContainer.appendChild(questionDiv);
    });
}

function handleAnswerSelection(points, selectedButton) {
    score += points;
    selectedButton.style.backgroundColor = '#4CAF50'; 
    selectedButton.style.color = 'white';

    const buttons = selectedButton.parentElement.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.disabled = true; 
    });

    answeredQuestions++;
    scrollToNextQuestion(selectedButton.parentElement);

    if (answeredQuestions === questions.length) {
        submitButton.disabled = false; 
    }
}

function scrollToNextQuestion(currentQuestionDiv) {
    const nextQuestion = currentQuestionDiv.nextElementSibling;
    if (nextQuestion) {
        nextQuestion.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateQuestionCount() {
    const questionCountElement = document.getElementById('question-count');
    questionCountElement.textContent = `${answeredQuestions} / ${questions.length}`;
}

function showResult() {
    submitButton.style.display = 'none';
    questionsContainer.innerHTML = '';
    let result = getResult(score);
    
    questionsContainer.innerHTML = `
        <h2 style="text-align: center;">You are on Santa's 
            <span style="color: ${result.color}; font-size: 1.2em; font-weight: bold;">${result.list}!</span>
        </h2>
        <div style="display: flex; align-items: center; justify-content: center; margin-top: 20px;">
            <img src="${result.list === 'Nice List' ? 'nice.jpg' : 'naughty.jpg'}" 
                 alt="${result.list}" style="width: 200px; margin-right: 20px;">
            <p style="max-width: 400px; line-height: 1.5;">
                ${result.list === 'Nice List' 
                  ? '🎁 Congratulations! You have been extra good this year. Santa will definitely bring lots of gifts your way!' 
                  : 'Oh no! It looks like you are on the Naughty List. Do not worry, you can still turn things around next year.'}
            </p>
        </div>
    `;
}

function getResult(score) {
    if (score >= 72) {
        return { list: 'Nice List', color: 'dark green' };
    } else {
        return { list: 'Naughty List', color: 'red' };
    }
}

createQuiz();
submitButton.disabled = true;
submitButton.addEventListener('click', showResult);
