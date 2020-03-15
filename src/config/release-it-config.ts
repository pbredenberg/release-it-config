interface IRepositoryReleaseSettings {
   release?: boolean;
   releaseName?: string;
   releaseNotes?: string;
}

const RELEASE_VERSION_NAME = 'release v${version}',
      CHANGELOG_PATTERN = 'git log --pretty=format:"* %s (%h)" $(git describe --match "v[0-9]*" --abbrev=0)...HEAD',
      CHANGELOG_INFILE = 'CHANGELOG.md',
      REPOSITORY_RELEASE_SETTINGS: IRepositoryReleaseSettings = {};

REPOSITORY_RELEASE_SETTINGS.release = true;
REPOSITORY_RELEASE_SETTINGS.releaseName = 'Release ${tagName}';
REPOSITORY_RELEASE_SETTINGS.releaseNotes = CHANGELOG_PATTERN;

export default {
   plugins: {
      '@release-it/conventional-changelog': {
         preset: 'conventionalcommits',
         infile: CHANGELOG_INFILE,
      },
      'release-it-config/plugins/pause-for-changelog.js': {
         infile: CHANGELOG_INFILE,
      },
   },
   git: {
      tag: true,
      tagName: 'v${version}',
      tagAnnotation: RELEASE_VERSION_NAME,
      commitMessage: 'chore: ' + RELEASE_VERSION_NAME,
      changelog: CHANGELOG_PATTERN as string | boolean,
   },
   gitHub: REPOSITORY_RELEASE_SETTINGS,
   gitLab: REPOSITORY_RELEASE_SETTINGS,
};
