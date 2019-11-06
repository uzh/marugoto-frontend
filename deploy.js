//###################################
//# Author: Joachim Hummel
//# Easy Deploy V1.0
//# 04.10.2018
//###################################
/* eslint no-console: 0 */

const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();
const dotenv = require('dotenv');
const chalk = require('chalk');
const env = process.env;
const fs = require('fs');

const rootDir = __dirname + '/dist'; // local dir to upload from

dotenv.config({path: '.env.development.local'}); // path to your env file

let newestFileData = {}; // global data store

// HELP
if ( // check if all the necessary environment variables are set
  env.DEPLOY_USER && env.DEPLOY_PW && env.DEPLOY_HOST && env.DEPLOY_PORT && env.DEPLOY_REMOTE_ROOT ){ console.log(chalk.green('Checked environment variables...'));
}else{ // give some advice, if not
  console.log(chalk.red('Missing environment variables!\nMake sure you have defined:\n\nDEPLOY_USER\nDEPLOY_PW\nDEPLOY_HOST\nDEPLOY_PORT\nDEPLOY_REMOTE_ROOT\n')); process.exit(1); // exit the script
}

// CONFIG
const config = {
  user: env.DEPLOY_USER, // DEPLOY_USER=username
  password: env.DEPLOY_PW, // DEPLOY_PW=password1234
  host: env.DEPLOY_HOST, // DEPLOY_HOST=ftp.domainname.ch
  port: env.DEPLOY_PORT, // DEPLOY_PORT=21
  localRoot: rootDir, // local dir to upload from
  remoteRoot: env.DEPLOY_REMOTE_ROOT, // DEPLOY_REMOTE_ROOT=./
  include: ['*', '**/*'], // filepattern to in dir
  deleteRemote: false // empty target folder on remote?
};

ftpDeploy.on('uploading', function(data) { // while uploading a file
    process.stdout.write('Uploading File ' + data.transferredFileCount + ' / ' + data.totalFilesCount + ' -> ' + chalk.blue(data.filename) + '...');
});

ftpDeploy.on('uploaded', function(data) { // when file is uploaded
  newestFileData = data; // write to global store
  console.log(
    chalk.green(' uploaded!')
  );
});

// VERSIONING
const date = new Date();

fs.writeFile((rootDir + '/upload.md'), ('Last Upload: ' + date), function (err) {
  if (err) throw err;
  console.log(chalk.green('Uploadfile is created.'));
});

// DEPLOY
ftpDeploy.deploy(config) // when all the files are uploaded or an error occurred
  .then(() => console.log(chalk.green('Uploaded ' + (newestFileData.transferredFileCount - 1) + ' / ' + newestFileData.totalFilesCount + ' Files!')))
  .catch(err => console.log(err));
