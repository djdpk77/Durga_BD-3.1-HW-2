const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cartItems = [
  { item: 'Book', price: 30 },
  { item: 'Pen', price: 5 },
  { item: 'Notebook', price: 50 },
  { item: 'Bag', price: 125 },
];

let students = [
  { name: 'John', grade: 'A' },
  { name: 'Jane', grade: 'A' },
  { name: 'Jack', grade: 'B' },
  { name: 'Jill', grade: 'C' },
];

let temperatures = [0, 20, 30, 100];

let student_scores = [
  { name: 'John', score: 85 },
  { name: 'Jane', score: 90 },
  { name: 'Jack', score: 70 },
  { name: 'Jill', score: 60 },
];

let sentence = 'The quick brown fox jumps over the lazy dog';

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

//Function to sum up the prices of all items
function calculateTotalPrice(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].price;
  }
  return total;
}

//Endpoint 1: Calculate Total Price of Items in a Cart
app.get('/cart/total', (req, res) => {
  let totalPrice = calculateTotalPrice(cartItems);
  res.json({ totalPrice });
});

//Function to filter students by the given grade
function filterStudentsByGrade(studentArray, grade) {
  let result = [];
  for (let i = 0; i < studentArray.length; i++) {
    if (studentArray[i].grade === grade) {
      result.push(studentArray[i]);
    }
  }
  return result;
}

//Endpoint 2: Filter Students by Grade
app.get('/students/filter', (req, res) => {
  let grade = req.query.grade;
  let result = filterStudentsByGrade(students, grade);
  res.json({ students: result });
});

//Function to convert each temperature from Celsius to Fahrenheit
function convertCelsiusToFahrenheit(tempArray) {
  let result = [];
  for (let i = 0; i < tempArray.length; i++) {
    result.push((tempArray[i] * 9) / 5 + 32);
  }
  return result;
}

//Endpoint 3: Convert Temperatures from Celsius to Fahrenheit
app.get('/temperatures/convert', (req, res) => {
  let convertedTemperatures = convertCelsiusToFahrenheit(temperatures);
  res.json({ convertedTemperatures });
});

//Function to calculate the average score
function calculateAverageScore(studentArray) {
  let totalScore = 0;
  for (let i = 0; i < studentArray.length; i++) {
    totalScore = totalScore + studentArray[i].score;
  }
  return totalScore / studentArray.length;
}

//Endpoint 4: Calculate Average Score of Students
app.get('/students/average-score', (req, res) => {
  let averageScore = calculateAverageScore(student_scores);
  res.json({ averageScore });
});

//Function to count the words in the given sentence
function countWords(sentence) {
  let wordCount = 1;
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] == ' ') {
      wordCount = wordCount + 1;
    }
  }
  return wordCount;
}

//Endpoint 5: Count Words in a Sentence
app.get('/sentence/count-words', (req, res) => {
  let wordCount = countWords(sentence);
  res.json({ wordCount });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
