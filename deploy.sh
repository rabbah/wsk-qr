#!/usr/bin/env bash

WSK="${WSK-wsk}"

function deploy() {
    set -e
    gradle jar
    $WSK package update qr
    $WSK action update qr/generate build/libs/wsk-qr-1.0.jar --main qr.Generate -a web-export true
    $WSK action update qr/ui src/main/js/qr/ui.js -a web-export true
    $WSK action update host src/main/js/host.js
}

function teardown() {
    $WSK action delete host
    $WSK action delete qr/ui
    $WSK action delete qr/generate
    $WSK package delete qr
}

function host() {
    URL=`$WSK action invoke host -br -p path qr/ui.html | grep url | awk -F" " '{print $2}'`
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
esac
