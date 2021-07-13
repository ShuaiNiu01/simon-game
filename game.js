var buttonColours = new Array("red","blue","green","yellow");
var userClickedPattern = new Array();
var gamePattern = new Array(); //[]
var started = false;
function nextSequence(callback){
  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  callback(randomChosenColor);
  level++;
  $("h1").text("Level "+level);
  userClickedPattern = [];
}

$(".btn").on("click",function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
var level = 0;

$(document).keypress(function(){
  started = true;
  nextSequence(playSound);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }

  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("game-over, Press Any Key to Restart");
    startOver();
  }

}
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
