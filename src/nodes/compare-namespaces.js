let utils = require('../utils/grpc');
module.exports = function(RED) {
  function CompareNamespacesNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = config.server;
    this.baseRevisionId = config.baseRevisionId;
    this.compareRevisionId = config.compareRevisionId;
    this.excludeValueSourceAttributes = config.excludeValueSourceAttributes;

    node.on('input', function(msg) {
      let namespaceCompareRequest = {
        baseRevisionId: { id: msg.baseRevisionId || node.baseRevisionId },
        compareRevisionId: { id: msg.compareRevisionId || node.compareRevisionId },
        revisionType: 1,
        excludeValueSourceAttributes: msg.excludeValueSourceAttributes || node.excludeValueSourceAttributes
      };

      const url = msg.server || node.server
      const client = utils.getClient(url);

      var chunks = [];
      var call = client.compareNamespaces(namespaceCompareRequest);

      call.on('data', function(chunk) {
        chunks.push(chunk);
      });

      call.on('end', function() {
        msg.error = '';
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

        msg.success = success;
        msg.payload = chunks;

        if(!success) {
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
