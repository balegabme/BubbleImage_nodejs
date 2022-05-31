let img;
var bubbleArray = [];
let imagepath;

let w = 700, h = 700;
let bg = 255;
let scl = (h / 2 + w / 2) / 2;

class Bubble {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.color = (img.get(this.x + this.r / 2, this.y + this.r / 2) != undefined) ? img.get(this.x + this.r / 2, this.y + this.r / 2) : color(0, 0, 0);
    }

    show() {
        fill(this.color);
        ellipse(this.x + this.r / 2, this.y + this.r / 2, this.r, this.r);

    }
}

function divideBubble(x, y) {
    let i;
    for (i = 0; i < bubbleArray.length; i++) {
        if (bubbleArray[i].r / 2 > dist(bubbleArray[i].x + bubbleArray[i].r / 2, bubbleArray[i].y + bubbleArray[i].r / 2, x, y))
            break;
    }
    if (bubbleArray[i] != undefined) {
        let radius = bubbleArray[i].r;
        let gridX = bubbleArray[i].x;
        let gridY = bubbleArray[i].y;
        let pix = img.get(bubbleArray[i].x + radius / 2, bubbleArray[i].y + radius / 2);
        bubbleArray[i] = new Bubble(gridX, gridY, radius / 2);
        bubbleArray.push(new Bubble(gridX + radius / 2, gridY, radius / 2));
        bubbleArray.push(new Bubble(gridX + radius / 2, gridY + radius / 2, radius / 2));
        bubbleArray.push(new Bubble(gridX, gridY + radius / 2, radius / 2));
        return true;
    }
}

function preload(){
    
    console.log(currentImagePath);
    img = loadImage(currentImagePath);
}

function setup() {
    
    var canvas = createCanvas(w, h, P2D);
    canvas.parent('bubbleimagediv');
    noStroke();
    img.resize(w, h);
    img.loadPixels();
    bubbleArray.push(new Bubble(0, 0, scl));
    bubbleArray.push(new Bubble(0, scl, scl));
    bubbleArray.push(new Bubble(scl, 0, scl));
    bubbleArray.push(new Bubble(scl, scl, scl));
    noFill();
    background(bg);
    for (let x = 0; x < bubbleArray.length; x++) {
        bubbleArray[x].show();
    }

}

function mouseMoved() {
    if ((mouseX < width && mouseX > 0) && (mouseY < height && mouseY > 0)) {
        if (divideBubble(mouseX, mouseY)) {
            background(bg);
            for (let x = 0; x < bubbleArray.length; x++) {
                bubbleArray[x].show();
            }
        }
    }
    return false;
}

function sendData() {
    axios.post('/bubbleimage', { bubbleArrayLength: (document.getElementById("1").checked) ? bubbleArray.length : 0 });
}

function touchMoved() {
    background(bg);
    for (let x = 0; x < bubbleArray.length; x++) {
        bubbleArray[x].show();
    }
    divideBubble(mouseX, mouseY);
    return false;
}