function main(args) {
    let host = process.env['__OW_API_HOST']
    let ns = process.env['__OW_NAMESPACE']
    // assumes action path is /ns/qr/generate (namespace is ns, package is qr, action is generate)
    let generatorAction = (args.domain || `${host}/api/v1/web/${ns}`) + '/qr/generate'

    let html = 
`<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Serverless QR Generator</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <style>
      .footer {
         position: absolute;
         bottom: 0;
         width: 620px;
         height: 45px;
         background-color: #f5f5f5;
         margin-bottom: 150px;
      }
    </style>
  </head>
  <body style="padding-top:100px">
    <a href="https://github.com/rabbah/wsk-qr">
      <img style="position: absolute; top: 0; right: 0; border: 0;"
           src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67"
           alt="Fork me on GitHub"
           data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"></a>
    
    <div class="container" style="width:650px">
      <h2>OpenWhisk web-actions: generate QR code</h2>
      <form id="qrform" onsubmit="generate(); return false">
        <div class="form-group">
          <input id="qrtext" class="form-control" style="float:left;width:85%;"
                 type="text"
                 name="text"
                 maxlength="1024"
                 placeholder="enter text here and click generate to get its QR code"
                 value=""/>
          <button id="qrsubmit" type="button" class="btn btn-primary" style="float:right">Generate</button>
        </div>
        <div style="margin:auto" id="qrpng">
        </div>

        <footer class="footer">
          <div class="container" style="width:100%">
            <p class="text-muted" style="text-align:center;margin-top:12px">
              Try <a href="https://ibm.biz/openwhisk">OpenWhisk on IBM
              Bluemix</a> today or visit <a href="http://openwhisk.org">Apache
              Openwhisk</a> to learn more.
            </p>
          </div>
        </footer>
      </form>
    </div>

    <script type="text/javascript">
      var last = undefined

      $("#qrsubmit").click(function() {
        generate()
      })

      function generate() {
        var txt = $("#qrtext").val().trim()
        if (last != txt) {
           last = txt
           $("#qrpng").html('<img style="display:block; margin:auto;padding-top:10px" src="${generatorAction}.http?text='+escape(txt)+'" />')
        }
      }
    </script>
  </body>
</html>`

    return {html: html}
}
