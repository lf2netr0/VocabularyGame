var currentSec = 60;
var currentTime = currentSec;
var count = 0;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var lineargradient = ctx.createLinearGradient(0, 0, width / 2, 0);

lineargradient.addColorStop(0, 'yellow');
lineargradient.addColorStop(1, 'red');
ctx.lineWidth = 10;
ctx.strokeStyle = lineargradient;

ctx.textAlign = "center";
ctx.textBaseline = "middle";

var rangle = 360 / currentTime;

function startTime() {
    ctx.clearRect(0, 0, width, height);
    currentSec--;
    count++;
    time = setTimeout(startTime, 1000);

    drawText();
    drawCircle();

    if (count >= 60) {
        correctAns = 0;
        
        clear()
    }
};

function drawCircle() {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 80, 1.5 * Math.PI, 1.5 * Math.PI - (rangle * count / 180 * Math.PI), false);
    ctx.stroke();
}

function drawText() {
    ctx.font = "20px Microsoft JhengHei";
    ctx.fillText(currentSec, width - 20, height - 20);
}

function subtractSec() {
    currentSec -= 5;
    if (currentSec <= 0) { currentSec = 0 }
    currentTime = currentSec;
    count += 5;
    clearTimeout(time)
    startTime();
}

function clear(){
    clearTimeout(time)
    var star = '<div class="star col-sm-2 "></div>'
    var starE = '<div class="starEmpty col-sm-2 "></div>'
    $('.answerArea').css('display', 'none')
    $('.clearArea').css('display', 'block')
    var output = ''
    switch(correctAns) {
        case 0:
            output = starE + starE + starE
            fail()
            break;
        case 1:
            output = star + starE + starE
            success()
            break;
        case 2: case 3:case 4:
            output = star + star + starE
            success()
            break;
        default:
            output = star + star + star
            success()
            break;
    }
    $('#starBlock').html(output)
    $('#starBlock div').first().addClass('offset-sm-3')

    $('#player').remove();
    
}

function success(){
    var audio = new Audio("./audio/Victory.mp3");
    audio.play();
    $('#person').css('display', 'block')
    $('#personSad').css('display', 'none')
}

function fail(){
    $('#clearTitle').html('Fail')
    $('#person').css('display', 'none')
    $('#personSad').css('display', 'block')
    var audio = new Audio("./audio/Fail.mp3");
    audio.play();
}
