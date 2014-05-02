# jQuery Xero Login

This is some sample JS to help you along the path of creating a script to show the Authorization screen for Xero's API in a popup window.

It's similar to the one in use in "MinuteDock":http://minutedock.com.

## Usage

### Creating a new OAuth request to Xero

You can invoke a XeroLogin by simply setting up the singleton class, then attaching `done` and `fail` promise callbacks, listening to response parameters for more information.

The `new $.XeroLogin(config)` call will pop open a new browser window at the passed `url` (the URL of your server's new-oauth request step [e.g. '/auth/xero']).
You will be redirected to the Xero OAuth page. Once completed, the Xero server will request your callback page URL.

```js
new $.XeroLogin({
    url: '/auth/xero' // The local URL used to generate the new token request
  })
  .done(function(anyData) {
      // Handle successful connection
      alert("Logged in successfully!");
  })
  .fail(function(reason) {
      // Handle failed connection
      switch(reason) {
        case $.XeroLogin.CANCELLED:
        case $.XeroLogin.CLOSED:
          alert("Login cancelled by user");
          break;
        case $.XeroLogin.FAILED:
          alert("Login failed!");
          break;
      }
  });
```

### Your post-OAuth callback page

Your Authorize Callback should then run the following Javascript:

```js
window.opener.$.XeroLogin.success(anyData);
window.close();
```

This will close the popup window and tell XeroLogin it's no longer needed.

You can pass any data you wish to back via the `success` method.
