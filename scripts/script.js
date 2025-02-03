const log = (msg) => console.log(msg);

// I denna fil skriver ni all er kod

document.querySelector("#form").addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm();
  document.querySelector(`.form`).classList.add(`d-none`);
  startGame();
});

function validateForm() {
  console.log("validateForm()");

  const trainerNameRef = document.querySelector("#nick");
  let ageRef = document.querySelector("#age");
  const genderBoyRef = document.querySelector("#boy").checked;
  const genderGirlRef = document.querySelector("#girl").checked;

  try {
    if (trainerNameRef.value.length < 5 || trainerNameRef.value.length > 10) {
      trainerNameRef.focus();
      throw new Error("Trainer name must be between 5-10 characters!");
    } else if (isNaN(parseInt(ageRef.value))) {
      ageRef.focus();
      throw new Error("Age need to be a number!");
    } else if (parseInt(ageRef.value) < 10 || parseInt(ageRef.value) > 15) {
      ageRef.focus();
      throw new Error("Age must be between 10-15!");
    } else if (!genderBoyRef && !genderGirlRef) {
      document.querySelector(".gender-check").focus();
      throw new Error("You need to pick a gender!");
    }
    return true;
  } catch (error) {
    console.log(error.message);
    document.querySelector(".error-msg").textContent = error.message;
  }
  return false;
}

let timer = false;
let count = 0;
let minute = 0;
let second = 0;

function startGame() {
  document.querySelector(`#gameField`).classList.remove(`d-none`);
  startTimer();
  musicFunction();
}

function startTimer() {
  console.log(`startTimer()`);
  timer = true;

  if (timer) {
    count++;

    if (count == 100) {
      second++;
      count = 0;
      console.log(`Sekunder: ${second}`);
    }
    if (second == 60) {
      minute++;
      second = 0;
      console.log(`Minuter: ${minute}`);
    }

    setTimeout(startTimer, 10);
  }
}

function musicFunction() {
  console.log("musicFunction()");
  let pokemonSongRef = document.querySelector("#pokemonSong");
  pokemonSongRef.play();
  //   pokemonSongRef.load();
}
