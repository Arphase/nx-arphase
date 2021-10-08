import { unlinkSync, writeFile } from 'fs';

import packageJson from '../../../../../package.json';

const targetPath = './apps/valmira/app/src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: ${process.env.ENVIRONMENT_NAME === 'production'},
   apiUrl: '${process.env.API_URL}',
   version: '${packageJson.version}',
   environmentName: '${process.env.ENVIRONMENT_NAME}',
   stripeKey: '${process.env.STRIPE_PUBLIC_KEY}'
};
`;

console.log('The file `environment.prod.ts` will be written with the following content: \n');
console.log(envConfigFile);

unlinkSync(targetPath);

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.prod.ts file generated correctly at ${targetPath} \n`);
  }
});
