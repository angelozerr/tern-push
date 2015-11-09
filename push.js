(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        return mod(require("tern/lib/infer"), require("tern/lib/tern"));
    if (typeof define == "function" && define.amd) // AMD
        return define([ "tern/lib/infer", "tern/lib/tern" ], mod);
    mod(tern, tern);
})(function(infer, tern) {
    "use strict";
    
  tern.registerPlugin("push", function(server, options) {
    if (server.httpServer) {
      var WebSocketServer = require('ws').Server, wss = new WebSocketServer({ server: server.httpServer })
      wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
          console.log('received: %s', message);
        });

        ws.send('something');
      });
    }
  });
    
})