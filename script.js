 //********* Query Selectors - Reference HTML tags in JS *********
var answerBox = document.querySelector('.input-field'); //Leave global referenced 8 functions & in event listener
var guessButton = document.querySelector('.guess-button'); //Leave global referenced 1 function & in event listener.
var clearButton= document.querySelector('.clear-input'); //Leave global referenced 1 function & in event listener an
var min = document.querySelector('.input-min'); //Leave global referenced in 2 functions & used by event listener
var max = document.querySelector('.input-max'); //Leave global referenced in 2 functions & used by event listener
var resetButton = document.querySelector('.reset'); //Leave global referenced in 3 functions & used by event listener
var playCounter = 0; //Leave global - counts whether or not user has started game and is referenced several times
var onlyOnce = 1; //do not do anything to this variable please - forces random number to be generated only once
var makeHard = document.querySelector('.winnerplusrange'); //Referenced in 2 functions
var makeEasy = document.querySelector('.winnerminusrange'); //Referenced in 2 functions

// ********* Event listeners for text entry and button clicks! *********
guessButton.addEventListener('click', addNumber); //Updates number # and passes guess to comparison function.
guessButton.addEventListener('click',comparison); //Compares numbers as passed from addNumber & generateRand functions.
guessButton.addEventListener('click',disableMinMax); //Disables min and max inputs after first guess
answerBox.addEventListener('keyup', enableGuess); //Enables guess button under right conditions
clearButton.addEventListener('click',clearNumber); //Clears text from answerBox - Runs after each guess.
answerBox.addEventListener('keyup', clearButtonEnable); //Enables clear button after text is entered in answer box.
resetButton.addEventListener('click',resetGame); //Resets game. Runs a number of functions.
min.addEventListener('keyup',minOrMaxError); //Checks for errors in min/max input when characters are entered.
max.addEventListener('keyup',minOrMaxError); //Checks for errors in min/max input when characters are entered.
max.addEventListener('keyup',enableGuessInput); //Checks if there is a showing min/max error and disables guessing if so.
min.addEventListener('keyup',generateRand); //Re-generates rand as min/max are changed.
max.addEventListener('keyup',generateRand); //Re-generates rand as min/max are changed.



// ********* Functions for button enable/disables and value checks **********


//Disables min and max fields after first user guess
function disableMinMax(){
	min.disabled=true;
	max.disabled=true;
}

//Generates an error message when invalid min/max fields are presented and un-hides that message.
function minOrMaxError(){
	var minValue = parseInt(min.value);
	var maxValue = parseInt(max.value);
	var minMaxError = document.querySelector('.minmaxerror'); //Maybe local minOrMaxErrror and enable guess input

	if (minValue > maxValue || isNaN(minValue) || isNaN(maxValue)){
		minMaxError.innerText = "Make sure your min is bigger than your max and that you are inputting numbers!";
		minMaxError.hidden = false;
	}
	else{
		minMaxError.hidden = true;
	}
}

//Generates a random number between the min and max values
function generateRand(){
	var minValue = parseInt(min.value);
	var maxValue = parseInt(max.value);
	var rand = (Math.floor((Math.random()*(maxValue - minValue + 1) + minValue )));
	console.log(rand);
	return rand;
}

//Stops that random number from regenerating after every guess
function butOnlyOnce(){
	if (onlyOnce === 1){
		onlyOnce++;
		storedRand = generateRand();
		return storedRand;
	}else{
		return storedRand;
	}
}

//Changes # on page load to the last user guess.
function addNumber(){
	var answer = parseInt(answerBox.value);
	var number = document.querySelector('.number'); //Make local - 2 functions addNumber and resetGame

	number.innerText = answer;
	makeHard.hidden = true;
	makeEasy.hidden = true;
	return answer;
}

//Enables the clear button after 
function clearButtonEnable(){
	if (answerBox.value !== ""){
	clearButton.disabled = false;
	} else{
		clearButton.disabled = true;
	}
}

//Clears any text or numbers in  the clear box
function clearNumber(){
	answerBox.value = '';
	clearButton.disabled = true;
	answerBox.focus();
}

//Enables guess button when answerbox is not blank, outside of min/max range, min/max are valid, answerbox has a number entry
 function enableGuess(){
	var minValue = parseInt(min.value);
	var maxValue = parseInt(max.value);

	if (answerBox.value === "" || answerBox.value < minValue || answerBox.value > maxValue || isNaN(minValue) || isNaN(maxValue) || isNaN(parseInt(answerBox.value))) {
		guessButton.disabled = true;
	} else {
		guessButton.disabled = false;
	}
}

//Makes the game increase limit when you win 
function increaseLimit(){
	if (document.getElementById('harder').checked){
		max.value = parseInt(max.value) + 10;
		makeHard.hidden = false;
	}
	else{
		makeHard.hidden=true;
	}
}

//Runs decrease limit function if 'easier' option is checked and upper limit is greater than 10
function decreaseLimit(){
	if (document.getElementById('easier').checked && max.value > 10){
		max.value = parseInt(max.value) - 10;
		makeEasy.hidden = false;
	}
	else if(document.getElementById('easier').checked){
		makeEasy.innerText = "Please increase the max range to enable this feature again!";
		makeEasy.hidden = false;
	}
	else{
		makeEasy.hidden = true;
	}
}

//Enables guessing as long there are no min/max errors.
function enableGuessInput(){
	var minMaxError = document.querySelector('.minmaxerror'); //Maybe local minOrMaxErrror and enable guess input

	if (minMaxError.hidden){
		answerBox.disabled=false;
	}
	else{
		answerBox.disabled=true;
	}
}

//Resets the answerBox
function guessReset(){
	answerBox.value = "";
}

//Compares userGuess w/ random value. Runs a variety of functions regardless of outcome, runs particular functions if win condition fulfilled.
function comparison(){
	var userGuess = addNumber();
	var minimum = parseInt(min.value);
	var maximum = parseInt(max.value);
	var randomNum = butOnlyOnce();
	var highLow = document.querySelector('.highlow'); //Make local - 2 functions highLow & resetGame
	
	console.log(userGuess);
	if (isNaN(userGuess)){
		highLow.innerText = "Error... Please make sure you enter a number.";
	}else if(userGuess > maximum || userGuess < minimum){
		highLow.innerText = "Please enter a value between " + min.value + " and " + max.value;
	}else if (userGuess > randomNum){
		highLow.innerText = "That is too high!";
	}else if (randomNum > userGuess){
		highLow.innerText = "That is too low!";
	}else{
		highLow.innerText = "That is correct!";
		increaseLimit();
		decreaseLimit();
		answerBox.disabled = true;
		resetButton.focus();
	}
	playCounter++;
	enableReset();
	guessReset();
	enableGuess();
	clearNumber();
}

//Enables the reset button once the user has made at least one guess.
function enableReset(){
	if (playCounter === 0){
		resetButton.disabled = true;
	}else{
		resetButton.disabled = false;
	}
}

//Resets the game, resets counters back to their 0 state, regenerates rand, resets number text, resets hint, re-enables min/max inputs, re-enables answer box, disables reset button for immediate use, focuses answer box.
function resetGame(){
	var highLow = document.querySelector('.highlow');
	var number = document.querySelector('.number');
	randomNum = Math.floor(Math.random()*100+1);
	playCounter = 0;
	onlyOnce = 1;
	butOnlyOnce();
	number.innerText = "#";
	highLow.innerText = "After your first guess check here for a hint!";
	min.disabled = false;
	max.disabled = false;
	answerBox.disabled = false;
	resetButton.disabled = true;
	answerBox.focus();
}



