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

  var soap = function(url,sr,action,callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            if( callback !== false ) {
              callback();
            }
          }
        }
      }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', action);
    xmlhttp.send(sr);
  }

  // build SOAP request
  var url = 'https://webservices.listrak.com/v31/IntegrationService.asmx';
  var action = 'http://webservices.listrak.com/v31/SubscribeContact';
  var sr =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v31="http://webservices.listrak.com/v31/">' +
      '<soapenv:Header>' +
        '<v31:WSUser>' +
          '<v31:UserName>FAUser_costadelmar</v31:UserName>' +
          '<v31:Password>hcxUdKK66k4Y0kv</v31:Password>' +
        '</v31:WSUser>' +
      '</soapenv:Header>' +
      '<soapenv:Body>' +
        '<v31:SubscribeContact>' +
          '<v31:ListID>347894</v31:ListID>' +
          '<v31:ContactEmailAddress>dustin@14four.com</v31:ContactEmailAddress>' +
          '<v31:OverrideUnsubscribe>true</v31:OverrideUnsubscribe>' +
        '</v31:SubscribeContact>' +
      '</soapenv:Body>' +
    '</soapenv:Envelope>';

    soap(url,sr,action,function(){
      var url = 'https://webservices.listrak.com/v31/IntegrationService.asmx';
      var action = 'http://webservices.listrak.com/v31/UpdateContact';
      var sr =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v31="http://webservices.listrak.com/v31/">'+
        '<soapenv:Header>'+
               '<v31:WSUser>'+
                      '<v31:UserName>FAUser_costadelmar</v31:UserName>'+
                      '<v31:Password>hcxUdKK66k4Y0kv</v31:Password>'+
               '</v31:WSUser>'+
        '</soapenv:Header> '+
        '<soapenv:Body>'+
               '<v31:UpdateContact> '+
                      '<v31:WSContact> '+
                             '<v31:EmailAddress>dustin@14four.com</v31:EmailAddress>'+
                             '<v31:ListID>347894</v31:ListID>'+
                             '<v31:ContactProfileAttribute> '+
                                   '<v31:AttributeID>2416420</v31:AttributeID>'+
                                   '<v31:Value>on</v31:Value> '+
                             '</v31:ContactProfileAttribute>'+
                             '<v31:ContactProfileAttribute> '+
                                   '<v31:AttributeID>2392237</v31:AttributeID>'+
                                   '<v31:Value>Dustin</v31:Value> '+
                             '</v31:ContactProfileAttribute>'+
                             '<v31:ContactProfileAttribute> '+
                                   '<v31:AttributeID>2392238</v31:AttributeID>'+
                                   '<v31:Value>Dustin</v31:Value> '+
                             '</v31:ContactProfileAttribute>'+
                             '<v31:ContactProfileAttribute> '+
                                   '<v31:AttributeID>2413484</v31:AttributeID>'+
                                   '<v31:Value>5094484070</v31:Value> '+
                             '</v31:ContactProfileAttribute>'+
                      '</v31:WSContact>'+
                      '<v31:ProfileUpdateType>Update</v31:ProfileUpdateType>'+
                      '<v31:ExternalEventIDs>12849</v31:ExternalEventIDs> '+
               '</v31:UpdateContact>'+
        '</soapenv:Body>'+
        '</soapenv:Envelope>';
      soap(url,sr,action,false);
    });
})();
