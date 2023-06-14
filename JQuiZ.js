let correctCount = 0;
let questionCount = 0;
let sequenceAnswering = [];
let userAnswers = [];
let correctAnswers = [];
let questionList = [];
let buttonList = [];

    // Use of Async/Await to Retrieve Data from API.
async function dataRetrieval(url) {
  const response = await fetch(url);    // Use of Fetch API.
  const data = await response.json();   // Use of JSON.
  const { results } = data;     // Use of Destructuring.
  return results;
}

function createButton(text, value, name) {
  const button = document.createElement('button');  // Use of DOM Manipulation.
  button.textContent = text;    
  button.value = value;         
  button.name = name;
  button.addEventListener('click', buttonHandler);  // Use of Event Listener.
  return button;
}

  // Function to shuffle an array using Fisher-Yates algorithm. -- Source - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleButton(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function renderQuestion() {
  buttonList = []; // Empty the buttonList array.
  const results = await dataRetrieval("https://opentdb.com/api.php?amount=1&category=18&type=multiple"); // Use of Async/Await.
  const { correct_answer, incorrect_answers, category, difficulty, question } = results[0]; // Use of Destructuring.

    // Use of DOM Manipulation For Rendering Questions and Answers to the Page.
  document.getElementById("category").textContent = category;   
  document.getElementById("difficulty").textContent = "Difficulty: " + difficulty;
  document.getElementById("question").textContent = question;

  questionList.push(question);
    // Use of Array.push() to Add Correct Answers to Array.
  correctAnswers.push(correct_answer);

  const optionsContainer = document.getElementById("options");
    // Use of DOM Manipulation to Clear Previous Answers.
  optionsContainer.innerHTML = "";

  const correctButton = createButton(correct_answer, correct_answer, "correct");
  buttonList.push(correctButton);

  incorrect_answers.forEach(incorrectAnswer => {
    const button = createButton(incorrectAnswer, incorrectAnswer, "incorrect");
    buttonList.push(button);
  });

    // Shuffle the array of buttons.
  shuffleButton(buttonList);

    // Append the shuffled buttons to the optionsContainer.
    buttonList.forEach(button => {
    optionsContainer.appendChild(button);
  });
}

    // Use of Event Handler to Handle Button Clicks
function buttonHandler(event) { 
    //Value and Name will be assigned after event.target object is created with corresponding properties value and name.
  const value = event.target.value; // Object event.target represents the button element that triggered the event.
  const name = event.target.name; // Object event.target is property of buttonHandler. 
    // Use of Array.push() to Add User Answers to Array.
  userAnswers.push(value);

  if (name === "correct") {
    event.target.classList.add("correct"); // Adds the CSS class "correct" to the button element.
    sequenceAnswering.push(1);
    correctCount++;
  } else {
    event.target.classList.add("incorrect");
    sequenceAnswering.push(0);
  }

  questionCount++;

  if (questionCount === 10) {
    buttonList = []; // Empty the buttonList array.
    showScore();
  } else {
    buttonList = []; // Empty the buttonList array.
    renderQuestion();
  }
}

function downloadPDF() {
  // Use of jsPDF Library to Create PDF.
  let pdf = new jsPDF("portrait", "mm", [400, 700]);
  let yPos = 10;
  questionList.forEach((question, index) => {
    // Use of Array.forEach() to Iterate Through User Answers.
    const userAnswer = userAnswers[index];
    const correctAnswer = correctAnswers[index];

    pdf.text(`Question: ${question}`, 10, yPos);
    pdf.text(`User's Answer: ${userAnswer}`, 10, yPos + 10);
    pdf.text(`Correct Answer: ${correctAnswer}`, 10, yPos + 20);
    yPos += 40;
  });

  pdf.save('report.pdf');
}

function showScore() {  // Use of DOM Manipulation to Display Final Score.
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ""; 

  const scoreElement = document.createElement("h2");
  scoreElement.textContent = "Quiz Completed!";
  mainContent.appendChild(scoreElement);

  const scoreText = document.createElement("p");
  scoreText.textContent = "Your Score: " + correctCount + " out of 10";
  mainContent.appendChild(scoreText);

  const chartContainer = document.createElement("div");
  chartContainer.id = "chart-container";
  mainContent.appendChild(chartContainer);

  const canvas = document.createElement("canvas");
  canvas.id = "chart";
  chartContainer.appendChild(canvas);

  const button = document.createElement("button");
  button.textContent = "Download Report";
  button.addEventListener("click", downloadPDF);
  mainContent.appendChild(button);

  const data = {
      // Data to be Represented on Chart.
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
    datasets: [{
        label: "QU'Z Report",
        data: sequenceAnswering,
        borderWidth: 2,
        pointBorderColor: 'rgba(255, 255, 255, 1)',
    }]
    };

      // Configuration For Chart.
    const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
    }
    };

    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, config);
}

renderQuestion(); // Use of Function Call to Render Questions to the Page.