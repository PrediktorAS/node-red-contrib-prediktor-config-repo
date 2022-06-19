let utils = require('../utils/grpc');
module.exports = function(RED) {
  function CompareVariableMappingsNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);
    this.baseRevisionId = config.baseRevisionId;
    this.compareRevisionId = config.compareRevisionId;

    node.on('input', function(msg) {
      let revisionCompareRequest = {
        baseRevisionId: { id: msg.baseRevisionId || node.baseRevisionId },
        compareRevisionId: { id: msg.compareRevisionId || node.compareRevisionId }
      };

      const url = node.server.host + ":" + node.server.port;
      const client = utils.getClient(url);

      var chunks = [];
      var call = client.compareVariableMappings(revisionCompareRequest);

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
  RED.nodes.registerType("compare-variable-mappings", CompareVariableMappingsNode);
}
