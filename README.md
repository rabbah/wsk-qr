# How to run

  1. `gradle jar`
  2. `wsk action create qr build/libs/qr-1.0.jar --main qr.Generate`
  3. `wsk action invoke -br qr -p text 'Hello world!' | jq -r .qr | base64 -D > output.png`
