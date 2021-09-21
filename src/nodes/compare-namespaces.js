let utils = require('../utils/grpc');
module.exports = function(RED) {
  function CompareNamespacesNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);
    this.baseRevisionId = config.baseRevisionId;
    this.compareRevisionId = config.compareRevisionId;
    this.configProjectType = config.configProjectType;
    this.excludeValueSourceAttributes = config.excludeValueSourceAttributes;

    node.on('input', function(msg) {
      let namespaceCompareRequest = {
        baseRevisionId: msg.baseRevisionId || node.baseRevisionId,
        compareRevisionId: msg.compareRevisionId || node.compareRevisionId,
        configProjectType: msg.configProjectType || node.configProjectType,
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
        msg.payload = chunks;
        node.send(msg);
      });
      call.on('error', function(error) {
        msg.error = error;
      });
    });
  }
  RED.nodes.registerType("compare-namespaces", CompareNamespacesNode);
}
