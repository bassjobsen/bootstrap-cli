var async    = require('async');
var colors   = require('colors');
var exec     = require('child_process').exec;
var fs       = require('fs');
var inquirer = require('inquirer');
var isRoot   = require('is-root');
var npm      = require('npm');
var path     = require('path');
var rimraf   = require('rimraf');
var which    = require('which');
var util     = require('../util');
var EventEmitter = require("events").EventEmitter;
var format   = require('util').format;
var templates = require('../util/templates');

module.exports = function(args, options, callback, ee) {
  var projectName, projectFolder, framework, template, repo, messages, directory;
  var tasks = [
    preflight, prompt, gitClone, folderSetup, npmInstall
  ];

  // Each function below is executed in order
  async.series(tasks, finish);

  // 1. Check that the process isn't root, and that Git is installed
  function preflight(cb) {
    if (isRoot()) {
      console.log(util.messages.noRoot);
      process.exit(1);
    }

    which('git', function(er) {
      if (er) {
        console.log(util.messages.gitNotInstalled);
        process.exit(69);
      }
      cb();
    });
  }

  // 2. Find out what the user wants to do
  function prompt(cb) {
    inquirer.prompt(util.questions(options), function(answers) {
      // The variables we need either came from the prompts, or the console arguments
      projectName = answers.directory || options.directory;
      template = answers.template || options.template || null;
      repo = options.repo || null;
      projectFolder = path.join(process.cwd(), projectName);
      messages = util.messages(projectName);

      cb();
    });
  }

  // 3. Clone the framework's template project
  function gitClone(cb) {
    
    if(repo === null) {
        repo = templates.find(x=> x.value === template).url;
    }
    var cmd = format('git clone %s %s', repo, projectName);
    
    //var hello = formatHello(messages.helloYeti, framework);

    //console.log(hello);
    process.stdout.write(messages.downloadingTemplate);

    // [TODO] Change to spawn and check for errors on stderr
    exec(cmd, function(err) {
      if (err instanceof Error) {
        console.log(messages.gitCloneError);
        process.exit(1);
      }

      process.chdir(projectFolder);

      cb();
    });

    if (typeof(ee) !== 'undefined') {
      ee.emit("cloneSuccess", projectName);
    }
  }

  // 4. Remove the Git folder and change the version number if applicable
  function folderSetup(cb) {
    rimraf('.git', function() {});
    console.log(messages.installingDependencies);
    cb();

    // if (options.edge) {
    //   util.changeVersion(directory, 'foundation-'+framework, 'master', cb);
    // }
    // else if (options.version) {
    //   util.changeVersion(directory, 'foundation-'+framework, options.version, cb);
    // }
    // else {
    //   cb();
    // }
  }

  // 5. Install Node dependencies
  function npmInstall(cb) {
    npm.load({ prefix: projectFolder, loglevel: 'error', loaded: false }, function(err) {
      npm.commands.install([], function(err, data) {
        if (options.debug && err) console.log(err);
        var success = err === null;
        if(success && typeof(ee) !== 'undefined') ee.emit("npmInstallSuccess", projectName);
        else if(typeof(ee) !== 'undefined') ee.emit("npmInstallFailure", projectName);
        cb(null, success);
      });
    });
  }

 
  // 6. Finish the process with a status report
  function finish(err, results) {
    // Indexes 4 and 5 of results are the npm statuses
    // All the rest should be undefined
    var allGood = results.indexOf(false) === -1;

    if (allGood)
      console.log(messages.installSuccess);
    else
      console.log(messages.installFail);

    console.log(messages.gitCloneSuccess);

    if (results[4])
      console.log(messages.npmSuccess);
    else
      console.log(messages.npmFail);

    if (allGood)
      console.log(messages.installSuccessFinal);
    else
      console.log(messages.installFailFinal);

    if (typeof(callback)!=='undefined') callback();
  }
}

function formatHello(str, framework) {
  framework = framework.charAt(0).toUpperCase() + framework.slice(1)
  str = str.join('\n');
  str = str.replace('%s', framework);
  return str.split('\n');
}
