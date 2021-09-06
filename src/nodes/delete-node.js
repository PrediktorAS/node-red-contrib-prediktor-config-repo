let utils = require('../utils/grpc');
module.exports = function(RED) {
    function deleteNodeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {
            const node_id = msg.node_id || config.nodeid;
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);
          
            client.deleteNode({id: node_id}, function(err, data){
                msg.payload = data;
                msg.error = err;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("delete-node", deleteNodeNode);
}
