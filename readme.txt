Aerogear Cordova Push Plugin (HelloWorld)
http://www.youtube.com/watch?v=a7QVWfEkSpc

0.  getting the Cordova command line tool installed for Mac 
    sudo npm install -g cordova
    cordova -version
    3.3.1-0.1.2
http://cordova.apache.org/blog/releases/2013/07/23/cordova-3.html
* TODO: find the Windows installation instructions *

Cordova Command Line Guide
http://cordova.apache.org/docs/en/3.0.0/guide_cli_index.md.html

npm itself comes from Node.js http://nodejs.org/ (Install button)
    npm -version
    1.3.25
    node --version
    v0.10.25
You will also need the Android SDK installed for your OS and in your PATH - 
commands like "android" and "adb devices" should execute
You will also need "curl", if you type in "curl" and hit return
curl: try 'curl --help' or 'curl --manual' for more information

1. cordova create folderName bundleID appName
cordova create hellopush com.burrsutter.hellopush "Hello Push"

2. edit hellopush (bring up your editor)
if you open config.xml, you should see
    <name>Hello Push</name>
    <widget id="com.burrsutter.hellopush"
    this becomes the bundle identifier, it must unique identify your iOS app, 
	globally when you setup your iOS provisioning profile, you will need 
	this unique bundle ID
3. cd hellopush
4. cordova platform add android
5. cordova plugin search push
6. cordova plugin add org.jboss.aerogear.cordova.push
7. There is a console.log in the default project as well as in the 
suggested example code, so make sure to also add the console plugin
   cordova plugin add org.apache.cordova.console

and to know the mobile OS install the device plugin
   cordova plugin add org.apache.cordova.device

8. index.html - below <div id="deviceready"> but inside <div class="app">
    <font size="6">
    <div id="notify">notifications </div>
    <div id="debug">debug </div>
    </font>

9. index.js
   successHandler: function (message) {
            var debug = document.getElementById("debug");
            console.log(message);
            debug.innerHTML = "success: " + message;
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
        var config = {
                senderID: "492580885002",
                pushServerURL: "https://aerogear-html5.rhcloud.com",
                variantID: "b3852e72-92e1-4b05-a4bd-c438721a3452",													
                variantSecret: "13c9daca-457e-4837-bc26-324ae131c421"														
        };
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

Note: senderID, variantID and variantSecret were all setup in the Push Console
at pushServerURL
http://aerogear.org/docs/guides/aerogear-push-android/google-setup/
http://aerogear.org/docs/guides/AdminConsoleGuide/
    
10. Run "adb devices" to see if an android device is plugged in correctly
cordova run android
this will install and launch the app on your plugged in, developer-ready 
Android phone/tablet

11. then send a message

curl -3 -u \
"f07c43a6-bb0a-4bb7-a1eb-b432ea432411:e2cf19c3-6636-4712-bbe8-93c3a3de1b18" \
   -v -H "Accept: application/json" -H "Content-type: application/json" \
   -X POST -d '{"message": {"alert":"Hello AeroGear", "badge":1}}' \
   https://aerogear-html5.rhcloud.com/rest/sender

where f07c43a6-bb0a-4bb7-a1eb-b432ea432411
is your Application ID from the web console
where e2cf19c3-6636-4712-bbe8-93c3a3de1b18 
is the Master Secret also from the web console

Success, send a few more messages, changing the "Hello AeroGear Unified Push!" 

Note: If you wish to deploy the app to another Android device, unplug the 
current one and plug in the new one - use "cordova run android" again and it 
will deploy to the new device - the app will still function and receive push 
notifications without being plugged in on USB.

12. Add iOS, if on Mac OS X, with XCode installed (via Mac AppStore is 
easiest) and you have previously paid your $99 and know how to get 
around at http://developer.apple.com

cordova platform add ios

13. Setup your provisioning profile:
http://aerogear.org/docs/guides/aerogear-push-ios/app-id-ssl-certificate-apns/
and
http://aerogear.org/docs/guides/aerogear-push-ios/provisioning-profiles/
and
http://aerogear.org/docs/guides/AdminConsoleGuide/

14. Add the variant for iOS via the Unified Push Server web console 
- uploading the .p12 and passphrase

15. look under platforms\ios and you should see a Hello Push.xcodeproj - 
double click on the .xcodeproj
If you see the General tab, double check the bundle identifier of 
com.burrsutter.hellopush or whatever you made yours

Modify the index.js (in XCode) for the proper variantID and variantSecret
from the Unified Push Server console

16. Assuming you have previously registered your plugged in iOS device 
with the developer.apple.com portal, you can now hit the big arrow and 
target your device. 

When the app installs it should prompt you to accept push notifications.

17. Look for a new installation/device token under your newly added iOS 
variant in the UPS web console.  If you see no instance/device token
then something failed.

18. Finally, send a message, it should hit all the android & iOS devices 
that you have deployed the app to.

http://www.screencast.com/t/FV9looAwHh1

