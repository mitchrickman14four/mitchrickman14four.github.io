(function() {
  'use strict';

  function CookieManager() {}

  CookieManager.prototype.set = function(name, value) {
    var d = new Date();
    d.setHours(23,59,59,0);
    var expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  CookieManager.prototype.get = function(name) {
    var name = name + "=";
    var cookieValues = document.cookie.split(';');
    for(var i = 0; i < cookieValues.length; i++) {
        var c = cookieValues[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  var cookieName = 'usedEmails';
  var tempCookieName = 'tempEmail';
  var cookieManager = new CookieManager();

  var isEmailUnique = function( emailAddress ) {
    var cookieValue = cookieManager.get(cookieName);
    return cookieValue.indexOf(emailAddress) > -1 ? false : true;
  };

  var appendToCookie = function ( emailAddress ) {
    var cookieValue = cookieManager.get(cookieName);
    if ( cookieValue == "" ) {
      cookieManager.set(cookieName, emailAddress);
    }
    else {
      cookieManager.set(cookieName, cookieValue + "," + emailAddress);
    }
  }

  var addTempCookie = function() {
    var tempEmail = cookieManager.get(tempCookieName);
    appendToCookie(tempEmail);
  }

  addTempCookie();

  function trackConversion() {
    var onScriptLoad = function() {
      console.log('script loaded');
      /* <![CDATA[ */
      var goog_snippet_vars = function() {
        var w = window;
        w.google_conversion_id = 869038450;
        w.google_conversion_label = "xJPnCJjri2wQ8vKxngM";
        w.google_remarketing_only = false;
      }
      // DO NOT CHANGE THE CODE BELOW.
      var goog_report_conversion = function(url) {
        goog_snippet_vars();
        window.google_conversion_format = "3";
        var opt = new Object();
        opt.onload_callback = function() {
          if (typeof(url) != 'undefined') {
            window.location = url;
          }
        }
        var conv_handler = window['google_trackConversion'];
        if (typeof(conv_handler) == 'function') {
          conv_handler(opt);
        }
      }
      /* ]]> */
      console.log('conversion tracked');
    };

    var script = document.createElement('script');
    script.type = "text/javascript";
    script.addEventListener('load', onScriptLoad);

    // add script to page
    document.querySelector('body').appendChild( script );

    // load script
    script.src = '//www.googleadservices.com/pagead/conversion_async.js';
  }

  trackConversion();

})();
