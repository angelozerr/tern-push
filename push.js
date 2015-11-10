(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        return mod(require("tern/lib/tern"));
    if (typeof define == "function" && define.amd) // AMD
        return define(["tern/lib/tern" ], mod);
    mod(tern);
})(function(tern) {
    "use strict";
  
  function createWebSocketServer(server) {
    var WebSocketServer = require('ws').Server;
    server.wss = new WebSocketServer({ server: server.parent });
  }
  
  tern.Server.prototype.sendToClient = function(data) {
    var wss = this.wss;
    if (wss) wss.clients.forEach(function each(client) { client.send(JSON.stringify(data)); }); // node context
    else this.signal('sendToClient', data); // browser context
  };
  
  tern.registerPlugin("push", function(server, options) {
    if (server.parent) {
      createWebSocketServer(server);
    }  
  });
    
})