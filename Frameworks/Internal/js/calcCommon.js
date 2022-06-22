/*
 * Filename: c:\Projects\HNH_Checklists\Frameworks\Internal\js\calcCommon.js
 * Path: c:\Projects\HNH_Checklists\Frameworks\Internal\js
 * Created Date: Tuesday, March 1st 2022, 4:54:01 pm
 * Author: Nathan (ThatFloridaMan)
 * 
 * Copyright (c) 2022 Your Company
 */

function degreesToRadians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function radiansToDegrees(radians){
  var pi = Math.PI;
  return radians * (180/pi);
}

function clearHistory(){
  var cell = document.getElementById("resultArea");
  cell.innerHTML = "";
}

function getNumberElementValue(element, optional, allowNegatives) {
  var elementObj = document.getElementById(element);
  var elementErrorObj = document.getElementById(element + "Error");
  if (elementObj == null) {
    console.error("element [" + element + "] is not a valid element.");
    return NaN;
  }

  var value = elementObj.value;

  //console.log("Key value pair: [" + element + "," + value + "]")

  if (!optional && (isNaN(value) || value == "")) {
    elementErrorObj.innerText = "Value needs to be a number";
    elementErrorObj.hidden = false;
    return NaN;
  }

  if (optional && (isNaN(value) || value == "")) {
    value = 0;
  }

  if (!allowNegatives && value < 0) {
    elementErrorObj.innerText = "Value needs to be greater than 0";
    elementErrorObj.hidden = false;
    return NaN;
  }

  elementErrorObj.hidden = true;
  return value;
}

function getTextElementValue(element, optional) {
  var elementObj = document.getElementById(element);
  var elementErrorObj = document.getElementById(element + "Error");

  if (elementObj == null) {
    console.error("element [" + element + "] is not a valid element.");
    return "";
  }

  var value = elementObj.value;

  if (!optional && value == "") {
    elementErrorObj.innerText = "Value cannot be empty";
    elementErrorObj.hidden = false;
    return "";
  }

  elementErrorObj.hidden = true;
  return value;
}

function getCheckboxValue(element) {
  var elementObj = document.getElementById(element);

  if (elementObj == null) {
    console.error("element [" + element + "] is not a valid element.");
    return false;
  }
  return elementObj.checked;
}

function deleteRow(id) {
  console.log(id);
  var p=id.parentNode.parentNode;
  p.parentNode.removeChild(p);
}

function alertInnerHTML(e)
{
    e = e || window.event;//IE
    alert(this.innerHTML);
}