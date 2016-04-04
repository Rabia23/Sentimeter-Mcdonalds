# livefeed-web

## Introduction

This app is a single page application built on AngularJs. The repository is based on ng-boilerplate and john papa app structure.

## Dependencies

The app maintains bower.json and package.json files, which lists all the dependencies.


## Quick Start

To compile scss you need to install ruby latest version and then install gem compass. Assuming git, npm and nodejs are already installed on your computer. To get started do following steps.

1. Clone: https://github.com/arbisoft/livefeed-web.git
2. cd livefeed-web
3. sudo npm -g install grunt-cli
4. sudo npm -g install bower
5. sudo npm -g install karma-cli
6. npm install
7. bower install
8. grunt watch
9. Open new terminal tab and run grunt server

## App Structure

Each functionality is a module which may or may not be sub divided in modules. Following are the conventitons we follow while writing modules

1. Each module is placed in its own folder and each file starts with same name as module
2. Long names are separated with hyphens.
3. Module is palced in the file starting with underscore.
4. All parts of modules e.g controllers, services, routes, configurations and directives must be included in the module folder unless it is using common code.


## Coding Conventions

### Html

1. We use *2 space indentation* for coding html.
2. Dont use tabs
3. No trailing spaces

### Javascript

1. We are following John Papa angular style guide to make the code more readable.
2. Dont use tabs
3. We use *2 space indentation* for coding html
4. Semicolon after each line of code

## Unit Testing

We believe that unit testing is an integral part of the Javascript code and we motivate developers to write unit tests of their awesome Javascript code. We are using

1. Jasmine as the unit testing framework
2. Karma to run the tests
3. Instanbul to generate reports for code test coverage


## Git

We are using *git-flow* to manage our repository. Following may be useful

1. frontend-master 

We have frontend-master branch for production

2. frontend-develop

We have frontend-developbranch for staging

3. Feature 

When we do addition or bug fixing in frontend-develop, we create a new branch and we call it feature. Developer should create a pull request to merge new feature into frontend-develop

4. Hot-fix

To create an urgent fix on master, we create a new branch from master and create a pull request, we call it hot-fix


## Grunt Commands

1. grunt build. To build the src folder and put the files in build directory. Although this folder can be hosted on server the files are not compressed

2. grunt compile. To compile the project in min files and paste it in bin directory, Use this folder to host on server

3. grunt watch. To watch all the changes taking place in the html, scss and js files and auto build it.

## Note

We have modified some of the plugins files. For this reason, we have attached some files in lib folder of the app. Once you complete bower install, please dont forget to put these files in their respective folders in vendors folder. 
