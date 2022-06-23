//window events
window.addEventListener("beforeprint", onPagePrint);
window.addEventListener("afterprint", onPageCompletePrint);
window.addEventListener("load", onPageLoad);

//internal properties
var readNoPrint = false;
var pageTitle = "";

function onPageLoad() {
  verifyParams();
  verifySettings();
  updateUser();
}

function verifyParams() {
  var queryString = window.location.search;

  // var urlParams = new URLSearchParams(queryString);
  // if (urlParams.has('preview')){
  //   if (urlParams.get('preview') == 'true') {
  //     document.getElementById("text").innerHTML = "The window is in Preview Mode";
  //   }
  // }
}

function verifySettings() {
  var settingModal = document.getElementById("modalSettings");
  settingModal.addEventListener('show.bs.modal', modalShown);

  
  var user = getCookie("username");
  if (user == "") {
    changeUsername();
  }
}


function modalShown() {
  let user = getCookie("username");
  if (user != "") {
    setCookie("username", user, 365); //refresh the experation date of the cookie.
    document.getElementById("txtName").value = getCookie("username");
  } else {
  }

  var color = getCookie("colorMode");
  if (color != "") {
    document.getElementById("setting.color." + color).checked = true;
  }
  else 
  {
    document.getElementById("setting.color.system").checked = true;
  }
  // if (color != null){
  //   switch (color){
  //     case "light":
  //       document.getElementById("setting.color.light").checked = true;
  //       break;
  //     case "dark":
  //       document.getElementById("setting.color.dark").checked = true;
  //       break;
  //     case "system":
  //     default:
  //       document.getElementById("setting.color.system").checked = true;
  //       break;
  //   }
  // }
}

function onPagePrint() {
  console.log("beginning print")
  //set date on print page
  var datetime = new Date().toLocaleString();
  var dateText = document.getElementById("timestamp");
  dateText.innerText = "Printed: ".concat(datetime);

  //Add job number to text line
  var jobText = document.getElementById("jobInput");
  var jobPrintArea = document.getElementById("printCurrentJob");
  if (jobText != null && jobText.value !="") {
    jobPrintArea.innerText = jobText.value;
  }
  else {
    jobPrintArea.innerText = "Not Provided";
  }

  //add name 
  var name = getCookie("username");
  var nameArea = document.getElementById("printUserName");
  if (name != null && name.value !="") {
    nameArea.innerText = name;
  }
  else {
    jobPrintArea.innerText = "Not Provided";
  }

  //set page title for easy PDF printing
  pageTitle = document.title;
  document.title = jobPrintArea.innerText + " - " + getCookie("username") + " - " + new Date().toDateString();

  var sourceText = document.getElementById("commentSectionText");
  var printText = document.getElementById("commentContent");
  var commentText = "<span class='fst-italic'>No comments</span>";

  var textEntry = sourceText.value;
  if (textEntry.length > 0) {
    commentText = convertTextareaToHTML(textEntry);
  }
  printText.innerHTML = commentText;
};

function onPageCompletePrint() {
  var commentArea = document.getElementById("commentSection");
  if (readNoPrint) {
    readNoPrint = false;
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
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
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
function checkUsernameCookie() {
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
  console.log("calling settings modal");
  var settingModal = new bootstrap.Modal(document.getElementById('modalSettings'), {
    keyboard: false,
    backdrop: 'static'
  });
  document.getElementById('dismiss-modal').classList.add("visually-hidden")
  settingModal.show();
}

function saveSettings() {
  var userName = document.getElementById("txtName").value;
  if (userName == "") {
    window.alert("Please enter a name");
    return;
  }
  setCookie("username", userName, 365);
  
  column = getRadioGroupValue("btnGroup.settings.color").split('.');
  let columnValue = (column.length < 3) ? "system" : column[2];
  setCookie("colorMode", columnValue, 365);

  var myModalEl = document.getElementById('modalSettings');
  var settingModal = bootstrap.Modal.getInstance(myModalEl);
  settingModal.hide();
  if (document.getElementById('dismiss-modal').classList.contains('visually-hidden')){
    document.getElementById('dismiss-modal').classList.remove('visually-hidden');
  }
  updateUser();
}

function updateUser() {
  var username = getCookie("username");
  var userField = document.getElementById("currentUser");
  if (userField == null) {
    return;
  }
  userField.innerText = username;
}

function getRadioGroupValue(name) {
  var radio = document.querySelector('input[name=\"' + name + '\"]:checked').id;
  
  if (radio == null) {
    console.error("Radio group [" + name + "] is not a valid radio group.");
    return false;
  }

  return radio;
}
