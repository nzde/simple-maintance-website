document.addEventListener("DOMContentLoaded", function() {
  
changeYear();
  
//zmiana roku na bieżący
function changeYear(){
  var date = new Date();
  var actYear = date.getFullYear();
  var footerYear = document.getElementById('act-year');

  footerYear.innerText = 'Copyrights ' + actYear;
  
};

  });