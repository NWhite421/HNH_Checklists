/*
 * Filename: c:\Projects\HNH_Checklists\Frameworks\Internal\invertCalc.js
 * Path: c:\Projects\HNH_Checklists\Frameworks\Internal
 * Created Date: Sunday, February 20th 2022, 12:55:31 pm
 * Author: Nathan (ThatFloridaMan)
 * 
 * Copyright (c) 2022 Your Company
 */

function onPressCalc() {
  var topElText = document.getElementById("topElevationValue").value;
  var invDistanceText = document.getElementById("invertDistanceValue").value;
  var angleText = document.getElementById("inputAngleValue").value;
  var stopCalc = false;

  console.log(topElText + ", " + invDistanceText + ", " + angleText);

  if (topElText == "") {
    document.getElementById("topElevationError").hidden = false;
    document.getElementById("topElevationError").innerText = "Please enter a value."
    stopCalc = true;
  }
  if (invDistanceText == "") {
    document.getElementById("invertError").hidden = false;
    document.getElementById("invertError").innerText = "Please enter a value."
    stopCalc = true;
  }

  if (stopCalc) {
    console.log("Calculation cancelled.");
    return;
  }

  var topElNumber = parseFloat(topElText);
  var invDistanceNumber = parseFloat(invDistanceText);
  var angleNumber = parseFloat(angleText);


  if (isNaN(topElNumber)) {
    document.getElementById("topElevationError").hidden = false;
    document.getElementById("topElevationError").innerText = "Please enter a number.";
    stopCalc = true;
  }
  if (isNaN(invDistanceNumber) || invDistanceNumber < 0) {
    document.getElementById("invertError").hidden = false;
    document.getElementById("invertError").innerText = "Please enter a positive number.";
    stopCalc = true;
  }
  if (angleText != "" && isNaN(angleNumber)) {
    document.getElementById("angleError").hidden = false;
    document.getElementById("angleError").innerText = "Please enter a number.";
    stopCalc = true;
  }
  else if(angleText == "") {
    angleNumber = 0;
  }

  console.log(topElNumber + ", " + invDistanceNumber + ", " + angleNumber);

  if (stopCalc) {
    console.log("Calculation cancelled.");
    return;
  }

  document.getElementById("topElevationError").hidden = true;
  document.getElementById("invertError").hidden = true;
  document.getElementById("angleError").hidden = true;

  var res = topElNumber - (invDistanceNumber * Math.cos(degrees_to_radians(angleNumber)));
  if (isNaN(res)){
    window.alert("A calculation error occurred, please report this issue with the information in the log.");
    return;
  }
  createRow(topElNumber, invDistanceNumber, angleNumber, res);
  document.getElementById("invertDistanceValue").value = "";
  document.getElementById("inputAngleValue").value = "";
  document.getElementById("invertDistanceValue").focus();
}

function createRow(top, inv, angle, result) {
  var cell = document.getElementById("history");
  var newText = top.toFixed(2) + "-"+ (inv * Math.cos(degrees_to_radians(angle))).toFixed(2) + "[" + inv.toFixed(2) + "*cos(" + angle.toFixed() + ")]=<span style='font-weight:bold'>"+ result.toFixed(2) + "</span><br/>"; 
  cell.innerHTML += newText;
}

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function clearHistory(){
  var cell = document.getElementById("history");
  cell.innerHTML = "";
}