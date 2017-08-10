window.addEventListener("load", function() {
  let globalScore, currentScore, randomNumber,
      currentPlayer, isPlaying, currentScoreHistory, maxScore;

  const $dice1 = document.querySelector("#dice-1"),
        $dice2 = document.querySelector("#dice-2")
        $newGameBtn = document.querySelector("#new-game-btn"),
        $rollDiceBtn = document.querySelector("#roll-dice-btn"),
        $holdScoreBtn = document.querySelector("#hold-score-btn"),
        $victorySound = document.querySelector("#victory-sound"),
        $maxScoreInput = document.querySelector("#max-score-input");

  function init() {
    globalScore = [0, 0];
    currentScore = 0;
    randomNumbers = [0, 0];
    currentPlayer = 0;
    isPlaying = true,
    maxScore = 100,
    lastDicesNumbers = [0, 0];

    document.getElementById("player-0-current").textContent = 0;
    document.getElementById("player-1-current").textContent = 0;
    document.querySelector("#player-0-panel").classList.remove("active-player", "victory");
    document.querySelector("#player-1-panel").classList.remove("active-player", "victory");
    document.querySelector("#player-0-panel").classList.add("active-player");
    document.querySelector("#player-0-global").textContent = 0;
    document.querySelector("#player-1-global").textContent = 0;
  }


  function clearCurrentScore() {
    currentScore = 0;

    document.getElementById("player-0-current").textContent = 0;
    document.getElementById("player-1-current").textContent = 0;
  }

  function changePlayer() {
    currentPlayer = currentPlayer === 0 ? 1 : 0;

    clearCurrentScore();

    document.querySelector("#player-0-panel").classList.toggle("active-player");
    document.querySelector("#player-1-panel").classList.toggle("active-player");

    lastDiceNumber = 0;
  }

  // When the roll dice button is clicked executes this callback
  $rollDiceBtn.addEventListener("click", function() {

    if(isPlaying) {
      // Set max score
      maxScore = $maxScoreInput.value;
      if (!maxScore) {
        maxScore = 100;
      }
      // Sort a number and assigns to the dice scr attribute value
      $dice1.classList.add("visible");
      $dice2.classList.add("visible");

      randomNumbers[0] = Math.floor(Math.random() * 6) + 1;
      randomNumbers[1] = Math.floor(Math.random() * 6) + 1;

      $dice1.src = "img/dice-" + randomNumbers[0] + ".jpg";
      $dice2.src = "img/dice-" + randomNumbers[1] + ".jpg";

      if(randomNumbers[0] !== 1 && !(randomNumbers[0] === 6 && lastDicesNumbers[0] === 6) &&
         randomNumbers[1] !== 1 && !(randomNumbers[1] === 6 && lastDicesNumbers[1] === 6)) {
        currentScore += (randomNumbers[0] + randomNumbers[1]);

        document.querySelector("#player-" + currentPlayer + "-current").textContent = currentScore;

      }else {
        changePlayer();
      }

      lastDicesNumbers[0] = randomNumbers[0];
      lastDicesNumbers[1] = randomNumbers[1];
    }
  });

  // When the hold score button is clicked executes this callback
  $holdScoreBtn.addEventListener("click", function() {
    if (isPlaying) {

      globalScore[currentPlayer] += currentScore;
      document.querySelector("#player-" + currentPlayer + "-global").textContent = globalScore[currentPlayer];

      // Hides the dice
      $dice1.classList.remove("visible");
      $dice2.classList.remove("visible");

      if(globalScore[currentPlayer] >= maxScore) {
        // Changes the state of the game to not playing
        isPlaying = false;
        // Rings a sound effect of winning
        $victorySound.play();
        // Changes the style of the panel of the winner
        document.querySelector("#player-" + currentPlayer + "-panel").classList.add("victory");

        clearCurrentScore();
      }else {
        changePlayer();
      }
    }
  });

  // When the new game button is clicked executes this callback
  $newGameBtn.addEventListener("click", init);

  // Initialize the game
  init();
});
