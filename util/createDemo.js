var querystring = require('querystring');


module.exports =  function(res,callback){
	var postData = "";
	req.addListener('data', function(postDataChunk) {
   		 postData += postDataChunk;
   		//console.log(postDataChunk,querystring.parse(postDataChunk))
    });

	req.addListener('end', function() {
        if(postData)
       		postData =(postData.indexOf('{') === 0) ? JSON.parse(postData) : querystring.parse(postData);

       	res.writeHead({"Content-Type": "text/plain"});
       	
       	
    });

	res.end();
}