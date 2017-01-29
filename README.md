Create a serverless UI to generate QR codes from text using OpenWhisk.

* The QR generator is a Java action in [src/main/java/qr/Generate.java](src/main/java/qr/Generate.java).
* The UI is a Node.js action in [src/main/js/qr/ui.js](src/main/js/qr/ui.js).

To build and deploy the QR generator and web UI, you'll need the OpenWhisk `wsk` CLI.
The quickest way to get started is to sign up and download it from [OpenWhisk on IBM Bluemix](https://ibm.biz/openwhisk).
You'll also need `gradle` to build the Java action.

How to build and deploy:
  1. `gradle jar`
  2. `wsk package create qr`
  3. `wsk action create qr/generate build/libs/wsk-qr-1.0.jar --main qr.Generate -a web-export true`
  4. `wsk action create qr/ui src/main/js/qr/ui.js -a web-export true`

That's it. You can now try it by accessing the URL for the UI you deployed.
To help you discover the URL, you can run use the included [helper action](src/main/js/host.js).
  5. `wsk action create host src/main/js/host.js`
  6. `wsk action invoke host -br -p path qr/ui.html`
  
On Mac OS, this is a convenient way to open the URL in your browser:
```
   wsk action invoke host -br -p path qr/ui.html | grep url | awk -F" " '{print $2}' | xargs open
```

