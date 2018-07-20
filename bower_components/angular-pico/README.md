angular-pico
========================


AngularJS directive replace the image in `<img>` for Retina displays and format WebP.


## Installation

Download [angular-pico.min.js](https://raw.githubusercontent.com/avlasof/angular-pico/master/dist/angular-pico.min.js) or install with bower.

```bash
$ bower install angular-pico --save
```

##Registration

Load `angular-pico.min.js` then add the `ngPico` module to your Angular App.

```javascript
angular.module('app', ['ngPico']);
```

##Directive
The directive can work on attribute levels. The following example contains all of the supported attributes:

```html
<img
    data-pico="path/to/picture.png"
    data-webp="true"
    data-retina="true"
    data-prefix="custom-prefix-2x">
```

Short doc for all of the attributes:

* `data-pico`: `required` specifies the URL of an image
* `data-retina`: `optional` default `true`
* `data-webp`: `optional` default `false`
* `data-prefix`: `optional` default `@2x`

If add an attribute `src`, upload images, if disabled JavaScript. But it will be loaded for retina displays and web browsers support.

When you add a new image, you should make a version of the image for Retina and WebP, and put in the same directory.


##Example

The `example` folder shows a simple working demo.