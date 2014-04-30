# jQuery Xero Login

This is some sample JS to help you along the path of creating a script to show the Authorization screen for Xero's API in a popup window.

It's similar to the one in use in "MinuteDock":http://minutedock.com.

## Usage

First, set `url`. This `url` should point to a URL on your system where you generate a request token, and then redirect the user to the Request Token's authorize url.

In a Rails app an example action looks like this:

```ruby
def new
  # Using http://github.com/tlconnor/xero_gateway
  xero_gateway = Xero::Gateway.new(OAUTH_CONSUMER_TOKEN, OAUTH_CONSUMER_SECRET)
  
  # saving these so we can use them to authorize when the user returns
  session[:request_token]  = xero_gateway.request_token.token
  session[:request_secret] = xero_gateway.request_token.secret

  # now that Xero supports it, you can also specify a :callback_url here.
  redirect_to xero_gateway.request_token.authorize_url
end
```

Your Authorize Callback should then run the following Javascript:

```js
window.opener.XeroLogin.success(anyData);
window.close();
```

(This will close the popup window and tell XeroLogin it's no longer needed)

You can invoke a XeroLogin by simply instantiating the class:

```js
new XeroLogin({
    url: '/oauth/xero' // The local URL used to generate the new token request
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