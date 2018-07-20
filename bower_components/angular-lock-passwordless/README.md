# Auth0 Passwordless Lock 10 for Angular 1.x

This module provides a thin wrapper for version 10 of Auth0's [Passwordless Lock widget](https://auth0.com/docs/connections/passwordless).

## Installation

**Bower**

```bash
bower install angular-lock-passwordless
```

Ensure that both Auth0LockPasswordless and angular-lock-passwordless are loaded on the page.

```html
...

<script src="bower_components/auth0-lock-passwordless/build/lock-passwordless.min.js"></script>
<script src="bower_components/angular-lock-passwordless/dist/angular-lock-passwordless.js"></script>

...
```

## Usage

Bring in the `auth0.lockPasswordless` module.

```js
var app = angular.module('myApp', ['auth0.lockPasswordless']);
```

Configure Auth0LockPasswordless by using `lockPasswordlessProvider`. If you haven't done so yet, [sign up for Auth0](https://auth0.com/signup), create a client app, and get your clientID and domain. To learn more about Auth0LockPasswordless' API and the options it takes, see the [API documentation](https://auth0.com/docs/connections/passwordless) and the list of [customization options](https://github.com/auth0/lock-passwordless#ui-options).

```js
app.config(function(lockPasswordlessProvider) {
  lockPasswordlessProvider.init({
    clientID: AUTH0_CLIENT_ID,
    domain: AUTH0_DOMAIN
  });
});
```

Use `lockPasswordless` in the `run` block, in a service, or in a controller. For example, show the Auth0LockPasswordless widget from a controller and associated view.

```js
app.controller('loginController', function(lockPasswordless) {
  var vm = this;
  vm.lockPasswordless = lockPasswordless;
});
```

```html
...

<div ng-controller="loginController as login">

...

  <button ng-click="login.lock.emailcode()">Log In</button>

...

</div>
```

Then, set up a listener for the `authenticated` event.

```js
app.run(function(lock) {

  lock.on('authenticated', function(authResult) {
    localStorage.setItem('id_token', authResult.idToken);

    lock.getProfile(result.idToken, function(error, profile) {
      if (error) {
        console.log(error);
      }
      localStorage.setItem('profile', JSON.stringify(profile));
    });
  });
});
```

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [JSON Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
