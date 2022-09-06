import http from 'http';
import spauth from 'node-sp-auth';
import requestprom from 'request-promise';
import {username, password} from './config.js';
// Site and User Creds  
const url = 'https://ammegagroup.sharepoint.com';
const server = http.createServer(function(request, response) {  
  // Authenticate with hardcoded credentials  
  spauth.getAuth(url, {          
    username:username,  
    password:password  
  })  
  .then(function(options){  
    // Headers  
    var headers = options.headers;
    headers['Accept'] = 'application/json;odata=verbose';
    // Pull the SharePoint list items  
    requestprom.get({  
    url: url+"/_api/web/lists/getByTitle('Documents')/items",  
        headers: headers,  
        json: true  
    }).then(function(listresponse){
      var items = listresponse.d.results;
      var responseJSON = [];
      // process  
      items.forEach(function(item) {  
        console.log('item', item)
          if(item.Title !=null){  
              responseJSON.push(item.Title);
          }                     
      }, this);
      // Print / Send back the data  
      response.end(JSON.stringify(responseJSON));
    });
  });

});

var port = process.env.PORT || 1337;
server.listen(port); 
