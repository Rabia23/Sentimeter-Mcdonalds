# livefeed-web

Introduction

This app is a single page application built on AngularJs. The repository is based on ng-boilerplate and john papa app structure.

Dependencies

The app maintains bower.json and package.json files, which lists all the dependencies.


Quick Start

To compile scss you need to install ruby latest version and then install gem compass. Assuming git, npm and nodejs are already installed on your computer. To get started do following steps.

1. Clone: https://github.com/arbisoft/livefeed-web.git
2. cd livefeed-web
3. sudo npm -g install grunt-cli
4. sudo npm -g install bower
5. npm install
6. bower install
7. grunt watch
8. Open new terminal tab and run grunt server

App Structure

Each functionality is a module which may or may not be sub divided in modules. Following are the conventitons we follow while writing modules

1. Each module is placed in its own folder and each file starts with same name as module
2. Long names are separated with hyphens.
3. Module is palced in the file starting with underscore.
4. All the dependencies of modules e.g controllers, services, routes, configurations and directives must be included in the module folder unless it is using common code.


Html Coding Conventions

1. We use 2 space indentation for coding html.
2. Dont use tabs
3. No trailing spaces

Javascript Coding Conventions

1. We are following John Papa angular style guide to make the code more readable.


Grunt Commands

1. grunt build. To build the src folder and put the files in build directory. Although this folder can be hosted on server the files are not compressed

2. grunt compile. To compile the project in min files and paste it in bin directory, Use this folder to host on server

3. grunt watch. To watch all the changes taking place in the html, scss and js files and auto build it.
