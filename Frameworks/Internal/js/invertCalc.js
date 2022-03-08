/*
 * Filename: c:\Projects\HNH_Checklists\Frameworks\Internal\invertCalc.js
 * Path: c:\Projects\HNH_Checklists\Frameworks\Internal
 * Created Date: Sunday, February 20th 2022, 12:55:31 pm
 * Author: Nathan (ThatFloridaMan)
 * 
 * Copyright (c) 2022 Your Company
 */

//Grabs value from input of type 'number' and handles errors.


function onPressCalc() {
  var topEl = getNumberElementValue("topElevation", false, true);
  console.log("Key value pair: [topElevation," + topEl + "]")
  var mdDistance = getNumberElementValue("measureElevation", false, false);
  console.log("Key value pair: [measureElevation," + mdDistance + "]")
  var mdAngle = getNumberElementValue("measureAngle", true, false);
  console.log("Key value pair: [measureAngle," + mdAngle + "]")
  
  if (isNaN(topEl) || isNaN(mdDistance) || isNaN(mdAngle)) {
    console.log("Could not continue, not enough values were provided.");
    return;
  }

  var result = topEl - mdDistance * Math.cos(degreesToRadians(mdAngle));
  console.log(result);

  createRow(topEl, mdDistance, mdAngle, result);

  clearForm(false);

  //console.log("Continuing")
}

function createRow(topEl, mdDistance, mdAngle, result) {
  var cell = document.getElementById("resultArea");

  var date = new Date();
  var time = date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":" + date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":" + date.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2});

  var newText = "<tr>"+
    "<td class='d-none d-md-table-cell'>" + 
    time + 
    "</td><td>" +
    Number(topEl).toFixed(2) + " - " + (mdDistance * Math.cos(degreesToRadians(mdAngle))).toFixed(2) + "<br><small class='text-muted'>" + Number(mdDistance).toFixed(2) + " * cos(" + Number(mdAngle).toFixed() + ")</small>" + 
    "</td><td>" +
    "<span class='fw-bold'>" + result.toFixed(2) + "</span>" +
    "</td><td class='text-center align-middle'>" +
    "<input type='button' class='btn-close' onclick='deleteRow(this)'>" +
    "</td></tr>";

  cell.innerHTML += newText;
}

function clearForm(includeRim) {
  document.getElementById("measureElevation").value = "";
  document.getElementById("measureAngle").value = "";
  document.getElementById("measureElevation").focus();
  if (includeRim) {
    document.getElementById("topElevation").value = "";
    document.getElementById("topElevation").focus();
  }

}

function keyPressToProceed(e) {
  var keynum;

  if(window.event) { // IE                  
    keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera                 
    keynum = e.which;
  }

  if (keynum === 13) {
    onPressCalc();
  }
}