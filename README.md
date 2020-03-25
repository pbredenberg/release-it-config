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

### Use

If you have this project installed globally you can use the following commands:

#### Run a release:

`silvermine-release`

#### Run a prerelease:

`silvermine-release --pre-release=rc`

or an alpha:

`silvermine-release --pre-release=alpha`

#### NPM Scripts

To avoid having to install the global package, you can also add npm scripts to your `package.json`'s npm `scripts: {}` object.

For example:

```json
    "release-it-rc": "silvermine-release --pre-release=rc",
    "release-it": "silvermine-release"
```

### Use Config Only

If you want to skip using the tool, and instead use `release-it` as intended, you can do that too.

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

You can now run `release-it` commands, passing our config:

`release-it --config='release-it.js'`

## Release Process

1. With a clean working directory, checkout a branch for your release, something like `user/prepare-v.YOUR.VERSION.NUMBER`.

2. Run `silvermine-release --release` (or `--pre-release={rc | alpha | beta}`).
    - During this step, silvermine-release will generate a changelog, and pause for editing.
    - Press `Y` when you've finished editing the changelog to your liking.
    - Press `Y` when prompted to commit the version bump.
    - Push the branch and create a PR or MR for the release.

3. Once merged, run `silvermine-release --tag`.
    - Press `Y` to tag the release.
    - Press `Y` to push the tags.

4. Release
    - At this point you can run the registry release manually if applicable.

## Fixing Problems

- **Changelog editing**: If something goes wrong during the changelog step, you'll have to
  reset your working directory so you can start over: `git reset HEAD --hard`.
- **Commit/Bump**: If you need to bail out of the process during this step, you can simply
  issue `CTRL + C` and release-it will gracefully roll back any changes for you.
- **Tagging**: If something goes wrong during this step (such as if you had changes locally
  but not on the remote), you will either have to:
    - Delete the local/remote tag: `git tag -d TAGNAME`, `git push -d origin TAGNAME`
    - Or, if you have the tag locally, but not remotely, push the tag manually:
      `git push origin TAGNAME`.



## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.
