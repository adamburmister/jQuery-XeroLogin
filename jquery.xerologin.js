/** jQuery Xero Login Popup 

Shows Xero OAuth Authentication in a Javascript popup. Requires jQuery.

Homepage: http://github.com/adamburmister/jQuery-XeroLogin

For examples, check out the included example.html 
*/

;(function ( $, window, document, undefined ) {

  var defaults = {
    expiryTimeout: null,
    workingIndicator: null,
    progressIndicator: null,
    canceledIndicator: null
  };

  var _deferred = new $.Deferred();
  var _loginWindow = null;

  // Constructor
  // @return {jQuery.Deferred}
  function XeroLogin(options) {
    this.options = $.extend( {}, defaults, options );

    this._defaults = defaults;
    this._name = 'XeroLogin';
    
    return _deferred;
  }

  // Class methods

  // Start a connection attempt
  XeroLogin.login = function() {
    console.log("Connecting");
    _deferred.resolve('response');
  }

  // Cancel a connection attempt
  XeroLogin.cancel = function() {
    _deferred.reject('cancelled');
  }

  // Private methods

  function _showLoginWindow() {
    var width  = 970;
    var height = 650;

    _loginWindow = window.open(this.xero_login_url, "xero_login_popup", 
      "left=\#{left},top=\#{top},width=\#{width},height=\#{height},location=yes,toolbar=0,status=0,menubar=0,scrollbars=0".interpolate({ 
        left:   (document.viewport.getWidth() - width) / 2, 
        top:    (document.viewport.getHeight() - height) / 2,
        width:  width, 
        height: height })
      );
    
    if (_loginWindow) { // IE8 doesn't return a value for window.open...

      // thanks, quirksmode :)
if (window.focus) {_loginWindow.focus()}

  this.window_poller = new PeriodicalExecuter(function(pe) {

    if (_loginWindow.closed) {
      this.show_cancelOrReopen();
      pe.stop();
    }

  }.bind(this), 1);

  }

  $.extend({
    XeroLogin: XeroLogin
  });

})( jQuery, window, document );