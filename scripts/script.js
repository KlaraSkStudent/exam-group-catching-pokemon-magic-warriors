const log = (msg) => console.log(msg);

// I denna fil skriver ni all er kod

document.querySelector("#form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateForm()) {
    startGame();
  }
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
      validateRadioBtns();
      throw new Error("You need to pick a gender!");
    }
    oGameData.trainerName = trainerNameRef.value;
    oGameData.trainerAge = ageRef.value;

    document.querySelector("#nick").value = "";
    document.querySelector("#age").value = "";
    document.querySelector("#boy").checked = false;
    document.querySelector("#girl").checked = false;

    return true;
  } catch (error) {
    console.log(error.message);
    document.querySelector(".error-msg").textContent = error.message;
  }
  return false;
}

function getDataBase() {
  console.log("getDataBase()");

  let players = JSON.parse(localStorage.getItem("database")) || [];
  return players;
}

function storePlayer(obj) {
  let myPlayers = getDataBase();

  myPlayers.push(obj);
  localStorage.setItem("database", JSON.stringify(myPlayers));
}

function validateRadioBtns() {
  console.log(`validateRadioBtns`);
  //Plockar upp alla radioknappar som hör ihop med samma namn. Lägger dem i en array. Radioknappar med samma namn bildar en grupp där man bara kan välja en av knapparna.
  let radios = document.getElementsByName(`gender`);
  let isRadioChecked = false;

  //Loopar igenom arrayen. Om någon av knapparna är vald ändras isRadioChecked till true och loopen bryts.
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      isRadioChecked = true;
      break;
    }
  }

  //Om ingen av knapparna är vald läggs css-klassen form__radio till som ger en styling till alla radioknapparna i arrayen.
  if (!isRadioChecked) {
    radios.forEach((radio) => radio.classList.add(`form__radio`));
  }
}

function startGame() {
  document.querySelector(`.form-wrapper`).classList.add(`d-none`);
  document.querySelector(`.game-field`).classList.remove(`d-none`);
  musicFunction();
  addImgToDom();
  oGameData.startTimeInMilliseconds();
}

function musicFunction() {
  console.log("musicFunction()");
  let pokemonSongRef = document.querySelector("#pokemonSong");
  pokemonSongRef.play();
  document.querySelector(".stop-music-btn").addEventListener("click", () => {
    pokemonSongRef.pause();
  });
}

function randomizePokemons() {
  console.log(`randomizePokemons()`);

  let pokemons = [];
  for (let i = 0; i < 10; i++) {
    pokemons.push(Math.floor(Math.random() * 151 + 1));
  }
  return pokemons;
}

function generateUrl(id) {
  let endPoint = `00${id}`;
  return `../assets/pokemons/${endPoint.slice(-3)}.png`;
}

function addImgToDom() {
  console.log(`addImgToDom()`);

  let gameFieldRef = document.querySelector(`.game-field`);

  let newImg;
  let pokemons = randomizePokemons();
  let tenImagesArray = [];

  for (let pokemon of pokemons) {
    newImg = document.createElement(`img`);
    newImg.src = generateUrl(pokemon);
    newImg.alt = "pokemon";
    newImg.dataset.id = pokemon;
    changePosition(newImg);
    tenImagesArray.push(newImg);
    gameFieldRef.append(newImg);
    toggleMouseOver(newImg);
    tenImagesArray.forEach((element) => {
      setInterval(() => changePosition(element), 3000);
    });
  }
}

function changePosition(elem) {
  let leftPosition = oGameData.getLeftPosition();
  let topPosition = oGameData.getTopPosition();
  elem.style.position = "absolute";
  elem.style.left = `${leftPosition}px`;
  elem.style.top = `${topPosition}px`;
}

function toggleMouseOver(elem) {
  oGameData.nmbrOfCaughtPokemons = 0;
  console.log(elem);
  elem.addEventListener("mouseover", (event) => {
    if (event.target.alt === "pokemon") {
      event.target.src = "../assets/ball.webp";
      event.target.alt = "ball";
      console.log(oGameData.nmbrOfCaughtPokemons++);
    } else {
      event.target.src = generateUrl(event.target.dataset.id);
      event.target.alt = `pokemon`;
      oGameData.nmbrOfCaughtPokemons--;
      console.log(oGameData.nmbrOfCaughtPokemons);
    }
    gameOver();
  });
}

function gameOver() {
  if (oGameData.nmbrOfCaughtPokemons === 10) {
    console.log(`Game over`);
    oGameData.pokemonNumbers = document.querySelectorAll("img");
    console.log(oGameData.pokemonNumbers);
    oGameData.endTimeInMilliseconds();
    oGameData.endTime = oGameData.nmbrOfMilliseconds();
    console.log(oGameData);
    storePlayer(oGameData);
    document.querySelector("#highScore").classList.remove("d-none");
    document.querySelector("#pokemonSong").pause();
    document.querySelector("#clappingSound").play();
    highScore();

    for (let pokemon of oGameData.pokemonNumbers) {
      pokemon.classList.add("d-none");
    }

    document
      .querySelector("#playAgainBtn")
      .addEventListener("click", playAgain);
  }
}

function playAgain() {
  let listItems = document.querySelectorAll(`li`);
  for (let listItem of listItems) {
    listItem.remove();
  }

  document.querySelector("#pokemonSong").load();
  oGameData.init();
  document.querySelector("#highScore").classList.add("d-none");
  document.querySelector("#gameField").classList.add("d-none");
  document.querySelector("#formWrapper").classList.remove("d-none");
  document.querySelector("#clappingSound").pause();
  document.querySelector("#clappingSound").load();
}

function highScore() {
  console.log("highScore()");

  let players = getDataBase();

  players.sort(function (a, b) {
    return a.endTime - b.endTime;
  });

  let topTen = players.slice(0, 10);

  for (let result in topTen) {
    listItemToDom(
      `Name: ${topTen[result].trainerName}, Time: ${topTen[result].endTime} milliseconds`
    );
  }
  localStorage.setItem("database", JSON.stringify(players));

  let winMsgRef = document.querySelector(`#winMsg`);
  winMsgRef.textContent = `You made it ${oGameData.trainerName}! Your time was ${oGameData.endTime} milliseconds`;
}

function listItemToDom(elem) {
  let highScoreList = document.querySelector(`.highscore-list`);
  let listItem = document.createElement(`li`);
  listItem.textContent = elem;
  highScoreList.append(listItem);
}
