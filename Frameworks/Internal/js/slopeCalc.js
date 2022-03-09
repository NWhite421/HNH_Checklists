/*
 * Filename: c:\Projects\HNH_Checklists\Frameworks\Internal\js\slopeCalc.js
 * Path: c:\Projects\HNH_Checklists\Frameworks\Internal\js
 * Created Date: Tuesday, March 1st 2022, 5:06:32 pm
 * Author: Nathan (ThatFloridaMan)
 * 
 * Copyright (c) 2022 Your Company
 */

function onPressCalc() {
  var startEl = getNumberElementValue("startElevation", false, true);
  console.log("Key value pair: [startElevation," + startEl + "]");
  var endEl = getNumberElementValue("endElevation", false, true);
  console.log("Key value pair: [endElevation," + endEl + "]");
  var distance = getNumberElementValue("distance2D", false, false);
  console.log("Key value pair: [distance2D," + distance + "]");
  var isAbsolute = getCheckboxValue("absoluteCalc");
  console.log("Key value pair: [absoluteCalc," + isAbsolute + "]");
  
  if (isNaN(startEl) || isNaN(endEl) || isNaN(distance)) {
    console.log("Could not continue, not enough values were provided.");
    return;
  }

  var topLine = startEl - endEl;

  if (isAbsolute) {
    topLine = Math.abs(topLine);
  }

  var result = topLine / distance;

  createRow(startEl, endEl, distance, isAbsolute, result);

  clearForm();

  //console.log("Continuing")
}

function createRow(startEl, endEl, distance, isAbsolute, result) {
  var cell = document.getElementById("resultArea");

  var date = new Date();
  var time = date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":" + date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":" + date.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2});

  var newText = "<tr>"+
    "<td class='d-none d-md-table-cell'>" + 
    time + 
    "</td><td>" +
    ((isAbsolute) ? "|(" : "(") + Number(startEl).toFixed(2) + " - " + Number(endEl).toFixed(2) + ((isAbsolute) ? ")| / " : ") / ") + Number(distance).toFixed(2) +
    "</td><td>" +
    "<span class='fw-bold'>" + Number(result*100).toFixed(2) + "%</span>" +
    "</td><td class='text-center align-middle'>" +
    "<input type='button' class='btn-close' onclick='deleteRow(this)'>" +
    "</td></tr>";

  cell.innerHTML += newText;
}

function clearForm() {
  document.getElementById("startElevation").value = "";
  document.getElementById("endElevation").value = "";
  document.getElementById("distance2D").value = "";
  document.getElementById("startElevationError").hidden = true;
  document.getElementById("endElevationError").hidden = true;
  document.getElementById("distance2DError").hidden = true;
  document.getElementById("startElevation").focus();
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