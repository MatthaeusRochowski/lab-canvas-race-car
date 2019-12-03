class CanvasGame {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 500;
    this.canvas.height = 900;
    //this.canvas.style = "border: 1px solid red";
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }
}

class RaceGame extends CanvasGame {
  constructor() {
    super();
    this.frames = 0;
    this.updateGamesState = this.updateGamesState.bind(this);
    this.interval = setInterval(this.updateGamesState, 30);
    this.road = new Road(this.ctx);
    this.player = new Player(210, this.ctx);
    console.log(this.ctx);
  }

  updateGamesState() {
    this.clearCanvas();
    this.frames += 1;
    this.road.drawRoad();
    this.player.draw();
    this.player.update();
    console.log(this.player.isRoadsideLeft());
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 500, 900);
  }
}

class Road {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawRoad() {
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, 0, 40, 900);
    this.ctx.fillRect(460, 0, 40, 900);
    this.ctx.fillRect(50, 0, 400, 900);
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, 30, 900);
    this.ctx.fillRect(470, 0, 30, 900);
    this.ctx.lineWidth = 5.0;
    this.ctx.moveTo(250, 0);
    this.ctx.lineTo(250, 900);
    this.ctx.strokeStyle = "white";
    this.ctx.setLineDash([20, 20]);
    this.ctx.stroke();
  }
}

class Car {
  constructor(x, ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./images/car.png";
    this.x = x; //210;
    this.y = 760;
    this.speedX = 0;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, 80, 130);
    //console.log("ich bin ein Auto");
  }

  update() {
    this.x += this.speedX;
    //console.log("pass auf wo du hinfährst");
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + 80;
  }

  isRoadsideLeft() {
    return (this.left() > 0);
  }

  isRoadsideRight() {
    return (this.right() < 500);
  }
}

class Player extends Car {
  constructor(x, ctx) {
    super(x, ctx);
    document.onkeydown = e => {
      console.log("Taste gedrückt");
      switch (e.keyCode) {
        case 37:
          if (this.isRoadsideLeft()) this.speedX -= 1;
          break;
        case 39:
          if (this.isRoadsideRight()) this.speedX += 1;
          break;
        default:
      }
    };
    document.onkeyup = e => {
      this.speedX = 0;
    };
  }
}

window.onload = function() {
  const startButton = document.getElementById("start-button");
  startButton.onclick = function() {
    startGame();
  };

  function startGame() {
    let game;
    if (!game) game = new RaceGame();
    startButton.disabled = true;
  }
};
