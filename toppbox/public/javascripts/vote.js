var contents;
$(document).ready(function() {

var drake=dragula([document.querySelector(".allPicks"), document.querySelector("#userPick")]);



$('#button').click(function(){
  var first = $("#userPick:nth-of-type(1)").html()
  var second = $("#userPick:nth-of-type(2)").html()

  console.log(first);
  console.log(second);
  document.getElementById("the-form").value = first;
})


});
