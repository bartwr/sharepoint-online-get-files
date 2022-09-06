import {Download} from 'sp-download';
import {username, password} from './config.js';

const authContext = {
  username,
  password
}

const download = new Download(authContext);

let filePathToDownload = 'https://ammegagroup.sharepoint.com/sites/DatasheetPOC/DataSheet/ACCO000001_DS_ENU_A4.PDF';
let saveToPath = './download';

download.downloadFile(filePathToDownload, saveToPath)
  .then((savedToPath) => {
    console.log(`${filePathToDownload} has been downloaded to ${savedToPath}`);
  })
  .catch((error) => {
    console.log(error);
  });
