var unirest = require('unirest')
var rsvp = require('rsvp')

function getData(){
  return new Promise(function(resolve, reject){
    unirest.post('http://www.boxofficemojo.com/data/js/wknd5.php').end(function(result){
      console.log(result.status);
      if(result.status != 200){
        console.log('error retreiving data');
        reject(result.body);
      }else{
        var data = result.body;
        resolve(data)
    }
  })
 })
}
module.exports = getData().then(function(response){
  var titles = []
  var amounts = []
  var boxOffice = {}
  var raw = response.slice(response.indexOf('Weekend Box Office'));
  var array = raw.split(';')

  array.forEach(function(elem, i){
    titles.push(array[i].slice(array[i].indexOf('. '), array[i].indexOf('</td><t')));

  })
  array.forEach(function(elem, i){
    amounts.push(boxOffice.amounts = array[i].slice(array[i].indexOf('$'), array[i].indexOf('M')));
  })
  titles = titles.filter(function(title){
    return title.length
  })
  amounts = amounts.filter(function(title){
    return title.length
  })



  boxOffice.date = new Date();
  boxOffice.amounts = amounts;
  titles.shift()
  boxOffice.titles = titles;
  return boxOffice;

})
