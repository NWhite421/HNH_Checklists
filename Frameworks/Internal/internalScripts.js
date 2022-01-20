//window events
window.addEventListener("beforeprint", onPagePrint);
window.addEventListener("afterprint", onPageCompletePrint);
window.addEventListener("load", onPageLoad);

//internal properties
var readdNoprint = false;
var pageTitle = "";

function onPageLoad() {
  checkCookie();
}

function onPagePrint() {
  console.log("beginning print")
  //set date on print page
  var datetime = new Date().toLocaleString();
  var dateText = document.getElementById("timestamp");
  dateText.innerText = "Printed: ".concat(datetime);

  //Add job number to text line
  var jobText = document.getElementById("jobInput");
  var jobPrintArea = document.getElementById("currentJob");
  if (jobText != null && jobText.value !="") {
    jobPrintArea.innerText = jobText.value;
  }
  else {
    jobPrintArea.innerText = "Not Provided";
  }

  //set page title for easy PDF printing
  pageTitle = document.title;
  document.title = jobPrintArea.innerText + " - " + getCookie("username") + " - " + new Date().toDateString();

  //Show comment section if user selects it.
  var commentArea = document.getElementById("commentSection");
  var includeCommentArea = document.getElementById("includeCommentSection").checked;
  if (includeCommentArea && commentArea != null) {
    readdNoprint = true;
    commentArea.classList.toggle("d-none");
    var textEntry = document.getElementById("commentSectionText").value;
    var commentText = convertTextareaToHTML(textEntry);
    document.getElementById("commentContent").innerHTML = commentText;
  }
};

function onPageCompletePrint() {
  var commentArea = document.getElementById("commentSection");
  if (readdNoprint) {
    readdNoprint = false;
    commentArea.classList.toggle("d-none");
  }

  if (pageTitle != "") {
    document.title = pageTitle;
    pageTitle = "";
  }
}

function uncheckAll() {
  var clist = document.getElementsByTagName("input");
  for (var i = 0; i < clist.length; ++i) {
    if (clist[i].type == "checkbox") {
      clist[i].checked = false;
    }
    else {
      clist[i].value = "";
    }
  }
  var commentArea = document.getElementById("commentSectionText");
  commentArea.value = "";
}

function convertTextareaToHTML(textArea) {
  var input = textArea;
  console.log(input);
  var lines = input.split('\n');
  var html = '';
  for (var i = 0; i < lines.length; i++) {
    html += '<p class="my-1">' + lines[i] + '</p>';
  }
  return html;
}

//Credit: W3Schools
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Credit: W3Schools
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//Credit: W3Schools
//Modified by nwhite
function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    console.log("Welcome again " + user);
    setCookie("username", user, 365); //refresh the experation date of the cookie.
    updateUser(user);
  } else {
    changeUsername();
  }
}

function changeUsername() {
  let user = getCookie("username");
  user = prompt("Please enter your first and last name:", user);
  if (user != "" && user != null) {
    setCookie("username", user, 365);
    updateUser(user);
  }
  return false;
}

function updateUser(uName) {
  var userField = document.getElementById("currentUser");
  userField.innerText = uName;
}