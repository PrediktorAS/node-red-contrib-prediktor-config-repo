let utils = require('../utils/grpc');
module.exports = function(RED) {
    function deleteNodeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {

            config.nodeid = msg.nodeid || config.nodeid;

            msg.payload = {
                id: config.nodeid
            };

            const method = "deleteNode";
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            client[method](msg.payload, function(err, data){
                msg.payload = data;
                msg.error = err;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("delete-node", deleteNodeNode);
}
