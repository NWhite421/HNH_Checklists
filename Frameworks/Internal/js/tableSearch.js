function searchTable() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue, column;
  input = document.getElementById("searchBar");
  column = getRadioGroupValue("btnradio");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableCodes");
  tr = table.getElementsByTagName("tr");

  var columnId = (column.toString() == "btnradio1") ? 0 : 2;

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[columnId];
    if (td) {
      txtValue =  td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function clearSearch() {
  var input = document.getElementById("searchBar");
  input.value = "";
  searchTable();
}