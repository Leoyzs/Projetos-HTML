let canvas = document.getElementById("snake"); 
let context = canvas.getContext("2d");
let box = 32;
let snake = []; 

// Inicialização da posição inicial da cobra
snake[0] = {
  x: 8 * box,
  y: 8 * box
};

let direction = "right";

// Inicialização da posição inicial da comida
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};

// Função para criar o fundo do jogo
function criarBG() {
  context.fillStyle = "grey";
  context.fillRect(0, 0, 16 * box, 16 * box); 
}

// Função para desenhar a cobra
function criarCobrinha() {
  for(let i = 0; i < snake.length; i++) {
    context.fillStyle = "blue";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Função para desenhar a comida
function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

// Função para atualizar a direção com base na tecla pressionada
document.addEventListener('keydown', update);

function update(event) {
  if(event.keyCode == 37 && direction != 'right') direction = 'left';
  if(event.keyCode == 38 && direction != 'down') direction = 'up';
  if(event.keyCode == 39 && direction != 'left') direction = 'right';
  if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Função principal do jogo
function iniciarJogo() {
  // Lógica para atravessar as paredes
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

  // Verifica colisão com o próprio corpo
  for(let i = 1; i < snake.length; i++) {
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert('Game Over :(');
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  // Atualiza a posição da cabeça da cobra
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction == "right") snakeX += box;
  if(direction == "left") snakeX -= box;
  if(direction == "up") snakeY -= box;
  if(direction == "down") snakeY += box;

  // Verifica se a cobra comeu a comida
  if(snakeX != food.x || snakeY != food.y) {
    snake.pop(); // Remove a última posição da cobra
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  // Adiciona nova cabeça da cobra
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  snake.unshift(newHead); 
}

// Define a velocidade do jogo
let jogo = setInterval(iniciarJogo, 100);
