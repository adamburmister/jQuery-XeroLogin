/** 
jQuery Xero Login Popup 

Shows Xero OAuth Authentication in a Javascript popup. Requires jQuery.

Homepage: http://github.com/adamburmister/jQuery-XeroLogin

For examples, check out the included example.html 
*/

;(function ( $, window, document, undefined ) {

  // Success
  var SUCCESS = 'success';
  // Failures
  var CANCELLED = 'cancelled';
  var FAILED = 'failed';
  // Default options
  var DEFAULTS = {
    url: null,
    autoShow: true, // automatically show the popup
    popup: {
      name: 'ConnectWithOAuth', // should not include space for IE
      height: 400,
      width: 800
    }
  };

  // Privates
  var _deferred = new $.Deferred();
  var _loginWindow = null;

  // Constructor
  // @return {jQuery.Deferred}
  function XeroLogin(options) {
    // Deep merge option
    opts = $.extend(true, {}, DEFAULTS, options);

    if(!opts.url) {
      throw new Error('No oAuth URL provided to XeroLogin in options.url');
    }

    // Track it
    $.XeroLogin.options = opts;

    if(opts.autoShow) {
      _popupLoginWindow(opts);
    }

    return _deferred;
  }

  // Constants to represent rejection states
  XeroLogin.CANCELLED = CANCELLED;
  XeroLogin.FAILED    = FAILED;
  XeroLogin.SUCCESS   = SUCCESS;

  // Popup the login window (called automatically if options have autoShow = true)
  XeroLogin.showLogin = function() {
    _popupLoginWindow(this.options);
  }

  // Called from the OAuth response callback page
  XeroLogin.success = function() {
    _deferred.resolve(SUCCESS);
  }

  // Called from the OAuth response callback page
  XeroLogin.failure = function() {
    _deferred.reject(FAILED);
  }

  // Cancel a connection attempt
  XeroLogin.cancel = function() {
    _deferred.reject(CANCELLED);
  }

  // Private methods

  function _popupLoginWindow(options) {
    // Calculate centered position for window
    var centeredX, centeredY;
    if ($.browser.msie) {//hacked together for IE browsers
      centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (opts.popup.height/2)));
      centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (opts.popup.width/2)));
    }else{
      centeredY = window.screenY + (((window.outerHeight/2) - (opts.popup.height/2)));
      centeredX = window.screenX + (((window.outerWidth/2) - (opts.popup.width/2)));
    }

    var winOpts = 'location=0,status=0,width=' + options.popup.width + ',height=' + options.popup.height + ',top=' + centeredY + ',left=' + centeredX + '';

    var oauthWindow   = window.open(options.url, options.popup.name, winOpts);

    var oauthInterval = window.setInterval(function(){
      if (oauthWindow.closed) {
        window.clearInterval(oauthInterval);
        XeroLogin.cancel();
      }
    }, 1000);
  }

  $.extend({
    XeroLogin: XeroLogin
  });

})( jQuery, window, document );