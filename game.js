const SETTINGS = {
    winScore: 7,

    smallFont: "10px retro",
    largeFont: "14px retro",
    scoreboardColour: "black",

    buttonColour: "white",
    buttonTextColour: "black",

    paddleSound: '/Sounds/Paddle.wav',
    wallSound: '/Sounds/Wall.wav',
    scoreSound: '/Sounds/Score.wav',

    courtColour: "black",
    wallColour: "white",
    wallSize: 20,
    courtMarginX: 12,
    courtMarginY: 4,

    width: innerWidth,
    height: innerHeight,

    paddleColour: "white",
    paddleWidth: 12,
    paddleHeight: 48,

    FPS: 60,
}

const PLAYERS = {
    playerOne: 1,
    playerTwo: 2
}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.court = new Court(canvas)
    }

    start() {
        let that = this
        let previousTime = Date.now();
        let now;
        let dT;
        setInterval( function() {
            now = Date.now();
            dT = (now - previousTime)/1000;
            //update
            that.draw()
            previousTime = Date.now();
        }, (1/SETTINGS.FPS*1000))
    }

    draw() {
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, SETTINGS.width, SETTINGS.height);
        this.court.draw()
    }
}

class ScoreBoard {

}

class Paddle {
    constructor(x, y, player_number, court) {
        this.x = x 
        this.y = y
        this.player_number = player_number
        this.width = SETTINGS.paddleWidth
        this.height = SETTINGS.paddleHeight
        this.court = court
    }

    draw(canvas) {
        let ctx = canvas.getContext('2d')
        ctx.fillStyle = SETTINGS.paddleColour;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    
}

class PaddleController {
    
}

class AIController {
    
}

class Court {
    constructor(canvas) {
        this.canvas = canvas;
        this.paddleOne = new Paddle(0, SETTINGS.height/2, PLAYERS.playerOne, this)
        this.paddleTwo = new Paddle(SETTINGS.width-25, SETTINGS.height/2, PLAYERS.playerTwo, this)
        this.ball = new Ball(SETTINGS.width/2, SETTINGS.height/2, 10, this)
    }

    draw() {
        let ctx = canvas.getContext('2d')
        // drawing top and bottom borders
        ctx.fillStyle = SETTINGS.wallColour;
        ctx.fillRect(0, 0, SETTINGS.width, SETTINGS.wallSize)
        ctx.fillRect(0, (SETTINGS.height-SETTINGS.wallSize), SETTINGS.width, SETTINGS.wallSize)

        // drawing the dashed line
        ctx.strokeStyle = SETTINGS.wallColour;
        ctx.setLineDash([40]);
        ctx.beginPath();
        ctx.moveTo(SETTINGS.width/2, 0);
        ctx.lineTo(SETTINGS.width/2, SETTINGS.height);
        ctx.stroke();

        this.paddleOne.draw(canvas)
        this.paddleTwo.draw(canvas)

        this.ball.draw(canvas)
    }
    
}

class Ball {
    constructor(x, y, radius, court) {
        this.x = x
        this.y = y
        this.radius = radius
        this.court = court
        this.velocity = {x:-100, y:100}
        this.acceleration = 2
    } 

    draw(canvas) {
        let ctx = canvas.getContext('2d')
        ctx.fillStyle = SETTINGS.wallColour;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
        ctx.fill()
    }

    update(dT) {
        //todo
    }
    
}

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    get left() {return this.x}
    get right() {return this.x + this.width}
    get top() {return this.y}
    get bottom() {return this.y + this.height}

    overlaps(other) {
        return other.left < this.right &&
        this.left < other.right &&
        other.top < this.bottom &&
        this.top < other.bottom
    }

    contains(x, y) {
        return this.left < x && this.right > x && this.top < y && this.bottom > y
    }

}


const canvas = document.getElementById("game")
canvas.width = SETTINGS.width;
canvas.height = SETTINGS.height;
let game = new Game(canvas)
game.start()