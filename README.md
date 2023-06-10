# CSQ'z

Fetches questions from a public API and renders them on the page using JavaScript. The game allows you to select answers and keeps track of your score. The project utilizes async/await for retrieving data from the API and DOM manipulation for rendering questions and answers.

## Installation

1. To run the quiz game locally, follow these steps:

```bash
https://github.com/AnamolZ/API_DataFetching_JS.git
```

2. Navigate to the project directory:

```bash
cd API_DataFetching_JS-main
```

3. Open the index.html file in your preferred web browser.

## Usage

1. The quiz game will automatically fetch a CS-related question from a public API and display it on the page.
2. Read the question carefully and choose the correct answer among the provided options.
3. Click on the chosen answer to submit your selection.
4. The game will display whether your answer was correct or incorrect. The correct answer will be highlighted.
5. The score will be updated accordingly, with each correct answer contributing to your total score.
6. The game will continue to the next question automatically.
7. After answering 10 questions, the game will display your final score.

## Features

- Fetches CS-related questions from a public API.
- Renders questions, answers, and score on the page using DOM manipulation.
- Tracks the number of correct answers and displays the final score.
- Utilizes async/await for asynchronous data retrieval.
- Utilizes event listeners to handle button clicks.
- Utilizes destructuring for extracting relevant data from API response.

## API Used

This project fetches questions from the [Open Trivia Database](https://opentdb.com/), specifically the following API endpoint:

- [https://opentdb.com/api.php?amount=1&category=18&type=multiple](https://opentdb.com/api.php?amount=1&category=18&type=multiple)

## Contributing

If you would like to contribute to the quiz game, please follow these steps:

1. Fork the repository.
2. Create a new branch:

```bash
 git checkout -b feature/your-feature
```
3. Make your changes and commit them:
```bash
 git commit -m 'Add your feature'
```
4. Push to the branch:
```bash
git push origin feature/your-feature
```
5. Create a pull request on GitHub.

## Acknowledgements
[Open Trivia Database](https://opentdb.com/) for providing the API used in this project.
