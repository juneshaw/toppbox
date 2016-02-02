
var unirest = require('unirest')



function getUpcoming(){
  return new Promise(function(resolve, reject){
    unirest.post('http://api.themoviedb.org/3/movie/upcoming?api_key=391a8239c6a23bf8e17a18f22b20f434').end(function(result){
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

module.exports = getUpcoming().then(function(data){
  return data; 
})
