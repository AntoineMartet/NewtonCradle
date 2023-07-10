/**
 * @file     script.js
 * @brief    Draws an animated Newton's cradle on a 2D canvas
 * @author   Created by AntoineM
 * @version  10.07.2023
 */

let canvas = document.getElementById("mainCanvas");
let ctx = canvas.getContext("2d");
let lightOn = document.getElementById("lightOn");
let lightOff = document.getElementById("lightOff");
let data1 = document.getElementById("data1");
let data2 = document.getElementById("data2");
let data3 = document.getElementById("data3");
let data4 = document.getElementById("data4");

// Dimensions of the bulbs images
const imgWidth = 48;
const imgHeight = 160;

// Number of static bulbs
const numberOfStaticBulbs = 10;

// Coordinates of the first static bulb and line
const firstStaticBulbX = 225;
const firstStaticLineX = firstStaticBulbX + imgWidth / 2;
const firstStaticLineY1 = -5;
const firstStaticLineY2 = 345;

// Angles in radians and degrees of the bulbs
let leftBulbAngle;
let leftBulbAngleDegree;
let rightBulbAngle;
let rightBulbAngleDegree;

// Variables used to gradually move the coordinates of the end points of the Bezier curves
// Updated at each time interval
// Look at drawLeftBulbs() and drawRightBulbs() to see how it is used
let degreeLeft = 90;
let degreeRight = 0;

// Speed of the swinging movement
const leftSpeed = 4;
const rightSpeed = 4;

// Duration of the transition in ms
const transitionDuration = 400;
let transitionClock = 0;
let onStaticBulbIndex = 0;

// Booleans to tell where we are in the animation
let leftBulbStage = true;
let rightBulbStage = false;
let transitionStage = false;
let transitionToRight = true;

// Coordinates of the 4 points of the left Bezier curve
const leftBeginPt_X = firstStaticLineX - imgWidth;
const leftBeginPt_Y = -5;
const leftCtrlPt1_X = firstStaticLineX - imgWidth;
const leftCtrlPt1_Y = 100;
const leftCtrlPt2_X = firstStaticLineX - imgWidth;
const leftCtrlPt2_Y = 280;
let leftEndPt_X;
let leftEndPt_Y;

// Coordinates of the 4 points of the right Bezier curve
const rightBeginPt_X = firstStaticLineX + numberOfStaticBulbs * imgWidth;
const rightBeginPt_Y = -5;
const rightCtrlPt1_X = firstStaticLineX + numberOfStaticBulbs * imgWidth;
const rightCtrlPt1_Y = 100;
const rightCtrlPt2_X = firstStaticLineX + numberOfStaticBulbs * imgWidth;
const rightCtrlPt2_Y = 280;
let rightEndPt_X;
let rightEndPt_Y;

let timeInterval = 20;
setInterval(draw, timeInterval);

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 6;

    drawStaticBulbs(onStaticBulbIndex);
    drawLeftBulb();
    drawRightBulb();

    if(leftBulbStage){
        degreeLeft += leftSpeed;
        if(degreeLeft >= 180){
            leftBulbStage = false;
            transitionStage = true;
            degreeLeft = 0;
        }
    }

    if(transitionStage && transitionToRight){
        if(transitionClock >= (transitionDuration / numberOfStaticBulbs) * (onStaticBulbIndex + 1)){
            onStaticBulbIndex += 1;
        }
        transitionClock += timeInterval;
        if(transitionClock >= transitionDuration){
            transitionStage = false;
            transitionToRight = false;
            rightBulbStage = true;
            transitionClock = transitionDuration;
        }
    }else if(transitionStage && !transitionToRight){
        if(transitionClock <= (transitionDuration / numberOfStaticBulbs) * (onStaticBulbIndex)){
            onStaticBulbIndex -= 1;
        }
        transitionClock -= timeInterval;
        if(transitionClock <= 0){
            transitionStage = false;
            transitionToRight = true;
            leftBulbStage = true;
            transitionClock = 0;
        }
    }

    if(rightBulbStage){
        degreeRight += rightSpeed;
        if(degreeRight >= 180){
            rightBulbStage = false;
            transitionStage = true;
            degreeRight = 0;
        }
    }
}

// Draws the string and the bulb of each static bulb
function drawStaticBulbs(onIndex){
    for(let i=0; i<numberOfStaticBulbs; i++){
        // Draws static line
        ctx.beginPath();
        ctx.moveTo(firstStaticLineX + i*imgWidth, firstStaticLineY1);
        ctx.lineTo(firstStaticLineX + i*imgWidth, firstStaticLineY2);
        ctx.stroke();
        // Draws static bulb
        if(i == onIndex && transitionStage){
            ctx.drawImage(lightOn, firstStaticBulbX + i*imgWidth, firstStaticLineY2 - imgHeight / 2);
        }else{
            ctx.drawImage(lightOff, firstStaticBulbX + i*imgWidth, firstStaticLineY2 - imgHeight / 2);
        }
    }
}

