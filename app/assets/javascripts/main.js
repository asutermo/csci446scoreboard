var guessesLeft = 10;
var highScores = new Array([1, "This Guy"], [3, "That Guy"], [2, "The Guy"]);
var num = Math.floor(Math.random() * 100 + 1);

$(function() {
  updateScore(guessesLeft);
  populateHighScores(highScores);
  displayRandom(num);
});

function populateHighScores(scores) {
   $('div#highScores').empty();
   for (var i = 0; i < scores.length; ++i) {
    $('div#highScores').append("<p>" + scores[i][0] + " " + scores[i][1] + "</p>");
  }
}

function displayRandom(randomNum) {
  $('h2#number span#numberToGuess').empty();
  $('h2#number span#numberToGuess').append(randomNum);
}

function updateScore(score) {
  $('h2#score span#guessesLeft').empty();
  $('h2#score span#guessesLeft').append(score);
}

function playAgain() {
	var cont = confirm("Do you want to play again?");
	if (cont == true) {
		guessesLeft = 10;
		num = Math.floor(Math.random() * 100 + 1);
		updateScore(guessesLeft);
		displayRandom(num);

		document.getElementById("btnGuess").disabled=false;
	}
	else {
		document.getElementById("btnGuess").disabled=true;
		document.getElementById("btnGuess").value="Reset game below to play again!";
	}
}

function play() {
	guessesLeft = 10;
	num = Math.floor(Math.random() * 100 + 1);
	updateScore(guessesLeft);
	displayRandom(num);
	document.getElementById("btnGuess").disabled=false;
	document.getElementById("btnGuess").value="Guess";

}

function guessNumber() {
	guessesLeft--;
	updateScore(guessesLeft);

	var gss = document.forms["guessTheNumber"].elements["guess"].value;
	
	if (gss == num) {
		var name = prompt("You won! Enter your name: ", "Name")
		if (name == null) {
			name = "Anonymous";
		}
		var hs = guessesLeft;
		highScores.push([hs, name]);
		populateHighScores(highScores);
		playAgain();
	}
	else if (guessesLeft <= 0) {
		alert("LOSER!!!!");
		playAgain();
	}
	else if (gss < num) {
		var sMessage = 'Too low';
		$('lowContainer').empty();
		$('body').append('<div style="display:none" id="lowContainer">'+sMessage+'</div>');
		$('#lowContainer').css({position:'absolute',top:'10em',left:'35%',marginLeft:'0em',fontWeight:'bold',lineHeight:'2em', background:'#313131',border:'3px double #ccc',padding:'100px'}).fadeIn('slow',function(){
			setTimeout(function(){$('#lowContainer').fadeOut()},1000);
		});
	}
	else if (gss > num) {
		var sMessage = 'Too high';
		$('highContainer').empty();
		$('body').append('<div style="display:none" id="highContainer">'+sMessage+'</div>');
		$('#highContainer').css({position:'absolute',top:'10em',left:'35%',marginLeft:'0em',fontWeight:'bold',lineHeight:'2em', background:'#313131',border:'3px double #ccc',padding:'100px'}).fadeIn('slow',function(){
			setTimeout(function(){$('#highContainer').fadeOut()},1000);
		});
	}
	
}