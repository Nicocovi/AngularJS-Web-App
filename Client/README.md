# Client

## Getting Started

To get you started you can simply clone the repo

```
git clone ...
```

### Install Dependencies

We get the tools we depend upon via `npm`, the [node package manager](https://www.npmjs.com).

```
npm install
```

### Create a Bundle for the Application

This project use [webpack](https://github.com/webpack/webpack) version 1 for creating a bundle of the application and its dependencies

We have pre-configured `npm` to automatically run `webpack` so we can simply do:

```
npm run build
```

Behind the scenes this will call `webpack --config webpack.config.js `.  After, you should find that you have one new folder in your project.

* `dist` - contains all the files of your application and their dependencies.

### Automate Application Bundle Creation during Development

In this project, [gulp.js](http://gulpjs.com/) is already configured to automate `npm run build` on every change in the source folder. 
By this, you start gulp and your server only once at the start of your development session and don't have to worry any more about the served content not being up to date.

Only the first time, you have to install gulp globally on your machine to publish the `gulp` command to your terminal:
```
npm install gulp -g
```
Afterwards, it is enough to run the gulp task:
```
gulp
```

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/index.html`.

## Connect to Backend

Change the ip in the App.js file 

```
//static IP of Raspberry Pi.
app.constant('API_URL', 'http://192.168.178.97:3000/api');
```