const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Create new message element for out-of-bounds guesses
const invalidGuessMessage = document.createElement("p");
invalidGuessMessage.classList.add("message");
invalidGuessMessage.id = "invalid-guess";
document.body.appendChild(invalidGuessMessage);

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  hideAllMessages();

  /*Preventing guesses lower than 1 or higher than 99.*/
  if (guess < 1 || guess > 99) {
    invalidGuessMessage.style.display = "";
    invalidGuessMessage.innerHTML =
      "Invalid number! Please enter a number between 1 and 99.";
    return;
  }

  attempts = attempts + 1;

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      //bug 6: Displays the wrong message when the guess is too high.
      tooHighMessage.style.display = "";
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} 
                                    ${
                                      remainingAttempts === 1
                                        ? "guess"
                                        : "guesses"
                                    } remaining`;
    /**bug 7: If there is only one guess left, it should say "guess" (singular) instead of "guesses" (plural) */
  }

  /*bug 1: Should use "===", not "====".*/
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = "";

  resetButton.style.display = "";
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    /*bug 5: The loop condition, should be <, not <=.*/
    messages[elementIndex].style.display = "none";
  }
}

/*bug 2: typo for function keyword.*/
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;
  /*bug 4: Here, should reset the attempts to 0, not the maxNumberOfAttempts.*/

  // Enable the input and submit button
  submitButton.disabled = false;
  /*bug 3: a typo in the word "disabeld"*/
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
  invalidGuessMessage.style.display = "none"; // Hide invalid guess message
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
