
#!/usr/bin/env bash

WSK="$OPENWHISK_HOME/bin/wsk"
DOMAIN=${CUSTOM_DOMAIN:-false}

function deploy() {
    set -e
    gradle jar
    $WSK package update qr
    $WSK action update qr/generate build/libs/wsk-qr-1.0.jar --main qr.Generate -m 128 --web true
    $WSK action update qr/ui src/main/js/qr/ui.js -m 128 -p domain $DOMAIN --web true
}

function teardown() {
    $WSK action delete qr/ui
    $WSK action delete qr/generate
    $WSK package delete qr
}

function host() {
    URL=`$WSK action get qr/ui --url | tail -1 | awk '{print $1".html"}'`
    echo open $URL
}

case "$1" in
--deploy )
deploy
;;
--teardown )
teardown
;;
--host )
host
;;
* )
echo "Usage $0 [--deploy, --teardown, --host]"
;;
esac
