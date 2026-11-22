const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

var keys = {};

document.addEventListener("keydown", function (event) {
    keys[event.key] = true;
});

document.addEventListener("keyup", function (event) {
    keys[event.key] = false;
});

var playing = true;
var lost = false;
var boardWidth = 20;
var boardHeight = 15;
var ballX = 10;
var ballY = 7;
// dir 1 = up or right   -1 = down / left
var dirY = 1;
var dirX = -1;
var ballSize = 25;
var cellWidth = canvas.width / boardWidth;
var cellHeight = canvas.height / boardHeight;
var paddleY = 7;
var score = 0;
var firstMovement = 1;

function movement() {
    if (ballX < 2) {
        dirX *= -1;
    }
    if (ballX > boardWidth - 4 && ballY >= paddleY - 1 && ballY <= paddleY + 1) {
        dirX *= -1;
        score += 1;
    } else if (ballX > boardWidth - 4) {
        lost = true;
        playing = false;
    }
    if (ballY > boardHeight - 2 || ballY < 1) {
        dirY *= -1;
    }
    ballX = ballX + dirX;
    ballY = ballY + dirY;
}

function gameLoop() {
    if (keys["w"] || keys["ArrowUp"]) {
        if (paddleY > 1) {
            paddleY -= 1;
        }
        firstMovement += 1;
    }
    if (keys["s"] || keys["ArrowDown"]) {
        if (paddleY < boardHeight - 2) {
            paddleY += 1;
        }
        firstMovement += 1;
    }
    if (playing && lost === false) {
        if (firstMovement > 1) {
            movement();
        }
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 0, cellWidth, canvas.height);
        ctx.fillRect(ballX * cellWidth, ballY * cellHeight, cellWidth, cellHeight);
        ctx.fillRect(cellWidth * (boardWidth - 2), (paddleY * cellHeight) - cellHeight, cellWidth, cellHeight * 3)
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Score: " + score, canvas.width / 2, 40);
    }
    if (lost && playing === false) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "48px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Score: " + score, canvas.width / 2, 100);
        // draw buttons
        ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 - 35, 300, 70); // start

        ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 + 70, 300, 70); // back
        ctx.fillStyle = "black";
        ctx.font = "30px sans-serif";
        ctx.fillText("Start", canvas.width / 2, canvas.height / 2 + 10) // start
        ctx.fillText("Back", canvas.width / 2, canvas.height / 2 + 115) // back
        canvas.addEventListener("click", function (event) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
            var mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);

            if (mouseX > canvas.width / 2 - 150 && mouseX < canvas.width / 2 - 150 + 300 && mouseY > canvas.height / 2 - 35 && mouseY < canvas.height / 2 + 35) {
                score = 0;
                ballX = 10;
                ballY = 7;
                dirX = -1;
                paddleY = 7;
                playing = true;
                lost = false;
            }

            if (mouseX > canvas.width / 2 - 150 && mouseX < canvas.width / 2 - 150 + 300 && mouseY > canvas.height / 2 + 70 && mouseY < canvas.height / 2 + 140) {
                score = 0;
                ballX = 10;
                ballY = 7;
                dirX = -1;
                paddleY = 7;
                playing = false;
                lost = false;
            }
        });
    }
    if (lost === false && playing === false) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
setInterval(gameLoop, 200);