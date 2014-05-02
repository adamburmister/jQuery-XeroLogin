# jQuery Xero Login

This is some sample JS to help you along the path of creating a script to show the Authorization screen for Xero's API in a popup window.

It's similar to the one in use in "MinuteDock":http://minutedock.com.

## Usage

### Creating a new OAuth request to Xero

You can invoke a XeroLogin by simply instantiating the class:

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

### Your servers post-OAuth callback page

Your Authorize Callback should then run the following Javascript:

```js
<script>
window.opener.$.XeroLogin.success(anyData);
window.close();
</script>
```

This will close the popup window and tell XeroLogin it's no longer needed.

You can pass any data you wish to back via the `success` method.
