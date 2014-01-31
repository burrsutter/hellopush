/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    successHandler: function () {
      var debug = document.getElementById("debug");
      console.log(message);
      debug.innerHTML = "success on: " + device.platform;
    },
    errorHandler: function (message) {
      var debug = document.getElementById("debug");
      console.log(message);
      debug.innerHTML = "error: " + message;
    },  
    onNotification: function (e) {
      // alert(e.alert);
      var notify = document.getElementById("notify");
      notify.innerHTML = e.alert;
    },  

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
          var platform = device.platform.toLowerCase();
          if (platform === "android") {
            var config = {
              senderID: "492580885002",
              pushServerURL: "https://aerogear-html5.rhcloud.com",
              variantID: "b3852e72-92e1-4b05-a4bd-c438721a3452",
              variantSecret: "13c9daca-457e-4837-bc26-324ae131c421"
            };
          } else if (platform === "ios") {
            var config = {
              senderID: "492580885002",
              pushServerURL: "https://aerogear-html5.rhcloud.com",
              variantID: "4cf028be-3199-4650-acd5-2a9c1abcdea3",																									
              variantSecret: "de939aa9-ac5c-4a9e-aa8a-12d432b43a23"
            };  
          } else {
            app.errorHandler("Unknown: " + platform);
            return;
          }
          
          push.register(
              app.successHandler, 
              app.errorHandler,
              {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                ecb: "app.onNotification",
                pushConfig: config
              });

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
