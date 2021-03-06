let utils = require('../utils/grpc');
module.exports = function(RED) {
  function CompareConfigNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.serverUri = config.serverUri;
    this.baseRevisionId = config.baseRevisionId;
    this.compareRevisionId = config.compareRevisionId;
    this.hiveName = config.hiveName;

    node.on('input', function(msg) {
      let hiveConfigCompareRequest = {
        baseRevisionId: { id: msg.baseRevisionId || node.baseRevisionId },
        compareRevisionId: { id: msg.compareRevisionId || node.compareRevisionId },
        InstanceName: msg.hiveName || node.hiveName
      };

      const url = msg.serverUri || node.serverUri;
      const client = utils.getClient(url);

      var chunks = [];
      var call = client.compareHiveConfig(hiveConfigCompareRequest);

      call.on('data', function(chunk) {
        chunks.push(chunk);
      });

      call.on('end', function() {
        msg.error = '';
        let success = false;
        let error = '';
        
        for(var i = 0; i < chunks.length; i++) {
          if(chunks[i]?.errorInfo !== undefined) {
            error = chunks[i].errorInfo.error + ". " + chunks[i].errorInfo.errorDetails;
          } else{
            success = true;
          }
        }

        msg.success = success;
        msg.payload = chunks;

        if(!success) {
          msg.error = error;
        }

        node.send(msg);
      });

      call.on('error', function(error) {
        msg.error = error;
      });
    });
  }
  RED.nodes.registerType("compare-hive-config", CompareConfigNode);
}
