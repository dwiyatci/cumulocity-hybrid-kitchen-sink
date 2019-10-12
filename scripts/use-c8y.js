/**
 * Created by glenn on 20.08.19.
 */

const semver = require('semver');
const shell = require('shelljs');

const [, , arg] = process.argv;

main();

function main() {
  try {
    const version = semver.coerce(arg);

    if (!semver.valid(version)) {
      throw Error(`${arg} is not a valid semver version string.`);
    }

    upgradeC8YPackages(version);
  } catch (error) {
    console.error(error);
  }
}

function upgradeC8YPackages(version) {
  const command = `
      yarn upgrade ${[
        '@c8y/apps',
        '@c8y/client',
        '@c8y/ng1-modules',
        '@c8y/ngx-components',
        '@c8y/style',
        '@c8y/cli'
      ]
        .map(pkg => `${pkg}@${version}`)
        .join(' ')}
    `;

  console.log(command);

  shell.exec(command);
}
