import http from 'http';
import spauth from 'node-sp-auth';
import requestprom from 'request-promise';
import {username, password} from './config.js';

// Site and User Creds  
const url = 'https://ammegagroup.sharepoint.com';
const server = http.createServer(function(request, response) {  
  // Authenticate with hardcoded credentials  
  spauth.getAuth(url, {          
    username: username,
    password: password  
  })
  .then(function(options){
    // Headers  
    var headers = options.headers;
    headers['Accept'] = 'application/json;odata=verbose';
    requestprom.get({  
      // This works:
      // url: url+"/_api/web/GetFolderByServerRelativeUrl('/Shared Documents')",
      // This doesn't:
      // https://ammegagroup.sharepoint.com/sites/DatasheetPOC/_api/web/GetFolderByServerRelativeUrl('DataSheet')
      // url: url+"/sites/Datasheet_POC/_api/web/GetFolderByServerRelativeUrl('PDF')",
      url: url+"/sites/DatasheetDev/_api/web/getfolderbyserverrelativeurl('PDF')",
      // url: url+"/sites/Datasheets/_api/web/getfolderbyserverrelativeurl('PDF')",
      headers: headers,
      json: true
    }).then(function(listresponse){
      console.log('listresponse', listresponse)
      return;

      // Later we will loop items and such ->
      var items = listresponse.d.Files;
      var responseJSON = [];
      // process  
      items.forEach(function(item) {  
        console.log('item', item)
        if(item.Title !=null){  1
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
