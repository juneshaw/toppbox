// $('#movieImgs').draggable();


// $(document).ready(function(){
// dragula([$('movieImgs'), $('userPickImg')], {
//   revertOnSpill: true
// })
var express = require('express');
var dragula = require('dragula');
var $ = require('jquery');



dragula([document.getElementById(movieImgs), document.getElementById(userPickImg)])
  .on('drag', function (el) {
    el.className = el.className.replace('ex-moved', '');
  }).on('drop', function (el) {
    el.className += ' ex-moved';
  }).on('over', function (el, container) {
    container.className += ' ex-over';
  }).on('out', function (el, container) {
    container.className = container.className.replace('ex-over', '');
  });



drake.on('drop',function(el, target){
  if (target.className === 'poem'){
    el.style.transform = 'rotate(0deg)';
  } else if (target.className === 'fridge') {
    el.style.transform = 'rotate('+rotato()+'deg)'
  }
});

module.exports = dragula;


// });
