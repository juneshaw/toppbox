var contents;
$(document).ready(function() {

var drake=dragula([document.querySelector(".allPicks"), document.querySelector("#userPick")])



$("#submit").click(function(){
  data = $("#userPick").html();
  $("#useDataField").val(data);
  $("#someForm").submit();
})



});
