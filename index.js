const express = require("express");
//to get the objects inside teh JSON file and store them in questionlist
let questionlist = require("./questions.json");

const app = express();
//using the staic folder
app.use(express.static("static"));

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
  //user selection when they click on the radio button
  let userSelection = req.query.arrayOfChoices.toString().split(",");
  //score counter
  let score = 0;
  //array of answers
  let answers = [];

  for (let i = 0; i < questionlist.length; i++) {
    //push the solutions into the answers array
    answers.push(questionlist[i].answerIndex);
  }

  for (let i = 0; i < 5; i++) {
    // if the user choice matches the answer
    if (userSelection[i] == answers[i]) {
      //increase the score by 1
      score += 1;
    }
  }

  //display the user's score
  res.send("Your score is:  " + score.toString() + "/5");
});

//listen at port 80
app.listen(80);
