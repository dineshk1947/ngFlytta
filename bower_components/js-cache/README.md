# jsCache
jsCache is a fast and small JavaScript library used for caching at client side. It helps you to decrease your server load and increase your application performance by caching api
for the time period you want. Not only api you can cache every type of data with desired time you want.
It leverage you to organize your caching in different objects with different type of storage and different time for expiry of your caching. Currently it is beta version.
Its Awesome, i promise you will love it just check it out.

## AngularJs $cacheFactory alternative

jsCache is an good alternative for AngularJS $cacheFactory with more powerfull functionality.
To know more see [Usage in AngularJS](#usage-in-angularjs)

## Overview

* [Installation](#installation)
* [Configuration](#configuration)
* [Getting Started](#getting-started)
* [Usage in AngularJS](#usage-in-angularjs)
* [API](#api-reference)
* [Docs](#docs)
* [Testing](#testing)

## Installation
    
* #### Installing via npm

    ```sh
    $ npm install js-cache-factory --save
    ```
    
* #### Installing via bower

    ```sh
    $ bower install js-cache --save
    ```

* #### Download via cdn

    ```sh
    Comming soon ...
    ```

## Configuration
   * #### Configure for cache obj
    
    ```javascript
    var cacheObjOptions = {
            disableCache : false,       
            maxAge : 24*60*60*1000,     // 24 Hours
            removeOnExpire : true,
            deleteOnExpire : false,
            storageMode : "memory",     
            onExpireCallback : null,    // will be available in upcoming version
            recycleFrequency : null,    // will be available in upcoming version
            capacity : null             // will be available in upcoming version
        };
    ```


   * #### Configure for key,value you store
        
    ```javascript
        var cacheKeyOptions = {
                disableCache : false,
                maxAge : null,
                removeOnExpire : true,
                onExpireCallback : null,  // will be available in upcoming version
                recycleFrequency : null   // will be available in upcoming version
            };
    ```
        
## Getting Started

   * #### Include file in project
   
    ```html
            <script src="js-cache.min.js"></script>
    ```
   * #### Create obj
   
    ```javascript
            var cacheObj = jsCache.create("cacheObjName", cacheObjOptions);
    ```
   * #### Cache anything you want in created obj
   
    ```javascript
            cacheObj.put("key", "value", cacheKeyOptions);
    ```
        
   * #### Get saved value anywhere in your project
   
    ```javascript
            cacheObj.get("key");
    ```    

    That's all you need to do.
     You can create multiple objects with different configuration & can store multiple key,values into it.  

## Usage in AngularJS
    jsCache is very good alternative for $cacheFactory in AngularJS.
    
   * #### cache in $http request
   
    Instead of calling create method

    ```javascript
       var cacheObj = jsCache.create("cacheObjName", cacheObjOptions);
    ```
    
    You have to call
    
    ```javascript
        var httpCacheObj = jsCache.createHttpCache("cacheObjName", cacheObjOptions);
    ```

    and pass it to 
    ```javascript
        $http({
            method: 'GET',
            url: "url you provide",
            params: obj,
            cache : httpCacheObj(cacheKeyOptions)
        })
    ```
    
    That's all else angular will take care of saving & retriving data for http calls.
    Except $http api cache procedure is same as mentioned in Getting Started guide.
    
## Api Reference

    Comming soon ...

## Docs

    Comming soon ...


## Testing
Run 
```sh
    $ npm test
```

Unit test cases are written to test it properly. You can find test cases inside test.js file.
Although if you find any issue or you need some extra functionality, anything which you find unconmfortable please let us know or raise issue. We would love to hear from you.

##License
----
MIT
