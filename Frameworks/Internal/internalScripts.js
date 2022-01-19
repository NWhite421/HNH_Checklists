window.addEventListener("beforeprint", onPagePrint);
window.addEventListener("afterprint", onPageCompletePrint);

var readdNoprint = false;

function onPagePrint() {
    var datetime = new Date().toLocaleString();
    var dateText = document.getElementById("timestamp");
    dateText.innerText = "Printed: ".concat(datetime);
    var commentArea = document.getElementById("commentSection");
    var includeCommentArea = document.getElementById("includeCommentSection").checked;
    if (includeCommentArea && commentArea != null) {
        readdNoprint = true;
        commentArea.classList.toggle("d-print-none");
    }
};

function onPageCompletePrint() {
    var commentArea = document.getElementById("commentSection");
    if (readdNoprint) {
        readdNoprint = false;
        commentArea.classList.toggle("d-print-none");
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