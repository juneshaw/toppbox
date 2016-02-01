var topfive = require('./topfive')
var unirest = require('unirest')






topfive.then(function(result){
  var formatTitles = []
  result.titles.forEach(function(item){
    formatTitles.push(item.split(' ').join('+'));
  })
  formatTitles.forEach(function(item){
  unirest.post('http://www.omdbapi.com/?t='+item+'&y=&plot=short&r=json').end(function(result){
    // console.log(result.body.Title);
  });
 })
})
