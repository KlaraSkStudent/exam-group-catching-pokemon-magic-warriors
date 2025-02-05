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


function randomizePokemons() {
  console.log(`randomizePokemons()`);

  let pokemons = [];
  for(let i=0; i< 10; i++){
    pokemons.push(Math.floor(Math.random()* 151+1));
    
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
  
  for(let pokemon of pokemons) {
    newImg = document.createElement(`img`);
    newImg.src = generateUrl(pokemon);
    newImg.alt = 'pokemon';
    newImg.dataset.id=pokemon;
    changePosition(newImg);
    tenImagesArray.push(newImg);
    gameFieldRef.append(newImg);
    toggleMouseOver(newImg)
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

  console.log(elem);
  elem.addEventListener('mouseover', (event) => {
    if(event.target.alt === 'pokemon') {
      event.target.src = '../assets/ball.webp';
      event.target.alt = 'ball';
    } else {
      event.target.src =generateUrl(event.target.dataset.id)
      event.target.alt =`pokemon`;
      





  
      
    }
  })
}







