
// References
const canvas = document.getElementById("_c");
const snake = document.getElementById("_s");
const snakeTrail = document.getElementById("_st");
const food = document.getElementById("_f");

// State
const state = {
  snake: {
    direction: 'STOPPED',
    speed: 16, // px's per defined interval
    trail: [[240, 240]],
    trailLength: 1,
    previousModification: ['x', 0]
  },
  food: {
    posx: 0,
    posy: 0
  }
}

// (Re-)Initialization of state
const Setup = () => {
  snakeTrail.innerHTML = '';
  state.snake.direction = 'STOPPED';
  state.snake.speed = 16;
  state.snake.trail = [[240, 240]];
  spawnFood();
}

const Update = () => {
  // Fetch previous location from CSS
  let snakeStyle = window.getComputedStyle(snake),
  left = snakeStyle.getPropertyValue('left'),
  top = snakeStyle.getPropertyValue('top'),
  prevx = parseInt(left, 10),
  prevy = parseInt(top, 10);
  
  switch(state.snake.direction) {
    case 'STOPPED':
      return false;
    case 'RIGHT':
      // Detect collision
      if (isItemInArray(state.snake.trail, [prevx + state.snake.speed, prevy])) {
        alert("Collision!");
        Setup();
      }
      
      // Travel to the opposite wall
      if ((prevx + state.snake.speed) > 464) {
        state.snake.trail[0][0] = 0;
      }
      // Move normally to the right
      else {
        state.snake.trail[0][0] = (prevx + state.snake.speed);
      }
      
      state.snake.previousModification = ['x', 16];
      
      // Update the trail
      if (state.snake.trail.length > 1) {
        for (let i = state.snake.trail.length; i > 0; i--) {
          state.snake.trail[i] = state.snake.trail[i - 1];
          if (i == 1) state.snake.trail[1] = [prevx, prevy];
        }
        state.snake.trail.length = state.snake.trailLength;
      }
      
      // Detect collision
      if (state.snake.trail[0][0] == state.food.posx && state.snake.trail[0][1] == state.food.posy) {
        state.snake.trail.push([prevx, prevy]);
        state.snake.trailLength++;
        spawnFood();
      }
      
      return false;
    case 'LEFT':
      if (isItemInArray(state.snake.trail, [prevx - state.snake.speed, prevy])) {
        alert("Collision!");
        Setup();
      }
      
      if ((prevx - state.snake.speed) < 0) {
        state.snake.trail[0][0] = 464;
      }
      else {
        state.snake.trail[0][0] = (prevx - state.snake.speed);
      }
      
      state.snake.previousModification = ['x', -16]
      
      if (state.snake.trail.length > 1) {
        for (let i = state.snake.trail.length; i > 0; i--) {
          state.snake.trail[i] = state.snake.trail[i - 1];
          if (i == 1) state.snake.trail[1] = [prevx, prevy];
        }
        state.snake.trail.length = state.snake.trailLength;
      }
      
      if (state.snake.trail[0][0] == state.food.posx && state.snake.trail[0][1] == state.food.posy) {
        state.snake.trail.push([prevx, prevy]);
        state.snake.trailLength++;
        spawnFood();
      }
      
      return false;
    case 'UP':
      if (isItemInArray(state.snake.trail, [state.snake.trail[0][0] + state.snake.speed, state.snake.trail[0][1] - state.snake.speed])) {
        alert("Collision!");
        Setup();
      }
      
      if ((prevy - state.snake.speed) < 0) {
        state.snake.trail[0][1] = 464;
      }
      else {
        state.snake.trail[0][1] = (prevy - state.snake.speed);
      }
      
      state.snake.previousModification = ['y', -16]
      
      if (state.snake.trail.length > 1) {
        for (let i = state.snake.trail.length; i > 0; i--) {
          state.snake.trail[i] = state.snake.trail[i - 1];
          if (i == 1) state.snake.trail[1] = [prevx, prevy];
        }
        state.snake.trail.length = state.snake.trailLength;
      }
      
      if (state.snake.trail[0][0] == state.food.posx && state.snake.trail[0][1] == state.food.posy) {
        state.snake.trail.push([prevx, prevy]);
        state.snake.trailLength++;
        spawnFood();
      }
      
      return false;
    case 'DOWN':
      if (isItemInArray(state.snake.trail, [state.snake.trail[0][0], state.snake.trail[0][1]] + state.snake.speed)) {
        alert("Collision!");
        Setup();
      }
      
      if ((prevy + state.snake.speed) > 464) {
        state.snake.trail[0][1] = 0;
      }
      else {
        state.snake.trail[0][1] = (prevy + state.snake.speed);
      }
      
      state.snake.previousModification = ['y', 16]
      
      if (state.snake.trail.length > 1) {
        for (let i = state.snake.trail.length; i > 0; i--) {
          state.snake.trail[i] = state.snake.trail[i - 1];
          if (i == 1) state.snake.trail[1] = [prevx, prevy];
        }
        state.snake.trail.length = state.snake.trailLength;
      }
      
      if (state.snake.trail[0][0] == state.food.posx && state.snake.trail[0][1] == state.food.posy) {
        state.snake.trail.push([prevx, prevy]);
        state.snake.trailLength++;
        spawnFood();
      }
      
      return false;
  } 
}

