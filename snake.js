
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Game settings
const gridSize = 20; // Size of each grid cell
let snake = [{ x: gridSize * 5, y: gridSize * 5 }]; // Initial snake position
let food = { x: gridSize * 10, y: gridSize * 10 }; // Initial food position
let dx = gridSize; // Horizontal movement
let dy = 0; // Vertical movement
let score = 0;

function drawRect(color, x, y, size) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

// Draw game elements
function drawGame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    drawRect("red", food.x, food.y, gridSize);

    // Draw snake
    for (let segment of snake) {
        drawRect("green", segment.x, segment.y, gridSize);
    }

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Update game state
function updateGame() {
    // Calculate new head position
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check collisions with walls
    if (
        newHead.x < 0 ||
        newHead.x >= canvas.width ||
        newHead.y < 0 ||
        newHead.y >= canvas.height
    ) {
        alert("Game Over! Your score: " + score);
        document.location.reload();
        return;
    }

    // Check collisions with itself
    for (let segment of snake) {
        if (segment.x === newHead.x && segment.y === newHead.y) {
            alert("Game Over! Your score: " + score);
            document.location.reload();
            return;
        }
    }

    // Add new head to the snake
    snake.unshift(newHead);

    // Check if snake eats food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        placeFood();
    } else {
        // Remove the tail
        snake.pop();
    }
}

// Place food at a random position
function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

// Handle keypresses
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (dy === 0) {
                dx = 0;
                dy = -gridSize;
            }
            break;
        case "ArrowDown":
            if (dy === 0) {
                dx = 0;
                dy = gridSize;
            }
            break;
        case "ArrowLeft":
            if (dx === 0) {
                dx = -gridSize;
                dy = 0;
            }
            break;
        case "ArrowRight":
            if (dx === 0) {
                dx = gridSize;
                dy = 0;
            }
            break;
    }
});

// Game loop
function gameLoop() {
    updateGame();
    drawGame();
}

// Run the game
setInterval(gameLoop, 100);