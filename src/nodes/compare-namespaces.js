let utils = require('../utils/grpc');
module.exports = function(RED) {
  function CompareNamespacesNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);
    this.baseRevisionId = config.baseRevisionId;
    this.compareRevisionId = config.compareRevisionId;
    this.nodeType = config.nodeType;
    this.excludeValueSourceAttributes = config.excludeValueSourceAttributes;

    node.on('input', function(msg) {
      let namespaceCompareRequest = {
        baseRevisionId: { id: msg.baseRevisionId || node.baseRevisionId },
        compareRevisionId: { id: msg.compareRevisionId || node.compareRevisionId },
        nodeType: msg.nodeType || node.nodeType,
        excludeValueSourceAttributes: msg.excludeValueSourceAttributes || node.excludeValueSourceAttributes
      };

      const url = node.server.host + ":" + node.server.port;
      const client = utils.getClient(url);

      var chunks = [];
      var call = client.compareNamespaces(namespaceCompareRequest);

      call.on('data', function(chunk) {
        chunks.push(chunk);
      });
      call.on('end', function() {

        let success = false;
        let error = '';
        let errorDetails = '';
        for(var i = 0; i < chunks.length; i++) {

          if(chunks[i]?.success !== undefined) {
            success = chunks[i].success;
          }
          if(chunks[i]?.error !== undefined) {
            error = chunks[i].error;
          }
          if(chunks[i]?.errordetails !== undefined) {
            errorDetails = chunks[i].errordetails;
          }
        }

        if(success) {
          msg.payload = chunks;
        }
        else {
          msg.payload = null;
          msg.error = error + errorDetails;
        }
        node.send(msg);
      });
      call.on('error', function(error) {
        msg.error = error;
      });
    });
  }
  RED.nodes.registerType("compare-namespaces", CompareNamespacesNode);
}