// Draws the string and bulb of the left bulb
function drawLeftBulb(){
    // Update of the coordinates of the left Bezier end point
    if(leftBulbStage == true){
        leftEndPt_X = firstStaticLineX - imgWidth - 70*Math.abs(Math.sin(degreeLeft*Math.PI/180));
        leftEndPt_Y = firstStaticLineY2 - 30 + 30*(1-Math.pow(Math.sin(degreeLeft*Math.PI/180),2));
    }else{
        leftEndPt_X = firstStaticLineX - imgWidth;
        leftEndPt_Y = firstStaticLineY2;
    }

    // Draws the left Bezier curve
    ctx.beginPath();
    ctx.moveTo(leftBeginPt_X, leftBeginPt_Y);
    ctx.bezierCurveTo(leftCtrlPt1_X, leftCtrlPt1_Y, leftCtrlPt2_X, leftCtrlPt2_Y, leftEndPt_X, leftEndPt_Y);
    ctx.stroke();

    // Gets the angle of the left bulb in radians and in degrees
    leftBulbAngle = getBulbAngle(leftCtrlPt2_X, leftCtrlPt2_Y, leftEndPt_X, leftEndPt_Y);
    leftBulbAngleDegree = (leftBulbAngle*180/Math.PI).toFixed(0);

    // Draws the left bulb
    drawBulb(leftEndPt_X, leftEndPt_Y, leftBulbAngle, leftBulbStage);
    /*
    // Displays the angle of the left bulb
    data1.innerHTML = "Ampoule gauche radians : " + leftBulbAngle;
    data2.innerHTML = "Ampoule gauche degrés : " + leftBulbAngleDegree;

    // Draws the left control points
    displayControlPoints(leftCtrlPt1_X, leftCtrlPt1_Y, leftCtrlPt2_X, leftCtrlPt2_Y);
    */
}

// Draws the string and bulb of the right bulb
function drawRightBulb(){
    // Update of the coordinates of the right Bezier end point
    if(rightBulbStage == true){
        rightEndPt_X = firstStaticLineX + numberOfStaticBulbs * imgWidth + 70*Math.abs(Math.sin(degreeRight*Math.PI/180));
        rightEndPt_Y = firstStaticLineY2 - 30 + 30*(1-Math.pow(Math.sin(degreeRight*Math.PI/180),2));
    }else{
        rightEndPt_X = firstStaticLineX + numberOfStaticBulbs * imgWidth;
        rightEndPt_Y = firstStaticLineY2;
    }

    // Draws the right Bezier curve
    ctx.beginPath();
    ctx.moveTo(rightBeginPt_X, rightBeginPt_Y);
    ctx.bezierCurveTo(rightCtrlPt1_X, rightCtrlPt1_Y, rightCtrlPt2_X, rightCtrlPt2_Y, rightEndPt_X, rightEndPt_Y);
    ctx.stroke();

    // Gets the angle of the right bulb in radians and in degrees
    rightBulbAngle = getBulbAngle(rightCtrlPt2_X, rightCtrlPt2_Y, rightEndPt_X, rightEndPt_Y);
    rightBulbAngleDegree = (rightBulbAngle*180/Math.PI).toFixed(0);

    // Draws the right bulb
    drawBulb(rightEndPt_X, rightEndPt_Y, rightBulbAngle, rightBulbStage);
    /*
    // Displays the angle of the right bulb
    data3.innerHTML = "Ampoule droite radians : " + rightBulbAngle;
    data4.innerHTML = "Ampoule droite degrés : " + rightBulbAngleDegree;

    // Draws the right control points
    displayControlPoints(rightCtrlPt1_X, rightCtrlPt1_Y, rightCtrlPt2_X, rightCtrlPt2_Y);
     */
}

// Returns the angle of the bulb (which is equal to the angle at the end of the Bezier curve)
function getBulbAngle(pt2X, pt2Y, endPtX, endPtY){
    let angleBulb = Math.atan2(endPtY-pt2Y,endPtX-pt2X).toFixed(2);
    return angleBulb;
}

// Draws the bulb with the correct angle then reset the working coordinates to their default ones
function drawBulb(endPtX, endPtY, angleBulb, isOn){
    ctx.translate(endPtX, endPtY);
    ctx.rotate(angleBulb - Math.PI/2);
    if(isOn){
        ctx.drawImage(lightOn, -imgWidth / 2, -imgHeight / 2);
    }else{
        ctx.drawImage(lightOff, -imgWidth / 2, -imgHeight / 2);
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
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