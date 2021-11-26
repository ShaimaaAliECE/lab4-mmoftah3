const express = require("express");
var questionlist = require("./questions.json");

const app = express();

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

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

app.get("/check", (req, res) => {
  let selections = req.query.arrayOfOptions.toString().split(",");
  let scoreCount = 0;
  let solutions = [];
  for (let i = 0; i < questionlist.length; i++) {
    solutions.push(questionlist[i].answerIndex);
  }

  for (let i = 0; i < 5; i++) {
    // compares the chosen index to the answer index for all questions
    if (selections[i] == solutions[i]) {
      scoreCount += 1; // if the correct answer is selected, increase the score
    }
  }

  res.send("You got a score of " + scoreCount.toString() + "/5");
});

app.use(express.static("static"));

app.listen(80);
