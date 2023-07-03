var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var lightOn = document.getElementById("lightOn");
var lightOff = document.getElementById("lightOff");
var data1 = document.getElementById("data1");
var data2 = document.getElementById("data2");
var data3 = document.getElementById("data3");
var data4 = document.getElementById("data4");

var halfImgWidth = 24;
var halfImgHeight = 80;
var numberOfLights = 5;
var firstStaticBulbX = 225;
var firstStaticLineX = firstStaticBulbX + 24;
var spacing = 48;

var ctrlPt1_X;
var ctrlPt1_Y;
var ctrlPt2_X;
var ctrlPt2_Y;
var endPt_X;
var endPt_Y;

var leftBulb_X;
var leftBulb_Y;
var angleLeftBulb;
var angleLeftBulbDegree;

var rightBulb_X;
var rightBulb_Y;
var angleRightBulb;
var angleRightBulbDegree;

var degreeLeft = 0;
var degreeRight = 45;

setInterval(draw, 20);

var xTest = 0;
var yTest = 0;
var radiusTest = 10;
var xPos = 340;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawGrid();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 6;
    drawStaticLines();
    drawStaticBulbs();
    drawLeftBulbBezier();
    drawRightBulbBezier();
    degreeLeft += 4;
    degreeRight += 2;
}

function drawStaticLines(){
    for(let i=0; i<numberOfLights; i++){
        ctx.beginPath();
        ctx.moveTo(firstStaticLineX + i*spacing, -5);
        ctx.lineTo(firstStaticLineX + i*spacing, 345);
        ctx.stroke();
    }
}

function drawStaticBulbs(){
    for(let i=0; i<numberOfLights; i++){
        ctx.drawImage(lightOff, firstStaticBulbX + i*spacing, 345 - halfImgHeight);
    }
}

function drawLeftBulbBezier(){
    ctrlPt1_X = firstStaticLineX - spacing;
    ctrlPt1_Y = 100;
    ctrlPt2_X = firstStaticLineX - spacing;
    ctrlPt2_Y = 280;
    endPt_X = firstStaticLineX - spacing - 80*Math.abs(Math.sin(degreeLeft*Math.PI/180));
    endPt_Y = 345 - 30 + 30*(1-Math.pow(Math.sin(degreeLeft*Math.PI/180),2));

    ctx.beginPath();
    ctx.moveTo(firstStaticLineX - spacing, -5);
    ctx.bezierCurveTo(ctrlPt1_X, ctrlPt1_Y, ctrlPt2_X, ctrlPt2_Y, endPt_X, endPt_Y);
    ctx.stroke();

    // Affichage points de contrôles
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ctrlPt1_X, ctrlPt1_Y, 5, 0, 2 * Math.PI); // Control point one
    ctx.arc(ctrlPt2_X, ctrlPt2_Y, 5, 0, 2 * Math.PI); // Control point two
    ctx.fill();

    leftBulb_X = firstStaticBulbX - spacing - 80*Math.abs(Math.sin(degreeLeft*Math.PI/180));
    leftBulb_Y = 340 - 30 + 30*(1-Math.pow(Math.sin(degreeLeft*Math.PI/180),2));
    angleLeftBulb = Math.atan2(endPt_Y-ctrlPt2_Y,endPt_X-ctrlPt2_X).toFixed(2).toString();
    angleLeftBulbDegree = (Math.atan2(endPt_Y-ctrlPt2_Y,endPt_X-ctrlPt2_X)*180/Math.PI).toFixed(2).toString();

    ctx.translate(endPt_X, endPt_Y);
    ctx.rotate(angleLeftBulb - Math.PI/2);
    ctx.drawImage(lightOn, -halfImgWidth, -halfImgHeight);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    //data1.innerHTML = "Ampoule gauche radians : " + angleLeftBulb;
    //data2.innerHTML = "Ampoule gauche degrés : " + angleLeftBulbDegree;

}

/*
ctx.translate(firstStaticBulbX, 240);
ctx.rotate(degree/30);
ctx.drawImage(lightOff, -24, 0);
ctx.setTransform(1, 0, 0, 1, 0, 0);
*/

function drawRightBulbBezier(){
    ctrlPt1_X = firstStaticLineX + numberOfLights * spacing;
    ctrlPt1_Y = 100;
    ctrlPt2_X = firstStaticLineX + numberOfLights * spacing;
    ctrlPt2_Y = 280;
    endPt_X = firstStaticLineX + numberOfLights * spacing + 80*Math.abs(Math.sin(degreeRight*Math.PI/180));
    endPt_Y = 345 - 30 + 30*(1-Math.pow(Math.sin(degreeRight*Math.PI/180),2));

    ctx.beginPath();
    ctx.moveTo(firstStaticLineX + numberOfLights * spacing, -5);
    ctx.bezierCurveTo(ctrlPt1_X, ctrlPt1_Y, ctrlPt2_X, ctrlPt2_Y, endPt_X, endPt_Y);
    ctx.stroke();
    /*
    // Affichage points de contrôles
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ctrlPt1_X, ctrlPt1_Y, 5, 0, 2 * Math.PI); // Control point one
    ctx.arc(ctrlPt2_X, ctrlPt2_Y, 5, 0, 2 * Math.PI); // Control point two
    ctx.fill();
    */
    rightBulb_X = firstStaticBulbX + numberOfLights * spacing + 80*Math.abs(Math.sin(degreeRight*Math.PI/180));
    rightBulb_Y = 340 - 30 + 30*(1-Math.pow(Math.sin(degreeRight*Math.PI/180),2));

    angleRightBulb = Math.atan2(endPt_Y-ctrlPt2_Y,endPt_X-ctrlPt2_X).toFixed(2).toString();
    angleRightBulbDegree = (Math.atan2(endPt_Y-ctrlPt2_Y,endPt_X-ctrlPt2_X)*180/Math.PI).toFixed(2).toString();

    ctx.translate(endPt_X, endPt_Y);
    ctx.rotate(angleRightBulb - Math.PI/2);
    ctx.drawImage(lightOn, -halfImgWidth, -halfImgHeight);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    //data3.innerHTML = "Ampoule droite radians : " + angleRightBulb;
    //data4.innerHTML = "Ampoule droite degrés : " + angleRightBulbDegree;

    /*
    A cubic Bézier curve has an equation of the form
        P(t)=(1−t)^3*P0 + 3*t*(1−t)^2 * P1 + 3*t^2(1−t)*P2+t^3*P3
    When you say you want the "angle" of the curve, I suppose you mean the angle between the curve's tangent and the
    x-axis. If this is what you want, then here's how to get it:

    If you differentiate the curve equation, you'll get
        P′(t)=(1−t)^2*(P1−P0)+2*t*(1−t)*(P2−P1)+t^2*(P3−P2)

    As you probably know, P′(t) is a vector that's in the direction of the tangent line of the curve at parameter
    value t. So, you just need to find the angle between this vector and the x-axis. If the vector is (u,v), then
    the angle is arctan(v/u). If you're writing code, compute atan2(v,u).
    */
}

function drawGrid(){
    // Quadrillage : barres verticales puis barres horizontales
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 50; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 50, 0);
        ctx.lineTo(i * 50, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= 50; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * 50);
        ctx.lineTo(canvas.width, i * 50);
        ctx.stroke();
    }
}