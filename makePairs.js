const wrapperSize = 400;

let columns = 2;
let rows = columns;
let numberOfPictures = (columns * columns) / 2;
let tileSize = wrapperSize / columns;
let tileWidth = 0;
let tileHeight = 0;
let compare = [];
let cards = [];
let tries = 0;
let resizeHeight = 1;
let visibleCards = {};

let playing = false;
let isComparing = false;
let gameover = false;

const wrapper = document.getElementById('wrapper');
wrapper.style.width = `${wrapperSize}px`;
wrapper.style.height = `${wrapperSize}px`;

function getTile(x, y, width, height) {
  return { x: parseInt(x / width), y: parseInt(y / height) };
}

function resetTries() { tries = 0; }
function adjustRows() { rows -= 1; }
function adjustResizeHeight() { resizeHeight = 1 + (1 / rows); }
function setNumberOfPictures() { numberOfPictures = (columns * rows) / 2; }
async function setPictures() { return getData( numberOfPictures ); }
function setDefaultValues() {
  resizeHeight = 1;
  numberOfPictures = (columns * columns) / 2;
  rows = columns;
}
function onInfo() {
  setReadyButtonActive();
  resetTries();
}
async function onGameover() {
  await reDrawMap()
        .catch(console.error);
  setReadyButtonActive();
  resetTries();
  gameover = false;
}
async function onNextLevel() {
  removeAllChildNodes(wrapper);
  columns += 1;
  tileSize = wrapperSize / columns;
  await renderMap()
    .catch(console.error);
  gameover = false;
  playing = false;
}
function setReadyButtonActive() {
  const readyBtn = document.getElementById('ready');
  readyBtn.disabled = false;
  readyBtn.className = 'active';
  readyBtn.style.opacity = '1';
  readyBtn.onmouseleave();
}
function checkReadjust() {
  setDefaultValues();
  if(!isPair(columns)) {
    adjustRows();
    adjustResizeHeight();
    setNumberOfPictures();
  }
}
async function getData(numberOfResults) {
  const request = await fetch(`https://randomuser.me/api/?results=${numberOfResults}`);
  const data = await request.json();
  return data.results;
}
function setImageProperties(img, imgs, choice, i, j) {
  img.id = `img_${i}_${j}`;
  img.className = 'front';
  img.style.position = 'absolute';
  img.src = imgs[choice].picture.large;
  img.style.objectFit = 'cover';
  img.style.width = `100%`;
  img.style.borderRadius = '25%';
  img.style.padding = '.25rem';
  img.style.backgroundColor = '#ffffff66';
  img.style.outline = '2px solid #5b08c7';
}

