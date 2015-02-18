Date elements
=============

*S* stands for ```{html}<select/>```.

*WIP*

Install
-------

Install it via `bower`.

```
bower install ng-date-elements
```

Or, you can clone this repo and install it locally (you will need `npm`, of course).

```
$ git clone git@github.com:leodido/ng-date-elements.git
$ cd ng-date-elements/
$ npm install
```

Build
-----

Build is handled through [Gulp](https://github.com/gulpjs/gulp/) and performed mainly via [Google Closure Compiler](https://github.com/google/closure-compiler).

Need help? Run `gulp help` !

```
# Usage
#   gulp [task]
# 
# Available tasks
#   build                           Build the library 
#    --banner                       Prepend banner to the built file
#    --env=production|development   Kind of build to perform, defaults to production
#   clean                           Clean build directory
#   help                            Display this help text
#   lint                            Lint JS source files
#   version                         Print the library version
```

To build a development version of JS lib:

```
$ gulp build --env dev
```

Or, also:

```
$ npm run development
```

---

[![Analytics](https://ga-beacon.appspot.com/UA-49657176-1/ng-date-elements)](https://github.com/igrigorik/ga-beacon)
