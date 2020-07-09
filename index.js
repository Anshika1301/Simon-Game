//Array initialize and declared. 
var buttonColours = ["red", "blue", "green", "yellow"];


//empty array declared.
var gamePattern = [];
var userClickedPattern = [];


//variable declared.
var started = false;
var level = 0;


//To start the game press any key from keyboard.
$("button").keypress(function()
{
	if(!started)
	{
		$("h1").text("Level " + level);
		nextSequence();
		started = true;
	}
});


//Random pattern generate from computer.
function nextSequence()
{
	userClickedPattern = [];
	level++;
	$("h1").text("Level " + level);

	var randomNumber = Math.random() * 4;
	randomNumber = Math.floor(randomNumber);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
}


//Add sound to buttons.
function playSound(name)
{
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();	
}


//Add animation to buttons.
function animatePress(currentColour)
{
	$("#" + currentColour).addClass("pressed");
	setTimeout(function()
	{
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}


//Collect clicked button information from user.
$(".bttn").on("click", function()
{
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	//call functions.
	playSound(userChosenColour);				
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length-1);
});


//To check the user's answer.
function checkAnswer(currentLevel)
{
	if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
	{
		if(gamePattern.length === userClickedPattern.length)
		{
			setTimeout(function()
			{
				nextSequence();
			}, 1000);
		}
	}
	else
	{
		playSound("wrong");
		$("body").addClass("game-over");
		$("h1").text("Game Over, Press Restart Button");
		$("button").text("Restart");

		setTimeout(function()
		{
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}


//If the game is over, then the game has to be restarted.
function startOver()
{
	level = 0;
	started = false;
	gamePattern = [];
}
