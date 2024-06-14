const gameContainer = document.querySelector('.game-container');
const paddleLeft = document.querySelector('.paddle-left');
const paddleRight = document.querySelector('.paddle-right');
const ball = document.querySelector('.ball');
const scoreLeft = document.getElementById('score-left');
const scoreRight = document.getElementById('score-right');

const gameState = {
    paddleLeftY: 250,
    paddleRightY: 250,
    paddleSpeed: 10,
    ballX: 390,
    ballY: 290,
    ballSpeedX: 5,
    ballSpeedY: 5,
    scoreLeft: 0,
    scoreRight: 0
};

function updatePaddlePosition() {
    paddleLeft.style.top = `${gameState.paddleLeftY}px`;
    paddleRight.style.top = `${gameState.paddleRightY}px`;
}

function updateBallPosition() {
    gameState.ballX += gameState.ballSpeedX;
    gameState.ballY += gameState.ballSpeedY;

    if (gameState.ballY <= 0 || gameState.ballY >= 580) {
        gameState.ballSpeedY *= -1;
        playSound('wall');
    }

    if (gameState.ballX <= 30 && 
        gameState.ballY >= gameState.paddleLeftY && 
        gameState.ballY <= gameState.paddleLeftY + 100) {
        gameState.ballSpeedX *= -1;
        adjustBallSpeed(gameState.paddleLeftY);
        playSound('paddle');
    }

    if (gameState.ballX >= 750 && 
        gameState.ballY >= gameState.paddleRightY && 
        gameState.ballY <= gameState.paddleRightY + 100) {
        gameState.ballSpeedX *= -1;
        adjustBallSpeed(gameState.paddleRightY);
        playSound('paddle');
    }

    if (gameState.ballX <= 0) {
        gameState.scoreRight++;
        resetBall();
    }

    if (gameState.ballX >= 780) {
        gameState.scoreLeft++;
        resetBall();
    }

    ball.style.left = `${gameState.ballX}px`;
    ball.style.top = `${gameState.ballY}px`;
    scoreLeft.textContent = gameState.scoreLeft;
    scoreRight.textContent = gameState.scoreRight;
}

function resetBall() {
    gameState.ballX = 390;
    gameState.ballY = 290;
    gameState.ballSpeedX = 5;
    gameState.ballSpeedY = 5;
}

function adjustBallSpeed(paddleY) {
    const impactPoint = gameState.ballY - paddleY;
    const angle = (impactPoint - 50) / 50; // Normalize the impact point to [-1, 1]
    gameState.ballSpeedY = angle * 5;
}

function playSound(type) {
    const audio = new Audio(`${type}.wav`);
    audio.play();
}

function gameLoop() {
    updatePaddlePosition();
    updateBallPosition();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        gameState.paddleRightY = Math.max(0, gameState.paddleRightY - gameState.paddleSpeed);
    } else if (event.key === 'ArrowDown') {
        gameState.paddleRightY = Math.min(500, gameState.paddleRightY + gameState.paddleSpeed);
    } else if (event.key === 'w') {
        gameState.paddleLeftY = Math.max(0, gameState.paddleLeftY - gameState.paddleSpeed);
    } else if (event.key === 's') {
        gameState.paddleLeftY = Math.min(500, gameState.paddleLeftY + gameState.paddleSpeed);
    }
});

gameLoop();