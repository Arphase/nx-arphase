import { unlinkSync, writeFile } from 'fs';

const targetPath = './dist/apps/musicr/browser/assets/js/env.js';

const envConfigFile = `(function(window) {
  window.env = window.env || {};
  // Environment variables
  window['env']['production'] = ${process.env.ENVIRONMENT_NAME === 'production'};
  window['env']['environmentName'] = '${process.env.ENVIRONMENT_NAME}';
  window['env']['innovatechUrl'] = '${process.env.INNOVATECH_URL}';
})(this);`;

console.log('The file `env.js` will be written with the following content: \n');
console.log(envConfigFile);

try {
  unlinkSync(targetPath);
} catch (e) {
  console.log('No env.js file exists yet');
}

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular env.js file generated correctly at ${targetPath} \n`);
  }
});
