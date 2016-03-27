var colors = require('colors');

var helpText = {
  // Each command is an array of strings
  // To print the command, the array is joined into one string, and a line break is added
  // between each item. Basically, each comma you see becomes a line break.
  'default': [
    'Commands:',
    '  new'.cyan + '       Create a new Bootstrap project',
    '  update'.cyan + '    Update an existing Bootstrap project',
    '  watch'.cyan + '     Watch a project\'s files for changes',
    '  build'.cyan + '     Build a project\'s files for production',
    '  help'.cyan + '      Show this screen',
    '  -v'.cyan + '        Display the CLI\'s version',
    '',
    'To learn more about a specific command, type ' + 'bootstrap help <command>'.cyan
    //'',
    //'Need more help? Ask a question on the StackOverflow: ' + ''.cyan
  ],
  'new': [
    'Usage:',
    '  bootstrap new ',
    '  bootstrap new ' + '--template basic',
    '  bootstrap new ' + '--directory appname',
    '  bootstrap new ' + '--repo https://github.com/username/template-name.git',
    '',
    'Creates a new Bootstrap project.',
    'Run the command without any flags to get an interactive setup prompt.',
    'You can also manually supply the folder name using the ' + '--directory'.cyan + ' flags.'
    //'  If creating a ' + 'sites'.cyan + ' project, add the ' + '--template'.cyan + ' flag as well. The value can be ' + 'basic'.cyan + ' or ' + 'zurb'.cyan + '.'
  ],
  'update': [
    'Usage:',
    '  bootstrap update',
    '',
    'Updates an existing Bootstrap project by running "bower update".'
  ],
  'watch': [
    'Usage:',
    '  bootstrap watch',
    '',
    'Assembles your app\'s files and watches for any new changes to the files.',
    'Keep this command running while you work on your project.'
  ],
  'build': [
    'Usage:',
    '  bootstrap build',
    '',
    'Assembles your app\'s files into a production-ready build.'
  ],
  'help': [
    'Okay, don\'t get clever. But seriously:',
    '',
    'Usage:',
    '  bootstrap help',
    '  bootstrap help <command>',
    '',
    'Type ' + 'bootstrap help'.cyan + ' to see a list of every command,',
    'or ' + 'bootstrap help <command>'.cyan + ' to learn how a specific command works.'
  ]
}

module.exports = function(args, options) {
  var say;
  if (typeof args === 'undefined' || args.length === 0) {
    say = 'default'
  }
  else {
    say = args[0]
  }
  // A line break is added before and after the help text for good measure
  say = '\n' + helpText[say].join('\n') + '\n\n'

  process.stdout.write(say);
}
