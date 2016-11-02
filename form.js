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

  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      var form = document.getElementById('mainform123');
      var input = document.getElementById('id123-control23176353');
      var button = document.getElementById('id123-button-send');
      var clickHandler = button.onclick;
      button.onclick = false
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

      var onFormSubmit = function( event ) {
        var isUnique = isEmailUnique( input.value );

        if ( isUnique ) {
          cookieManager.set(tempCookieName, input.value);
          clickHandler.call(this, event);
        }
        else {
          event.preventDefault();
          event.stopPropagation();
          alert('You’ve already entered today. Check back tomorrow and get another cast.');
        }
      };

      button.addEventListener('click', onFormSubmit);
    }, 100);
  });
})();