// https://blog.interactius.com/efecto-flip-card-css-en-paginaci%C3%B3n-javascript-8dc1a8481a16
async function renderMap() {
  let tilesCount = 0;
  let imgs = [];
  let imgsTemp = [];
  let elements = [];

  checkReadjust();
  imgs = await setPictures();
    
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++) {
      const elementWrapper = document.createElement('div');
      elementWrapper.id = 'flip-container';
      elementWrapper.style.position = 'absolute';
      elementWrapper.style.left = `${j * tileSize}px`;
      elementWrapper.style.top = `${i * tileSize * resizeHeight}px`;
      elementWrapper.style.width = `${tileSize}px`;
      elementWrapper.style.height = `${tileSize * resizeHeight}px`;
      elementWrapper.style.padding = '.25rem';
      elementWrapper.style.backgroundColor = '#000000';
      elementWrapper.style.outline = '2px solid #ffffff11';

      const card = document.createElement('div');
      card.id = `${i}_${j}`;
      card.className = 'card';
      card.style.position = 'relative';
      card.style.width = '100%';
      card.style.height = '100%';
      elements.push(card);

      const backSide = document.createElement('div');
      backSide.id = 'backside';
      backSide.className = 'back';
      backSide.style.position = 'absolute';
      backSide.style.width = '100%';
      backSide.style.height = '100%';
      backSide.style.borderRadius = '25%';
      backSide.style.backgroundColor = '#ffffff';
      
      const img = document.createElement('img');

      if(tilesCount < numberOfPictures) {
        const choice = getRandomInt(0, imgs.length);
        setImageProperties(img, imgs, choice, i, j)
        imgsTemp.push(imgs.splice(choice, 1)[0]);
        tilesCount++;
      } else {
        const choice = getRandomInt(0, imgsTemp.length);
        setImageProperties(img, imgsTemp, choice, i, j)
        imgsTemp.splice(choice, 1);
        tilesCount++;
      }

      card.appendChild(backSide);
      card.appendChild(img);
      elementWrapper.appendChild(card);
      wrapper.appendChild(elementWrapper);
      tileWidth = getStyle(elementWrapper, 'width');
      tileHeight = getStyle(elementWrapper, 'height');
    }
  }

  const btn = document.createElement('button');
  btn.id = 'ready';
  btn.style.position = 'absolute';
  btn.innerHTML = 'Ready!';
  btn.disabled = true;
  btn.classList = 'disable';

  wrapper.appendChild(btn);

  btn.onmouseover = () => {
    btn.style.backgroundColor = 'dodgerblue';
    btn.style.cursor = 'pointer';
    btn.style.border = '2px solid #000000';
  };
  btn.onmouseleave = () => {
    btn.style.backgroundColor = '#5b08c7';
    btn.style.border = '2px solid #00000000';
  };
  btn.onclick = () => {
    setTimeout(() => {
      elements.forEach(card => card.style.transform = 'rotateY(-180deg)')
      playing = true;
    }, 50);
    btn.classList = 'disable';
    btn.style.backgroundColor = '#00000055';
    btn.style.opacity = '0.5';
    btn.style.border = '2px solid #00000000';
    btn.style.cursor = 'default';
    btn.disabled = true;
  };

  btn.style.top = `${-(getStyle(btn, 'height') + 10)}px`;
  btn.style.left = `${(getStyle(wrapper, 'width') / 2) - (getStyle(btn, 'width') / 2)}px`;

  info(
    'INFO', 
    `You have three attempts to solve the puzzle, after that the puzzle will restart.
    <br/>When you are ready to solve the puzzle press the button above that says Ready.
    <br/>Press the button below to remove this information panel.`,
    'OK!'
  );
}

async function reDrawMap() {
  let tilesCount = 0;
  let imgs = [];
  let imgsTemp = [];
  
  checkReadjust();
  imgs = await setPictures();

  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++) {
      const card = document.getElementById(`${i}_${j}`);
      card.style.transform = 'rotateY(0deg)';

      const img = document.getElementById(`img_${i}_${j}`);

      if(tilesCount < numberOfPictures) {
        const choice = getRandomInt(0, imgs.length);
        img.src = imgs[choice].picture.large;
        imgsTemp.push(imgs.splice(choice, 1)[0]);
        tilesCount++;
      } else {
        const choice = getRandomInt(0, imgsTemp.length);
        img.src = imgsTemp[choice].picture.large;
        imgsTemp.splice(choice, 1);
        tilesCount++;
      }
    }
  }
}

