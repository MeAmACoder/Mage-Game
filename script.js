var back = "back.png";
var front = "front.png";
var left = "left.png";
var right = "right.png";
var normalspeed = 15;
var playerspeed = normalspeed;
var maxspeed = 100;
var myGamePiece;
var fps, ltc, d;
var px = 0;
var py = -500;
var backround = "room1.png"
function startGame() {
    myGameArea.start();
    myGamePiece = new component(100, 100, "front.png", 100, 290, "image");
    mybackround = new component(5000, 5000, backround, px, py, "image");
}
var myGameArea = {
    start: function () {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = 1200;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        });
    },
    clear: function () {
        this.context.clearRect(0, 0, 1200, 600);
    }
};
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;

        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashTo = function (obj) {
        var top = this.y;
        var btm = this.y + (this.height);
        var left = this.x;
        var right = this.x + (this.width);
        var othTop = obj.y;
        var othBtm = obj.y + (obj.height);
        var othLeft = obj.x;
        var othRight = obj.x + (obj.width);
        var crashed = true;
        if (btm < othTop || top > othBtm || right < othLeft || left > othLeft) {
            crashed = false;
        }
        return crashed;
    }
}
function updateGameArea() {
    myGameArea.clear();
    ctx = myGameArea.context;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    document.getElementById("maxspeed1").innerHTML = "Max Speed: " + maxspeed + "mph";
    if (myGamePiece.x > 1150) {
        px = px - 300;
        myGamePiece = new component(100, 100, front, 900, myGamePiece.y, "image");
        mybackround = new component(5000, 5000, backround, px, py, "image");
    }
    if (myGamePiece.x < 1) {
        px = px + 300;
        myGamePiece = new component(100, 100, front, 300, myGamePiece.y, "image");
        mybackround = new component(5000, 5000, backround, px, py, "image");
    }
    if (myGamePiece.y > 550) {
        py = py - 150;
        myGamePiece = new component(100, 100, front, myGamePiece.x, 400, "image");
        mybackround = new component(5000, 5000, backround, px, py, "image");
    }
    if (myGamePiece.y < 50) {
        py = py + 150;
        myGamePiece = new component(100, 100, front, myGamePiece.x, 200, "image");
        mybackround = new component(5000, 5000, backround, px, py, "image");
    }
    if (myGameArea.key && myGameArea.key == 81) {
        back = "back2.png";
        front = "front2.png";
        left = "left2.png";
        right = "right2.png";
        playerspeed = maxspeed;
    }
    if (myGameArea.key && myGameArea.key == 90) {
        back = "back.png";
        front = "front.png";
        left = "left.png";
        right = "right.png";
        playerspeed = normalspeed;
    }
    if (myGameArea.key && myGameArea.key == 65) { myGamePiece.speedX = -playerspeed; }
    if (myGameArea.key && myGameArea.key == 68) { myGamePiece.speedX = playerspeed; }
    if (myGameArea.key && myGameArea.key == 87) { myGamePiece.speedY = -playerspeed; }
    if (myGameArea.key && myGameArea.key == 83) { myGamePiece.speedY = playerspeed; }
    if (myGamePiece.speedY == -playerspeed) {
        myGamePiece = new component(100, 100, back, myGamePiece.x, myGamePiece.y, "image");
    }
    if (myGamePiece.speedY == playerspeed) {
        myGamePiece = new component(100, 100, front, myGamePiece.x, myGamePiece.y, "image");
    }
    if (myGamePiece.speedX == playerspeed) {
        myGamePiece = new component(100, 100, right, myGamePiece.x, myGamePiece.y, "image");
    }
    if (myGamePiece.speedX == -playerspeed) {
        myGamePiece = new component(100, 100, left, myGamePiece.x, myGamePiece.y, "image");
    }
    if (myGameArea.key && myGameArea.key == 65) { myGamePiece.speedX = -playerspeed; }
    if (myGameArea.key && myGameArea.key == 68) { myGamePiece.speedX = playerspeed; }
    if (myGameArea.key && myGameArea.key == 87) { myGamePiece.speedY = -playerspeed; }
    if (myGameArea.key && myGameArea.key == 83) { myGamePiece.speedY = playerspeed; }
    mybackround.newPos();
    mybackround.update();
    myGamePiece.newPos();
    myGamePiece.update();
    if (!ltc) {
        ltc = Date.now();
        fps = 0;
    }
    d = (Date.now() - ltc) / 1000;
    ltc = Date.now();
    fps = 1 / d;
    ctx.font = '40px sans-serif';
    ctx.fillStyle = "grey";
    ctx.fillText('FPS: ' + Math.round(fps), 150, 40);
}