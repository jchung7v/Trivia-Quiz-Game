// Create our questions
let questions = [
  {
    question: "What is the comfortable winter temperature for a dog?",
    imgSrc: "./images/dog-in-winter_NL.webp",
    a: "Between 17°C and 19°C",
    b: "Between 20°C and 22°C",
    c: "Between 23°C and 25°C",
    correct: "b",
  },
  {
    question: "What is your dog's favorite colour",
    imgSrc: "img/css.png",
    a: "Green",
    b: "Red",
    c: "Doesn't matter. My dog is colour blind",
    correct: "c",
  },
  {
    question: "What does dog for?",
    imgSrc: "img/js.png",
    a: "Wrong",
    b: "Wrong",
    c: "Correct",
    correct: "a",
  },
];
// retrive the questions from Firestore and shuffle them randomly
// questionsRef.get().then((snapshot) => {
//   const questions = snapshot.docs.map((doc) => doc.data());
//   shuffledQuestions = questions.sort(() => Math.random() - 0.5);
// });

const startButton = document.getElementById("start-btn"); // confirmed

const quizElement = document.getElementById("quiz-container");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question-container"); //confirmed
const submitButton = document.getElementById("submit-btn"); //confirmed

const a_text = document.getElementById("a_text"); // confirmed
const b_text = document.getElementById("b_text"); // confirmed
const c_text = document.getElementById("c_text"); // confirmed


const startElement = document.getElementById("start-btn-container");
const progressElement = document.getElementById("progress-bar-container");
const imageElement = document.getElementById("image-container"); // confirmed
const answerButtonsElement = document.getElementById("answer-container");
const progress = document.getElementById("progress");


const questionsRef = db.collection("questions"); //confirmed


const lastQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 0;
let score = 0;


function renderQuiz() {

  deselectAnswers()

  let q = questions[currentQuestion];

  questionElement.innerHTML = "<p>" + q.question + "</p>";
  imageElement.innerHTML = "<img src=" + q.imgSrc + ">";
  answer01.innerHTML = q.answer01;
  answer02.innerHTML = q.answer02;
  answer03.innerHTML = q.answer03;
}

function deselectAnswers() {
  answerElements.forEach(answerElements => answerElements.checked = false)
}

startButton.addEventListener("click", startQuiz);

// Start quiz
function startQuiz() {
  console.log("Game has started");
  startElement.style.display = "none";
  renderQuiz();
  quizElement.style.display = "block";
  renderProgress();
  // renderCounter();
  // timer = setInterval(renderCounter, 1000);
}

// Redner progress
function renderProgress() {
  // for (let currentProgress = 0; currentProgress <= lastQuestion; currentProgress++) {
  let currentProgress = 0;
  currentProgress += 10;
  $("#progress")
    .css("width", currentProgress + "%")
    .attr("aria-valuenow", currentProgress)
    .text(currentProgress + "% Complete");
  progress.innerText += currentProgress;
}

// Select Answer (colour changes when clicked)
let selectedAnswer = null;

function selectAnswer() {
  answerElements.forEach((button) => {
    button.addEventListener("click", function () {
      // remove green color from previously selected answer
      if (selectedAnswer !== null) {
        selectedAnswer.style.backgroundColor = "";
      }
      // set current button as selected answer and change color to green
      selectedAnswer = button;
      button.style.backgroundColor = "green";
    });
  });
}

submitButton.addEventListener('click', checkAnswer);

// Check Answer
function checkAnswer(answer) {
    if (answer == questions[currentQuestion].correct) {
      // answer is correct
      score++;
      // change progress color to green
      answerIsCorrect();
      console.log("Correct!");
    } else {
      // answer is wrong
      // change progress color to red
      answerIsWrong();
      console.log("Wrong!");
    }
    count = 0;
    if (currentQuestion < lastQuestion) {
      currentQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      // scoreRender();
    }
}

