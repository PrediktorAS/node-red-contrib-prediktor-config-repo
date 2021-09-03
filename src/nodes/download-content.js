let utils = require('../utils/grpc');
var async = require('async');
module.exports = function(RED) {
    function downloadContentNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {
            const node_id = msg.payload || config.nodeid;

            const method = (config.contenttype == "Binary") ? "downloadBinaryContent" : "downloadTextContent";
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            client[method](function(error, stats) {
              if (error) {
                console.log("error");
                console.log(error);
              }
              console.log(stats);
            });
        });
    }
    RED.nodes.registerType("download-content", downloadContentNode);
}
