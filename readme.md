# Bootstrap CLI

This is the command-line interface for [Bootstrap 4](http://v4-alpha.getbootstrap.com/).

## Requirements

You'll need the following software installed to get started.

  * [Node.js](http://nodejs.org) 0.12+: Use the installer provided on the NodeJS website.
    * With Node installed, run `[sudo] npm install -g grunt bower`.
  * [Git](http://git-scm.com/downloads): Use the installer for your OS.
    * Windows users can also try [Git for Windows](http://git-for-windows.github.io/).

Some projects require Gulp instead of Grunt, `[sudo] npm install -g gulp` to install Gulp.

## Installing

The Bootstrap CLI is installed through npm.

```bash
npm install -g bootstrap-cli
```

This will add the `bootstrap` command to your system.

### Updating

The CLI periodically gets updates that add features or fix bugs. Use npm to upgrade the CLI to the newest version.

```bash
npm update -g bootstrap-cli
```

To check what version you currently have, use `-v`.

```bash
bootstrap -v
```

## Commands

### New

Starts the setup process for a new Bootstrap project. The CLI will ask you which template you want to use and a folder name for the project.

```bash
bootstrap new
```
## Create and use your own templates:

```bash
bootstrap new --repo https://github.com/username/template-name.git
```
Or create a PR to add your templates to the `bootstrap-cli/lib/util/templates.js` file.

### Watch

While inside of your app's folder, use the `watch` command to assemble your app and run a test server.

```bash
cd appName
bootstrap watch
```

While this process is running, you can view the assembled app in your browser, at this URL:

```
http://localhost:8080
```

While the server is running, any changes you make to your HTML, Sass, or JavaScript will automatically be processed and added to your live app.

### Build

To build your app for production, use `bootstrap build`.

```bash
bootstrap build
```

### Update

Updates your Bower packages, which includes Bootstrap. Run this command when you want to update an existing project to the newest version of Bootstrap.

```bash
Bootstrap update
```

### Help

Lists all available commands in the CLI.

```bash
bootstrap help
```

Add a command name at the end to learn how a specific command works.

```bash
bootstrap help new
```
## Credits
Inspired on [Foundation CLI](https://github.com/zurb/foundation-cli) 
