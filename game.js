


var buttonColors = ["red", "blue", "green", "yellow"];


var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//display Levels of the player
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
})


$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){

    level++;
    userClickedPattern = [];

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Adding flash effect using jQuery to button.
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColor);


}

function playSound(name){
     
    //Playing the sound of the respective button chosen.
     var sound = new Audio("sounds/" + name + ".mp3");
     sound.play();

}

function animatePress(currentColor){


    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
    
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        
    }
    else{
        
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver();
    }

    
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}


