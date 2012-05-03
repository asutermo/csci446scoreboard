var guessesLeft = 10;
var num = Math.floor(Math.random() * 100 + 1);
$(function() {
  updateScore(guessesLeft);
  populateHighScores(highScores);
  displayRandom(num);
});

function populateHighScores() {
   $.get("http://pure-mist-5689.herokuapp.com/scores", function(scores) {
   		$('div#highScores').empty();
   		for (var i = 0; i < scores.length; ++i) {
    		$('div#highScores').append("<p>" + scores[i].username + " " + scores[i].score + "</p>");
   }
});
   
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
	guessesLeft = 10;
	num = Math.floor(Math.random() * 100 + 1);
	updateScore(guessesLeft);
	displayRandom(num);
	document.getElementById("btnGuess").disabled=false;
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
		var uname = prompt("You won! Enter your name: ", "Name")
		if (uname == null) {
			uname = "Anonymous";
		}
		var sc = guessesLeft;
		$.post("http://pure-mist-5689.herokuapp.com/scores", {username:uname, score:sc});
		populateHighScores();
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