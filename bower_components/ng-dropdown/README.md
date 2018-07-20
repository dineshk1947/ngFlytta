# Semantic-UI.ngDropdown
Semantic UI - Dropdown AngularJS
<br>Semantic is a UI component framework based around useful principles from natural language. http://www.semantic-ui.com

<p>
  <a href="https://gitter.im/miamarti/Semantic-UI.ngDropdown" target="_blank"><img src="https://img.shields.io/gitter/room/nwjs/nw.js.svg"></a>
  <img src="https://img.shields.io/badge/semanticUI.ngDropdown-release-green.svg">
  <img src="https://img.shields.io/badge/version-1.0.4-blue.svg">
  <img src="https://img.shields.io/github/license/mashape/apistatus.svg">
  <a href="https://github.com/miamarti/Semantic-UI.ngDropdown/tarball/master"><img src="https://img.shields.io/github/downloads/atom/atom/latest/total.svg"></a>
  <img src="https://img.shields.io/bower/v/bootstrap.svg">
</p>

## Dropdown
A dropdown allows a user to select a value from a series of options.

## Dependencies
* AngularJS

## Implementation
```
<ng-dropdown 
  ng-model="modelA" 
  ng-option="optionList">
</ng-dropdown>
```

## Option List
```
// Expected server response
[
  {"id": 1, "value": "Option 1"},
  {"id": 2, "value": "Option 2"}
]
```
OR

    In this case simply assign the parameter data-label as a "label"
```
// Expected server response
[
  {"id": 1, "label": "Option 1"},
  {"id": 2, "label": "Option 2"}
]
```
OR
```
// Expected server response
{
  "1": {"id": 1, "value": "Option 1"},
  "2": {"id": 2, "value": "Option 2"}
}
```

## Parameters

| Name         | Type    | Dinamic | Mandatory | Description                                                  |
| ------------ | ------- | ------- | --------- | ------------------------------------------------------------ |
| ng-model     | String  | true    | true      | Scope of the attribute that will be the model                |
| ng-option    | Array   | true    | true      | Combo Object List                                            |
| ng-multiple  | Boolean | false   | false     | Allows selection of more than one value in the combo         |
| ng-additions | Boolean | false   | false     | It allows adding options that are not on the list            |
| ng-disabled  | Boolean | true    | false     | Makes the inactive component                                 |
| data-url     | String  | false   | false     | URL that will be requested for consultations on the back-end |
| data-label   | String  | false   | false     | JSON attribute name to be used as label                      |

## Custom Label
```
<ng-dropdown 
  ng-model="modelA" 
  ng-option="optionList" 
  data-label="name">
</ng-dropdown>
```

## Additional values (Suggestion)
<img src="https://c3.staticflickr.com/8/7329/27330447674_1b8bf92276_m.jpg" alt="Semantic-UI.ngDropdown-02">

```
<ng-dropdown 
  ng-model="modelA" 
  ng-option="optionList"
  ng-additions="true">
</ng-dropdown>
```

## Remote API
<img src="https://c1.staticflickr.com/8/7418/27330447744_db89157f9c.jpg" width="353" alt="Semantic-UI.ngDropdown-01">

```
<ng-dropdown 
  ng-model="modelA" 
  ng-option="optionList" 
  data-url="/api/search?={query}">
</ng-dropdown>
```

```
// Expected server response
{
    "success": true,
    "results": [
      {
        // name displayed in dropdown
        "name"  : "Choice 1",
         // selected value
        "value" : "value1",
         // name displayed after selection (optional)
        "text"  : "Choice 1"
         // whether field should be displayed as disabled (optional)
        "disabled"  : false
       },
      {
        "name"  : "Choice 2",
        "value" : "value2",
        "text"  : "Choice 2"
      },
      {
        "name"  : "Choice 3",
        "value" : "value3",
        "text"  : "Choice 3"
      },
      {
        "name"  : "Choice 4",
        "value" : "value4",
        "text"  : "Choice 4"
      },
      {
        "name"  : "Choice 5",
        "value" : "value5",
        "text"  : "Choice 5"
      }
    ]
}
```

## Multiple Selection
<img src="https://c5.staticflickr.com/8/7345/27330447684_46276b5e87.jpg" width="500" height="40" alt="Semantic-UI.ngDropdown-03">

```
<ng-dropdown 
  ng-model="modelA" 
  ng-option="optionList"
  ng-multiple="true">
</ng-dropdown>
```

## Bower install de dependency
```
$ bower install semanticUI.ngDropdown --save
```

## Module AngularJS include
```
angular.module('example', ["ngDropdown"]);
```
