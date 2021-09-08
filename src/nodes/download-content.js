let utils = require('../utils/grpc');
module.exports = function(RED) {
  function downloadContentNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);

    node.on('input', function(msg) {
      const nodeId = msg.nodeId || config.nodeId;
      const method = (config.contentType == "Binary") ? "downloadBinaryContent" : "downloadTextContent";
      const url = node.server.host + ":" + node.server.port;
      const client = utils.getClient(url);

      var chunks = [];
      var call = client[method]({
        id: nodeId
      });
      call.on('data', function(chunk) {
        if (config.contentType == "Binary") {
          chunks.push(chunk.bytes);
        }
        else{
          chunks.push(chunk.arr);
        }
      });
      call.on('end', function() {
        if (config.contentType == "Binary")
          msg.payload = Buffer.concat(chunks);
        else
          msg.payload = chunks.join();
        node.send(msg);
      });
      call.on('error', function(error) {
        msg.error = error;
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("download-content", downloadContentNode);
}