function info(title, text, buttonText, otherButtonText) {
  const infoWrapper = document.createElement('div');
  infoWrapper.style.display = 'flex';
  infoWrapper.style.alignItems = 'center';
  infoWrapper.style.justifyContent = 'center';
  infoWrapper.style.position = 'absolute';
  infoWrapper.style.left = '50%';
  infoWrapper.style.top = '50%';
  infoWrapper.style.transform = 'translate(-50%, -50%)';
  infoWrapper.style.width = '100%';
  infoWrapper.style.height = '100%';
  infoWrapper.style.padding = '1rem';
  infoWrapper.style.backgroundColor = '#000000cc';

  const element = document.createElement('div');
  element.style.display = 'flex';
  element.style.alignItems = 'center';
  element.style.justifyContent = 'center';
  element.style.flexWrap = 'wrap';
  element.style.width = '100%';
  // element.style.height = '100%';
  // element.style.backgroundColor = 'red';
  element.style.color = '#ffffff';
  element.style.fontWeight = 'bold';

  const elementH2 = document.createElement('h2');
  elementH2.innerHTML = title;
  // elementH2.style.display = 'block';
  elementH2.style.width = '100%';
  // elementH2.style.backgroundColor = 'green';
  elementH2.style.textAlign = 'center';
  elementH2.style.padding = '.5rem 1rem';

  const elementInfo = document.createElement('p');
  elementInfo.innerHTML = text;
  elementInfo.style.width = '100%';
  elementInfo.style.textAlign = 'center';
  elementInfo.style.padding = '.5rem 1rem';
  // elementInfo.style.backgroundColor = 'orange';

  const btn = document.createElement('button');
  // btn.style.position = 'absolute';
  btn.style.flexGrow = 1;
  btn.innerHTML = buttonText;
  btn.style.padding = '.5rem 1rem';
  btn.style.margin = '.5rem 1rem';
  btn.style.backgroundColor = '#1772cc'; // '#5b08c7';
  btn.style.color = 'white';
  btn.style.fontWeight = 'bold';
  btn.style.border = 'none';
  btn.style.textShadow = '2px 2px 2px black';
  btn.style.boxShadow = '2px 2px 2px black';
  btn.style.borderRadius = '5px';
  btn.style.border = '2px solid #00000000';
  btn.style.cursor = 'pointer';

  btn.onclick = async () => {
    infoWrapper.style.display = 'none';
    if(!playing && !gameover) onInfo();
    else if(!playing && gameover) onGameover();
    else if(playing && gameover) onNextLevel();
  }

  if(otherButtonText) {
    const other = document.createElement('button');
    // other.style.position = 'absolute';
    other.style.flexGrow = 1;
    other.innerHTML = otherButtonText;
    other.style.padding = '.5rem 1rem';
    other.style.margin = '.5rem 1rem';
    other.style.backgroundColor = '#1772cc'; // '#5b08c7';
    other.style.color = 'white';
    other.style.fontWeight = 'bold';
    other.style.border = 'none';
    other.style.textShadow = '2px 2px 2px black';
    other.style.boxShadow = '2px 2px 2px black';
    other.style.borderRadius = '5px';
    other.style.border = '2px solid #00000000';
    other.style.cursor = 'pointer';

    other.onclick = async () => {
      infoWrapper.style.display = 'none';
      onGameover();
      playing = false;
    }

    element.appendChild(elementH2);
    element.appendChild(elementInfo);
    element.appendChild(btn);
    element.appendChild(other);
  } else {
    element.appendChild(elementH2);
    element.appendChild(elementInfo);
    element.appendChild(btn);
  }

  infoWrapper.appendChild(element);
  wrapper.appendChild(infoWrapper);
}

wrapper.addEventListener('click', async function(e) {
  if(playing && !gameover && !isComparing) {
    const x = e.clientX - (getStyle(wrapper, 'left') - getStyle(wrapper, 'width') / 2);
    const y = e.clientY - (getStyle(wrapper, 'top') - getStyle(wrapper, 'height') / 2);
    const tileClicked = getTile(x, y, tileWidth, tileHeight);
    const tile = document.getElementById(`${tileClicked.y}_${tileClicked.x}`);
    const img = document.getElementById(`img_${tileClicked.y}_${tileClicked.x}`);

    tile.style.transform = 'rotateY(0deg)';

    if(!visibleCards[img.id]) {
      visibleCards[img.id] = 1;
      cards.push(tile);
      compare.push(img);
    }

    if(compare.length === 2) {
      isComparing = true;
      if(compare[0].src !== compare[1].src) {
        await delay(750);
        cards.forEach(card => card.style.transform = 'rotateY(-180deg)');
        cards = [];
        visibleCards = {};
        tries++;
      }
      compare = [];
      isComparing = false;
    }

    if(tries === 3) {
      playing = false;
      gameover = true;
      cards = [];
      visibleCards = {};
      info('GAMEOVER', 'Click continue button for next try.', 'CONTINUE');
    }

    if(cards.length === (columns * rows)) {
      gameover = true;
      cards = [];
      visibleCards = {};
      await delay(750);
      info(
        'GREAT!!!', 
        `Click next level button for go to next level.
        <br/>Click other try button for continue in this level.`, 
        'NEXT LEVEL', 
        'OTHER TRY'
      );
    }
  }
});

renderMap()
  .catch(console.error);