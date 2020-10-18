const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ground = new Image();
const foodImg = new Image();
foodImg.src = "img/food.png";

ground.src = "img/ground.png";

let box = 32;

let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener("keydown", direction);

function Draw() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : 'red';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    function eatTail(head, arr) {
        for(let i = 0; i < arr.length; i++) {
            if(head.x == arr[i].x && head.y == arr[i].y)
                clearInterval(game);
        }
    }

    if (snakeX == food.x && snakeY == food.y){
        score++
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    }
    else{
        snake.pop()
    }

    if(snakeX < box || snakeX > box * 17
		|| snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);
        
    if(dir == 'left') {snakeX -= box}
    if(dir == 'right') {snakeX += box}
    if(dir == 'up') {snakeY -= box}
    if(dir == 'down') {snakeY += box}

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    eatTail(newHead, snake)

    snake.unshift(newHead)
}

let game = setInterval(Draw, 100);

let dir;

function direction(event) {
    switch (event.keyCode) {
        case 37:
            if (dir != "right") {
                dir = "left";
            }
            break;
        case 38:
            if (dir != "down") {
                dir = "up";
            }
            break;
        case 39:
            if (dir != "left") {
                dir = "right";
            }
            break;
        case 40:
            if (dir != "up") {
                dir = "down";
            }
            break;
    }
}

