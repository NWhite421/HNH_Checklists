window.addEventListener("beforeprint", onPagePrint);
window.addEventListener("afterprint", onPageCompletePrint);

var readdNoprint = false;

function onPagePrint() {
    //set date on print page
    var datetime = new Date().toLocaleString();
    var dateText = document.getElementById("timestamp");
    dateText.innerText = "Printed: ".concat(datetime);

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
    var lines = input.split( '\n' );
    var html = '';
    for( var i=0; i<lines.length; i++ ) {
        html += '<p class="my-1">' + lines[i] + '</p>';
    }
    return html;
}