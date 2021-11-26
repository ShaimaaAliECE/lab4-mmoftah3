const express = require("express");
//to get the objects inside teh JSON file and store them in questionlist
let questionlist = require("./questions.json");

const app = express();

app.get("/questions", (req, res) => {
  res.json(questionlist);
});

//getting the answers from the user and deciding whether they match answerIndex in the JSON file or no
app.get("/answers", (req, res) => {
  //if the userAnswer equals to the value of option display correct or lese it's a false answer
  if (req.query.choiceValue == questionlist[req.query.Answer].answerIndex) {
    //the user submitted the correct answer
    res.send("Correct :)");
  }
  //the user got the wron answer
  else {
    res.send("False answer please try again!");
  }
});

//method to show the user's score after it receives it's answers from the client
app.get("/checkQuiz", (req, res) => {
  let selections = req.query.arrayOfChoices.toString().split(",");
  let scoreCount = 0;
  let solutions = [];
  for (let i = 0; i < questionlist.length; i++) {
    solutions.push(questionlist[i].answerIndex);
  }

  for (let i = 0; i < 5; i++) {
    if (selections[i] == solutions[i]) {
      scoreCount += 1;
    }
  }

  res.send("Your score is:  " + scoreCount.toString() + "/5");
});

app.use(express.static("static"));

app.listen(80);
