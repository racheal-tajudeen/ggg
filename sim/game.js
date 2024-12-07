

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];


var level = 0;
var  started = false;

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}



function nextSequence() {
  userClickedPattern=[]
  var randomChosenColour = buttonColours[Math.floor(Math.random() * buttonColours.length)];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


 level ++;
 $("h1").text("Level " + level); 
  
}

 




$(document).ready(function() {

$(document).keypress(function () {
  if (!started) {
  
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
  }
  
});




$(".btn").click(function (){
  var userChosenColour =$(this).attr("id");

  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
 
})





function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}


function checkAnswer(currentLevel) {
  // Check if the most recent user input matches the corresponding game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("successful");

    // If the user has completed the sequence for the current level
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence(); // Generate the next step in the game
      }, 1000);
    }

  } else {
    // Handle the case when the user clicks the wrong button
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // Restart the game
  }
} 








function startOver(){
  level = 0;             // Reset the game level to 0
    gamePattern = [];      // Clear the sequence pattern
    started = false;
}











});



  


