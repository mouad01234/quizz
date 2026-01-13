const questions = {

    easy: [
        {
            question: "What does HTML stand for?",
            answers: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyper Tool Markup Language",
                "Home Text ML"
            ],
            correct: 0
        },
        {
            question: "Which tag is used for images?",
            answers: ["<img>", "<image>", "<src>", "<picture>"],
            correct: 0
        },
        {
            question: "Which language styles web pages?",
            answers: ["HTML", "CSS", "JavaScript", "PHP"],
            correct: 1
        },
        {
            question: "Which symbol starts a JS comment?",
            answers: ["<!--", "//", "#", "**"],
            correct: 1
        }
    ],

    medium: [
        {
            question: "Which CSS property controls layout alignment?",
            answers: ["float", "display", "position", "align"],
            correct: 1
        },
        {
            question: "What does `querySelector()` return?",
            answers: [
                "All matching elements",
                "First matching element",
                "Only IDs",
                "An array always"
            ],
            correct: 1
        },
        {
            question: "Which HTTP method updates existing data?",
            answers: ["GET", "POST", "PUT", "DELETE"],
            correct: 2
        },
        {
            question: "What is the default position value in CSS?",
            answers: ["relative", "absolute", "fixed", "static"],
            correct: 3
        },
        {
            question: "Which JS data type is NOT primitive?",
            answers: ["String", "Number", "Object", "Boolean"],
            correct: 2
        },
        {
            question: "What does `addEventListener` do?",
            answers: [
                "Runs code automatically",
                "Listens to browser errors",
                "Attaches an event to an element",
                "Creates a function"
            ],
            correct: 2
        }
    ],

    hard: [
        {
            question: "What is a closure in JavaScript?",
            answers: [
                "A function inside a loop",
                "A function with access to its outer scope",
                "A closed block of code",
                "A private variable only"
            ],
            correct: 1
        },
        {
            question: "What will `typeof null` return?",
            answers: ["null", "object", "undefined", "number"],
            correct: 1
        },
        {
            question: "What does event bubbling mean?",
            answers: [
                "Event goes from parent to child",
                "Event goes from child to parent",
                "Event stops automatically",
                "Event repeats itself"
            ],
            correct: 1
        },
        {
            question: "Which method converts JSON string to object?",
            answers: [
                "JSON.parse()",
                "JSON.stringify()",
                "JSON.object()",
                "parse.JSON()"
            ],
            correct: 0
        },
        {
            question: "What does `===` check in JavaScript?",
            answers: [
                "Value only",
                "Type only",
                "Value and type",
                "Reference only"
            ],
            correct: 2
        },
        {
            question: "Which statement about `let` is TRUE?",
            answers: [
                "It is function-scoped",
                "It is block-scoped",
                "It can be redeclared",
                "It ignores scope"
            ],
            correct: 1
        },
        {
            question: "What happens if you access a variable before declaration using let?",
            answers: [
                "undefined",
                "null",
                "ReferenceError",
                "0"
            ],
            correct: 2
        },
        {
            question: "Which JS feature allows async code?",
            answers: [
                "Promises",
                "Closures",
                "Hoisting",
                "Prototypes"
            ],
            correct: 0
        },
        {
            question: "What is the purpose of `async/await`?",
            answers: [
                "To block execution",
                "To simplify asynchronous code",
                "To create loops",
                "To delay functions"
            ],
            correct: 1
        }
    ]

};

let currentLevel = "";
let quizData = [];
let currentIndex = 0;
let score = 0;

const levelBox = document.getElementById("level-box");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const finalScore = document.getElementById("final-score");

document.querySelector(".easy").addEventListener("click", () => startQuiz("easy"));
document.querySelector(".medium").addEventListener("click", () => startQuiz("medium"));
document.querySelector(".hard").addEventListener("click", () => startQuiz("hard"));

function startQuiz(level) {
    currentLevel = level;
    quizData = [...questions[level]].sort(() => Math.random() - 0.5);

    currentIndex = 0;
    score = 0;

    levelBox.classList.add("hide");
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");

    loadQuestion();
}

function loadQuestion() {
    nextBtn.style.display = "none";
    answersEl.innerHTML = "";

    const q = quizData[currentIndex];
    questionEl.textContent = q.question;

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;

        btn.addEventListener("click", () => selectAnswer(index, btn));
        answersEl.appendChild(btn);
    });
}

function selectAnswer(index, button) {
    const correct = quizData[currentIndex].correct;

    Array.from(answersEl.children).forEach(btn => btn.disabled = true);

    if (index === correct) {
        button.style.background = "#4caf50";
        score++;
    } else {
        button.style.background = "#f44336";
        answersEl.children[correct].style.background = "#4caf50";
    }

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");

    finalScore.textContent = `${score} / ${quizData.length}`;
}
