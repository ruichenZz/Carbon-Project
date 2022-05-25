var shell = require('shelljs');
const Router = require("express-promise-router");
const router = new Router();

router.get('/deploy/:packageName', async (req, res) => {
	console.log("MESSAGE: Package Name to deploy:", req.params.packageName);
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        res.json(false);
        // shell.exit(1);
    }
    if (shell.exec(`git clone https://github.com/dailybruin/${req.params.packageName}.git`).code !== 0) {
        shell.echo('Error: Git clone failed');
        res.json(false);
        // shell.exit(1);
    } else {
        shell.echo(shell.ls());
        res.json(true);
    }
});
module.exports = router

// if (!shell.which('git')) {
//   shell.echo('Sorry, this script requires git');
//   shell.exit(1);
// }
 
// // Copy files to release dir
// shell.rm('-rf', 'out/Release');
// shell.cp('-R', 'stuff/', 'out/Release');
 
// // Replace macros in each .js file
// shell.cd('lib');
// shell.ls('*.js').forEach(function (file) {
//   shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file);
//   shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file);
//   shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file);
// });
// shell.cd('..');
 
// // Run external tool synchronously
// if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
//   shell.echo('Error: Git commit failed');
//   shell.exit(1);
// }