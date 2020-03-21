# release-it-config

[![NPM Version](https://img.shields.io/npm/v/@silvermine/release-it-config.svg)](https://www.npmjs.com/package/@silvermine/release-it-config)
[![License](https://img.shields.io/github/license/silvermine/release-it-config.svg)](./LICENSE)
[![Build Status](https://travis-ci.com/silvermine/release-it-config.svg?branch=master)](https://travis-ci.com/silvermine/release-it-config)
[![Coverage Status](https://coveralls.io/repos/github/silvermine/release-it-config/badge.svg?branch=master)](https://coveralls.io/github/silvermine/release-it-config?branch=master)
[![Dependency Status](https://david-dm.org/silvermine/release-it-config.svg)](https://david-dm.org/silvermine/release-it-config)
[![Dev Dependency Status](https://david-dm.org/silvermine/release-it-config/dev-status.svg)](https://david-dm.org/silvermine/release-it-config#info=devDependencies&view=table)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## What?

This project bundles [Release It!](https://github.com/release-it/release-it), [@release-it/conventional-changelog](https://github.com/release-it/conventional-changelog), and a custom plugin that pauses the process after the changelog file is modified. It exposes a pre-configured JavaScript object that can be overriden as needed depending on the needs of the project.

Out of the box, release-it-config does the following:

1. Displays a list of commits since the last major release.
2. Pauses to allow manual editing of the changelog.
3. Commit the release.
4. Tag the release.
5. Push tags and commits to origin.
6. Release package to your package registry of choice (example: npm or artifactory).

## Why?

Configuring release-it can be quite cumbersome, so providing a reusable configuration with minimal installation steps makes alot of sense.

## How?

### Install

Install the package:

`npm install -D https://github.com/pbredenberg/release-it-config.git` (npm registration pending)

### Configure

Add a file called `release-it.js` to your project root, with the following contents:

```javascript
'use strict';

const config = require('@silvermine/release-it-config').default;

module.exports = {
   plugins: config.plugins,
   git: config.git,
   gitHub: config.gitHub,
   npm: config.npm,
};
```

You can [configure the above](https://www.npmjs.com/package/release-it#configuration) as neccessary to suit your project.

### Use

If you have Release It! installed globally you can use the following commands:

Release it!

`release-it --config='release-it.js'`

Release a prerelease:

`release-it --config='release-it.js' --preRelease='rc'`

or an alpha:

`release-it --config='release-it.js' --preRelease='alpha'`

To avoid having to install the global package, you can also add the following npm scripts to your `package.json`'s npm `scripts: {}` object:

```json
    "release-it-rc": "npm run release-it -- --preRelease='rc'",
    "release-it": "release-it --config='release-it.js'"
```

## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.

