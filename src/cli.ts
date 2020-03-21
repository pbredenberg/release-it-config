#!/usr/bin/env node
import releaseIt from 'release-it';
import releaseItOptions from './index';

const run = (): void => {
   const args = process.argv || [];

   args.forEach((arg: string) => {
      const argumentValues = arg.split('=');

      console.log(args); // eslint-disable-line

      // TODO: Create interface for release-it options.
      const runRelease = (options: object): void => {
         let mergedOptions = Object.assign(releaseItOptions, options);

         releaseIt(mergedOptions)
            .then((output: any) => {
               console.log('output', output); // eslint-disable-line
            });
      };

      const preReleaseWhitelist = [
         'alpha',
         'beta',
         'rc',
      ];

      if (argumentValues[0] === '--preRelease') {
         const preReleaseType = argumentValues[1];

         if (preReleaseWhitelist.indexOf(preReleaseType) === -1) {
            throw new Error(
               `Please provide a valid pre-release type such as: ${preReleaseWhitelist.join(', ')}`
            );
         }

         runRelease({ preRelease: preReleaseType });
      }
   });
};

run();
