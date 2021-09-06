let utils = require('../utils/grpc');
module.exports = function(RED) {
  function downloadContentNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);

    node.on('input', function(msg) {
      const node_id = msg.payload || config.nodeid;
      const method = (config.contenttype == "Binary") ? "downloadBinaryContent" : "downloadTextContent";
      const url = node.server.host + ":" + node.server.port;
      const client = utils.getClient(url);

      var chunks = [];
      var call = client[method]({
        id: node_id
      });
      call.on('data', function(chunk) {
        if (config.contenttype == "Binary") {
          chunks.push(chunk.bytes);
        }
        else{
          chunks.push(chunk.arr);
        }
      });
      call.on('end', function() {
        if (config.contenttype == "Binary")
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
