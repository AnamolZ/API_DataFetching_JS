let correctCount = 0;
let questionCount = 0;
let sequenceAnswering = [];

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

async function renderQuestion() {
  const results = await dataRetrieval("https://opentdb.com/api.php?amount=1&category=18&type=multiple"); // Use of Async/Await.
  const { correct_answer, incorrect_answers, category, difficulty, question } = results[0]; // Use of Destructuring.

    // Use of DOM Manipulation For Rendering Questions and Answers to the Page.
  document.getElementById("category").textContent = category;   
  document.getElementById("difficulty").textContent = "Difficulty: " + difficulty;
  document.getElementById("question").textContent = question;

  const optionsContainer = document.getElementById("options");
    // Use of DOM Manipulation to Clear Previous Answers.
  optionsContainer.innerHTML = "";

        // Use of DOM Manipulation to Create Correct Answer Button
  const correctButton = createButton(correct_answer, correct_answer, "correct");
        // Use of DOM Manipulation to Append Correct Answer Button to Options Container.
  optionsContainer.appendChild(correctButton);

        // Use of Array.forEach() to Iterate Through Incorrect Answers.
  incorrect_answers.forEach(incorrectAnswer => {
    const button = createButton(incorrectAnswer, incorrectAnswer, "incorrect");
    optionsContainer.appendChild(button);
  });
}

    // Use of Event Handler to Handle Button Clicks
function buttonHandler(event) { 
    //Value and Name will be assigned after event.target object is created with corresponding properties value and name.
  const value = event.target.value; // Object event.target represents the button element that triggered the event.
  const name = event.target.name; // Object event.target is property of buttonHandler. 

  if (name === "correct") {
    event.target.classList.add("correct"); // Adds the CSS class "correct" to the button element.
    sequenceAnswering.push(1);
    correctCount++;
  } else {
    event.target.classList.add("incorrect");
    sequenceAnswering.push(0);
  }

  console.log(value);
  console.log("Correct Answers: " + correctCount);

  questionCount++;

  if (questionCount === 10) {
    showScore();
  } else {
    renderQuestion();
  }
}

function downloadPDF() {
  let pdf = new jsPDF("landscape", "mm", "a4");
  pdf.text("Hello World", 10, 10);
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

    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
    datasets: [{
        label: "QU'Z Report",
        data: sequenceAnswering,
        borderWidth: 2,
        pointBorderColor: 'rgba(255, 255, 255, 1)',
    }]
    };

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