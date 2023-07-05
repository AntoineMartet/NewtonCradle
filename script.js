/**
 * @file     script.js
 * @brief    Draws an animated Newton's cradle on a 2D canvas
 * @author   Created by AntoineM
 * @version  05.07.2023
 */

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var lightOn = document.getElementById("lightOn");
var lightOff = document.getElementById("lightOff");
var data1 = document.getElementById("data1");
var data2 = document.getElementById("data2");
var data3 = document.getElementById("data3");
var data4 = document.getElementById("data4");

// Dimensions of the bulbs images
const imgWidth = 48;
const imgHeight = 160;

// Number of static bulbs
var numberOfBulbs = 5;

// Coordinates of the first static bulb and line
var firstStaticBulbX = 225;
var firstStaticLineX = firstStaticBulbX + imgWidth / 2;
var firstStaticLineY1 = -5;
var firstStaticLineY2 = 345;

// Beginning point, control points and end point coordinates of a cubic Bezier Curve
var beginPt_X;
var beginPt_Y;
var ctrlPt1_X;
var ctrlPt1_Y;
var ctrlPt2_X;
var ctrlPt2_Y;
var endPt_X;
var endPt_Y;

// Angles in radians and degrees of the bulbs
var angleLeftBulb;
var angleLeftBulbDegree;
var angleRightBulb;
var angleRightBulbDegree;

// Beginning angles of the left and right bulbs
var degreeLeft = 0;
var degreeRight = 0;

setInterval(draw, 20);

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawGrid();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 6;
    drawStaticLines();
    drawStaticBulbs();
    drawLeftBulbBezier();
    drawRightBulbBezier();
    // Sets the speed of the motion of the bulbs
    degreeLeft += 0.5;
    degreeRight += 0.5;
}

function drawStaticLines(){
    for(let i=0; i<numberOfBulbs; i++){
        ctx.beginPath();
        ctx.moveTo(firstStaticLineX + i*imgWidth, firstStaticLineY1);
        ctx.lineTo(firstStaticLineX + i*imgWidth, firstStaticLineY2);
        ctx.stroke();
    }
}

function drawStaticBulbs(){
    for(let i=0; i<numberOfBulbs; i++){
        ctx.drawImage(lightOff, firstStaticBulbX + i*imgWidth, firstStaticLineY2 - imgHeight / 2);
    }
}

function drawLeftBulbBezier(){
    // Coordinates of the 4 points of the left Bezier curve
    beginPt_X = firstStaticLineX - imgWidth;
    beginPt_Y = -5;
    ctrlPt1_X = firstStaticLineX - imgWidth;
    ctrlPt1_Y = 100;
    ctrlPt2_X = firstStaticLineX - imgWidth;
    ctrlPt2_Y = 280;
    endPt_X = firstStaticLineX - imgWidth - 80*Math.abs(Math.sin(degreeLeft*Math.PI/180));
    endPt_Y = firstStaticLineY2 - 30 + 30*(1-Math.pow(Math.sin(degreeLeft*Math.PI/180),2));

    // Draws the left Bezier curve
    ctx.beginPath();
    ctx.moveTo(beginPt_X, beginPt_Y);
    ctx.bezierCurveTo(ctrlPt1_X, ctrlPt1_Y, ctrlPt2_X, ctrlPt2_Y, endPt_X, endPt_Y);
    ctx.stroke();

    // Calculates the angle of the left bulb (which is equal to the angle at the end of the Bezier curve)
    angleLeftBulb = Math.atan2(endPt_Y-ctrlPt2_Y,endPt_X-ctrlPt2_X).toFixed(2).toString();
    angleLeftBulbDegree = (Math.atan2(endPt_Y-ctrlPt2_Y,endPt_X-ctrlPt2_X)*180/Math.PI).toFixed(2).toString();

    // Draws the left bulb with the correct angle then reset the working coordinates to their default ones
    ctx.translate(endPt_X, endPt_Y);
    ctx.rotate(angleLeftBulb - Math.PI/2);
    ctx.drawImage(lightOn, -imgWidth / 2, -imgHeight / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Displays the angle of the left bulb and the left control points
    data1.innerHTML = "Ampoule gauche radians : " + angleLeftBulb;
    data2.innerHTML = "Ampoule gauche degrés : " + angleLeftBulbDegree;
    displayControlPoints(ctrlPt1_X, ctrlPt1_Y, ctrlPt2_X, ctrlPt2_Y);
}

function drawRightBulbBezier(){
    // Coordinates of the 4 points of the right Bezier curve
    beginPt_X = firstStaticLineX + numberOfBulbs * imgWidth;
    beginPt_Y = -5;
    ctrlPt1_X = firstStaticLineX + numberOfBulbs * imgWidth;
    ctrlPt1_Y = 100;
    ctrlPt2_X = firstStaticLineX + numberOfBulbs * imgWidth;
    ctrlPt2_Y = 280;
    endPt_X = firstStaticLineX + numberOfBulbs * imgWidth + 80*Math.abs(Math.sin(degreeRight*Math.PI/180));
    endPt_Y = firstStaticLineY2 - 30 + 30*(1-Math.pow(Math.sin(degreeRight*Math.PI/180),2));

    // Draws the right Bezier curve
    ctx.beginPath();
    ctx.moveTo(firstStaticLineX + numberOfBulbs * imgWidth, -5);
    ctx.bezierCurveTo(ctrlPt1_X, ctrlPt1_Y, ctrlPt2_X, ctrlPt2_Y, endPt_X, endPt_Y);
    ctx.stroke();

    // Calculates the angle of the right bulb (which is equal to the angle at the end of the Bezier curve)
    angleRightBulb = Math.atan2(endPt_Y-ctrlPt2_Y,endPt_X-ctrlPt2_X).toFixed(2).toString();
    angleRightBulbDegree = (Math.atan2(endPt_Y-ctrlPt2_Y,endPt_X-ctrlPt2_X)*180/Math.PI).toFixed(2).toString();

    // Draws the right bulb with the correct angle then reset the working coordinates to their default ones
    ctx.translate(endPt_X, endPt_Y);
    ctx.rotate(angleRightBulb - Math.PI/2);
    ctx.drawImage(lightOn, -imgWidth / 2, -imgHeight / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Displays the angle of the right bulb and the right control points
    data3.innerHTML = "Ampoule droite radians : " + angleRightBulb;
    data4.innerHTML = "Ampoule droite degrés : " + angleRightBulbDegree;
    displayControlPoints(ctrlPt1_X, ctrlPt1_Y, ctrlPt2_X, ctrlPt2_Y);
}

// Displays the two control points of a cubic Bezier curve
function displayControlPoints(pt1X, pt1Y, pt2X, pt2Y){
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(pt1X, pt1Y, 5, 0, 2 * Math.PI); // Control point one
    ctx.arc(pt2X, pt2Y, 5, 0, 2 * Math.PI); // Control point two
    ctx.fill();
}

// Displays a greed pattern on the canvas : vertical lines first then horizontal lines
function drawGrid(){
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