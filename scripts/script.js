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
    return true;
  } catch (error) {
    console.log(error.message);
    document.querySelector(".error-msg").textContent = error.message;
  }
  return false;
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

let timer = false;
let count = 0;
let minute = 0;
let second = 0;

function startGame() {
  document.querySelector(`.form-wrapper`).classList.add(`d-none`);
  document.querySelector(`.game-field`).classList.remove(`d-none`);
  // startTimer();
  musicFunction();
  addImgToDom();
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
  // pokemonSongRef.play();
  //   pokemonSongRef.load();
}

//Gör om mappen med bilder till en array med strängar som kan användas till src för att lägga till bilder i DOM:en
function imgToArr() {
  console.log(`imgToArr()`);

  let pokemonArray = [];

  for (let i = 1; i < 152; i++) {
    if (i < 10) {
      pokemonArray.push(`../assets/pokemons/00${i}.png`);
    } else if (i >= 10 && i < 100) {
      pokemonArray.push(`../assets/pokemons/0${i}.png`);
    } else if (i >= 100) {
      pokemonArray.push(`../assets/pokemons/${i}.png`);
    }
  }
  return pokemonArray;
}

function randomizePokemons() {
  console.log(`randomizePokemons()`);

  let randomPokemons = [];

  while (randomPokemons.length < 10) {
    let randomPokemon = Math.floor(Math.random() * imgToArr().length);

    if (!randomPokemons.includes(randomPokemon)) {
      randomPokemons.push(randomPokemon);
    }
  }
  return randomPokemons;
}

function randomStrings() {
  console.log(`randomString()`);

  let stringArr = [];
  for (let i = 0; i < randomizePokemons().length; i++) {
    stringArr.push(imgToArr()[randomizePokemons()[i]]);
  }
  return stringArr;
}

function addImgToDom() {
  console.log(`addImgToDom()`);

  let gameFieldRef = document.querySelector(`.game-field`);

  let newImg;
  let tenImagesArr = [];

  for (let i = 0; i < randomStrings().length; i++) {
    newImg = document.createElement(`img`);
    newImg.src = randomStrings()[i];
    changePosition(newImg);
    tenImagesArr.push(newImg);
    console.log(tenImagesArr);
    gameFieldRef.append(newImg);

    tenImagesArr.forEach((element) => {
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

  console.log(leftPosition, topPosition);
}

// setInterval(changePosition, 3000);

//Toggla för att fånga pokemons?
// for (let textRef of textRefs) {
//   textRef.addEventListener(`mouseleave`, (event) => {
//     console.log(event.target.textContent);
//     event.target.classList.toggle(`t-red`);
//   });
// }

//   // Metod som slumpar fram ett tal som förhåller sig mellan 0 och webbläsarens bredd minus bildens bredd
//   getLeftPosition : () => {
//     let nmbr = Math.round(Math.random() * ( window.innerWidth - 300)) + 1;
//     return nmbr;
// },
// // Metod som slumpar fram ett tal som förhåller sig mellan 0 och webbläsarens höjd minus bildens höjd
// getTopPosition : () => {
//     let nmbr = Math.round(Math.random() * ( window.innerHeight - 300)) + 1;
//     return nmbr;
// },
