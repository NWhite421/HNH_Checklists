/*
 * Filename: c:\Projects\HNH_Checklists\Frameworks\Internal\js\calcProrate.js
 * Path: c:\Projects\HNH_Checklists\Frameworks\Internal\js
 * Created Date: Monday, March 7th 2022, 6:27:57 pm
 * Author: Nathan (ThatFloridaMan)
 * 
 * Copyright (c) 2022 Your Company
 */

function onPressCalc() {
  var startEl = getNumberElementValue("startElevation", false, true);
  console.log("Key value pair: [startElevation," + startEl + "]");
  var distance = getNumberElementValue("distance2D", false, false);
  console.log("Key value pair: [distance2D," + distance + "]");
  var slope = getNumberElementValue("slope", false, true);
  console.log("Key value pair: [slope," + slope + "]");
  var direction = getRadioGroupValue("btnDirection");
  console.log("Key value pair: [btnDirection," + direction + "]");
  
  if (isNaN(startEl) || isNaN(distance) || isNaN(slope)) {
    console.log("Could not continue, not enough values were provided.");
    return;
  }

  var adjDistance = distance * slope/100;
  console.debug(adjDistance);
  if (direction == "dirUp") {
    var result = Number(startEl) + adjDistance;
  } else {
    var result = Number(startEl) - adjDistance;
  }

  console.debug(result);

  createRow(startEl, distance, slope, direction, result);

  clearForm();

  //console.log("Continuing")
}



function createRow(startEl, distance, slope, direction, result) {
  var cell = document.getElementById("resultArea");

  var date = new Date();
  var time = date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":" + date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":" + date.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2});
  
  var adjDistance = distance * slope/100;

  var newText = "<tr>"+
    "<td class='d-none d-md-table-cell'>" + 
    time + 
    "</td><td>" +
    Number(startEl).toFixed(2) + ((direction == "dirUp") ? " + " : " - ") + adjDistance.toFixed(2) + "<br><small class='text-muted'>" + 
    Number(distance).toFixed(2) + "*" + Number(slope/100).toFixed(4) + "(" + Number(slope).toFixed(2) + "%)</small>" +
    "</td><td>" +
    "<span class='fw-bold'>" + Number(result).toFixed(2) + "</span>" +
    "</td><td class='text-center align-middle'>" +
    "<input type='button' class='btn-close' onclick='deleteRow(this)'>" +
    "</td></tr>";

  cell.innerHTML += newText;
}

function clearForm(clear) {
  document.getElementById("distance2D").value = "";
  document.getElementById("distance2D").focus();
  if (clear) {
  document.getElementById("startElevation").value = "";
  document.getElementById("slope").value = "";
  document.getElementById("startElevation").focus();
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