const drawSnake = () => {
  // Head
  snake.style.left = state.snake.trail[0][0] + 'px';
  snake.style.top = state.snake.trail[0][1] + 'px';
  
  // Clear Trail
  snakeTrail.innerHTML = '';
  
  // Trail
  if (!(state.snake.trail[1] === undefined)) {
    for (let i = 1; i < state.snake.trail.length; i++) {
      snakeTrail.innerHTML +=`<div class='st' style="left:${state.snake.trail[i][0] + 'px'}; top:${state.snake.trail[i][1] + 'px'}"></div>`;
    }
  }
}

const spawnFood = () => {
  let x = (Math.floor(Math.random() * (29 - 0 + 1) + 0)) * 16,
      y = (Math.floor(Math.random() * (29 - 0 + 1) + 0)) * 16;
  
  if (x == state.snake.posx && y == state.snake.posy) spawnFood();
  
  food.style.left = x + 'px';
  food.style.top = y + 'px';
  state.food.posx = x;
  state.food.posy = y;
}

// Controller
document.onkeypress = function (e) {
  e = e || window.event;
  switch(e.keyCode) {
    case 97:
      // Prevent moving against yourself
      if (state.snake.previousModification[0] == 'x' && state.snake.previousModification[1] > 0) {
        state.snake.direction = 'RIGHT';
        return false;
      }
      
      state.snake.direction = 'LEFT';
      return false;
    case 100:
      if (state.snake.previousModification[0] == 'x' && state.snake.previousModification[1] < 0) {
        state.snake.direction = 'LEFT';
        return false;
      }
      
      state.snake.direction = 'RIGHT';
      return false;
    case 119:
      if (state.snake.previousModification[0] == 'y' && state.snake.previousModification[1] > 0) {
        state.snake.direction = 'DOWN';
        return false;
      }
      
      state.snake.direction = 'UP';
      return false;
    case 115:
      if (state.snake.previousModification[0] == 'y' && state.snake.previousModification[1] < 0) {
        state.snake.direction = 'UP';
        return false;
      }
      
      state.snake.direction = 'DOWN';
      return false;
    case 114:
      Setup();
      return false;
  }
};

// Callback to find if given 2D array already exists
function isItemInArray(array, item) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] == item[0] && array[i][1] == item[1]) {
      return true;
    }
  }
  return false;
}


// Main
window.onload = function() {
  Setup();
  const gameLoop = setInterval(function() {
    Update();
    drawSnake();
  }, 100);
}