// answer is correct -> open modal
function answerIsCorrect(){
  document.getElementById(currentQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong -> open modal
function answerIsWrong(){
  document.getElementById(currentQuestion).style.backgroundColor = "#f00";
}

// function setNextQuestion() {
//   // resetState()
//   showQuestion(shuffledQuestions[currentQuestionIndex]);
// }

// function showQuestion(question) {
//   questionElement.innerText = question.question;

//   questionsRef.get().then((snapshot) => {
//     snapshot.forEach((doc) => {
//       var answers = [
//         doc.data().answer01,
//         doc.data().answer02,
//         doc.data().answer03,
//         doc.data().answer04,
//       ];
//       console.log(answers[0]);
//       answers.forEach((answer) => {
//         const button = document.createElement("button");
//         button.innerText = answer.innerText;
//         button.classList.add("btn", "mt-3", "btn-lg", "btn-primary", "answer");
//         if (answer.correct) {
//           button.dataset.correct = answer.correct;
//         }
//         button.addEventListener("click", selectAnswer);
//         answerButtonsElement.appendChild(button);
//       });
//     });
//   });
// }

// answers.forEach(answer => {
//   const button = document.createElement('button')
//   button.innerText = answer.innerText
//   button.classList.add('btn')
//   if (answer.correct) {
//     button.dataset.correct = answer.correct
//   }
//   button.addEventListener('click', selectAnswer)
//   answerButtonsElement.appendChild(button)
// })

// function resetState() {
//   submitButton.classList.add("hide");
//   while (answerButtonsElement.firstChild) {
//     answerButtonsElement.removeChild(answerButtonsElement.firstChild);
//   }
// }

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
// function displayQuizzesDynamically(collection) {
//   let quizTemplate = document.getElementById("quizTemplate");

//   db.collection("quizzes")
//     .limit(1)
//     .get() //the collection called "quizzes"
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//         // .then((allQuizzes) => {
//         //var i = 1;  //Optional: if you want to have a unique ID for each hike
//         // allQuizzes.forEach((doc) => {

//         //iterate thru each doc
//         var quizId = doc.data().id; // get value of the "id" key
//         var animal = doc.data().animal; // get value of the "animal" key
//         var question = doc.data().question; //get value of the "question" key
//         var choice01 = doc.data().choice01; //get value of the "choice01" key
//         var choice02 = doc.data().choice02;
//         var choice03 = doc.data().choice03;
//         var choice04 = doc.data().choice04;
//         var answer = doc.data().answer;
//         var docID = doc.id;
//         let templateClone = quizTemplate.content.cloneNode(true);

//         console.log(answer);
//         //update title and text and image
//         templateClone.querySelector(".question").innerHTML = question;
//         templateClone.querySelector(".choice01").innerHTML = choice01;
//         templateClone.querySelector(".choice02").innerHTML = choice02;
//         templateClone.querySelector(".choice03").innerHTML = choice03;
//         templateClone.querySelector(".choice04").innerHTML = choice04;

//         // templateClone.querySelector(
//         //   ".animal-image"
//         // ).src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
//         //   templateClone.querySelector('a').href = "quiz.html?docID="+docID;

//         //Optional: give unique ids to all elements for future use
//         // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//         // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//         // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

//         //attach to gallery, Example: "hikes-go-here"
//         document.getElementById("answer-goes-here").appendChild(templateClone);

//         //i++;   //Optional: iterate variable to serve as unique ID
//       });
//     });
// }
// displayQuizzesDynamically("quizzes"); //input param is the name of the collection

// // When the submit button is clicked, open the modal
// document.getElementById("submitBtn").addEventListener("click", openModal);

// // Get the modal
// var modal = document.getElementById("rightAnswerModal");
// var backdrop = document.getElementById("backdrop");

// function openModal() {
//   console.log("working!");
//   //   modal.classList.add("show");
//   //   document.body.classList.add("modal-open");
//   backdrop.style.display = "block";
//   modal.style.display = "block";
//   modal.classList.add("show");
// }
// function closeModal() {
//   //   modal.classList.remove("show");
//   //   document.body.classList.remove("modal-open");
//   backdrop.style.display = "none";
//   modal.style.display = "none";
//   modal.classList.remove("show");
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     closeModal();
//   }
// };

// //When the game starts add the user info
// function startGame() {
//   var gamesRef = db.collection("games");

//   gamesRef.add({
//     gameId: "0001", // gameID starts from 0001, next game + 1.
//     player1: "1234", // current login user's id (defauly player)
//     player1NickName: "dog",
//     player2: "2345", // an opponent (inivted friend)
//     player2NickName: "cat",
//     gameStatus: "active", //pending, active, done
//     cuurentQuestionId: "ab01",
//     currentQNum: "1",
//     maxQNum: "10",
//     statusP1: "unanswered",
//     statusP2: "unanswered",
//     scoreP1: "0",
//     scoreP2: "0",
//   });
// }

// // When you start the game above game data should be store in db(or local storage?)
// // The data is stored else where when the game is over. (archive)
// // The archive data can be used later when needed (leaderboard, profile)

// // I want answerElements data base to be active only when player1 is playing game
// // It's not just data it's active data (it gets updated when the user chooses to do different actions)
