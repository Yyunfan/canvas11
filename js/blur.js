var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var leftMargin = 0, topMargin = 0;


canvas.width = canvasWidth;
canvas.height = canvasHeight;
var image = new Image();
var clippingArea = {}
var radius = 30;
image.src = "1.jpg";
image.onload = function(e) {
    $('.canvas-box').css({
        'width': canvasWidth + 'px',
        'height': canvasHeight + 'px'
    });
    // $('.blur-img').css({
    //     'width': image.width + 'px',
    //     'height': image.height + 'px'
    // })
    leftMargin = (image.width - canvas.width) / 2;
    topMargin = (image.height - canvas.height) / 2;

    initCanvas();
}

function initCanvas() {

    clippingArea = {
        x: Math.random() * (canvas.width - 2 * radius) + radius,
        y: Math.random() * (canvas.height - 2 * radius) + radius,
        r: radius
    }
    //console.log(clippingArea)
    draw(image, clippingArea);
}

function setClippingArea(clippingArea) {
    context.beginPath();
    context.arc(clippingArea.x, clippingArea.y, clippingArea.r, 0, 2 * Math.PI, false);
    context.clip();

}

function draw(image, clippingArea) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    setClippingArea(clippingArea);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    context.restore();

}

function reset() {
    initCanvas();
}

function show() {
    var theAnimation = setInterval(function() {
        clippingArea.r += 10;
        draw(image, clippingArea);
        if (clippingArea.r > 2 * Math.max(canvas.width, canvas.height)) {
            clearInterval(theAnimation);
        }
    }, 20)
    $('.btn').hide();
    setTimeout(function(){
        $('.qr').show();
    },1000)
    setTimeout(function(){
        $('.tips').show().addClass('zoomIn');
    },2000);
    setTimeout(function(){
        $('.tips').removeClass('zoomIn').addClass('swing');
    },4000)

}
