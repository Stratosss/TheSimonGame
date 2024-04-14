let buttonColours = ["red", "blue", "yellow", "green"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let counter = 0;

$(document).on("keypress", (function(){
    if (counter === 0){
        nextSequence();
        counter++;
    }
}));

// User input
$(".btn").on("click", function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
    level++;
    $("#level-title").html("Level  " + level);
};


function playSound(name){
    let sound = new Audio("./sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log(gamePattern);
        console.log(userClickedPattern);
        console.log("success")
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){nextSequence()}, 1000)}
            }
    else {
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")}, 200);
        let gameOverSound = new Audio("./sounds/wrong.mp3");
        gameOverSound.play();
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver()
    };}

function startOver (){
            counter = 0;
            level = 0;
            gamePattern = [];
    };
