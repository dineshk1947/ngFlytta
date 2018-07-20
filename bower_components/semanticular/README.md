# Semanticular

Angular.js directives for semantic ui modules. Check `demos/` folder for usages.

## Supported directives

 * checkbox
 * dropdown
 * modal
 * popup
 * progress
 * radio
 * tabs

## Installation

* Include angular, semantic ui (and its dependency jQuery).

* Install semanticular
```
bower install semanticular
```
or download this repo.

* Include semanticular to your page.

* Don't forget to add semanticular to your angular project dependencies.
```javascript
angular.module('myApp', ['semanticular'])
```

## Building

* Clone this repo.

* Install dependencies.
```
npm install && bower install
```

* Build
```
gulp
```

* Check `dist/` folder.

## TODO

* Add documentation.
* Add custom dropdown item template support.
* Add search directive.
* Add accordion directive.
