/* jshint node:true */
var generateChangelog = require('ember-cli-changelog/lib/tasks/release-with-changelog');
var execSync = require('child_process').execSync;

// For details on each option run `ember help release`
module.exports = {
  // local: true,
  // remote: 'some_remote',
  // annotation: "Release %@",
  message: "Release %@",
  // manifest: [ 'package.json', 'bower.json', 'someconfig.json' ],
  publish: true,
  // strategy: 'date',
  // format: 'YYYY-MM-DD',
  // timezone: 'America/Los_Angeles',
  beforeCommit: generateChangelog,
  afterPublish: function(project, versions) {
    // Publish dummy app with docs to gh-pages
    runCommand('ember github-pages:commit --message "Released ' + versions.next + '"');
    runCommand('git push origin gh-pages:gh-pages');
  },
};

function runCommand(command) {
  console.log('Running: ' + command);
  var output = execSync(command, { encoding: 'utf8' });
  console.log(output);
}
