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

  var tracked = false;
  var form = document.getElementById('mainform123');
  var input = document.getElementById('id123-control23176353');
  var button = document.getElementById('id123-button-send');
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

  var addTrackingScript = function() {
    var script = document.createElement('script');
    script.type = "text/javascript";

    document.querySelector('body').appendChild( script );
    script.innerHTML = "/* <![CDATA[ */ \
    goog_snippet_vars = function() { \
    var w = window; \
    w.google_conversion_id = 869038450; \
    w.google_conversion_label = 'xJPnCJjri2wQ8vKxngM'; \
    w.google_remarketing_only = false; \
    }; \
    goog_report_conversion = function(url) { \
    goog_snippet_vars(); \
    window.google_conversion_format = '3'; \
    var opt = new Object(); \
    opt.onload_callback = function() { \
    if (typeof(url) != 'undefined') { \
    window.location = url; \
    } \
    }; \
    var conv_handler = window['google_trackConversion']; \
    if (typeof(conv_handler) == 'function') { \
    conv_handler(opt); \
    } \
    }; \
    goog_report_conversion(); \
    /* ]]> */";
  };

  var trackConversion = function() {
    addTrackingScript();
    var script = document.createElement('script');
    script.type = "text/javascript";

    // add script to page
    document.querySelector('body').appendChild( script );

    // load script
    script.src = '//www.googleadservices.com/pagead/conversion_async.js';
  };

  var onFormSubmit = function( event ) {
    var isUnique = isEmailUnique( input.value );

    if( ! tracked )
    {
      event.preventDefault();
      event.stopPropagation();
    }

    if ( isUnique ) {
      if( ! tracked )
      {
        console.log('tracking');
        trackConversion();
        tracked = true;
        setTimeout(function(){
          //button.click();
        },2000);
      }
      else
      {
        console.log('submitted');
        cookieManager.set(tempCookieName, input.value);
      }
    }
    else {
      alert('You’ve already entered today. Check back tomorrow and get another cast.');
    }
  };

  if( button !== null )
    button.addEventListener('click', onFormSubmit);
})();
