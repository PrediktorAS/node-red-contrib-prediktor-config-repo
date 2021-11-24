let utils = require('../utils/grpc');
module.exports = function(RED) {
    function deleteNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {
            const nodeId = msg.nodeId || config.nodeId;
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            client.deleteNode({id: nodeId}, function(err, data){
                msg.payload = data;

                if(err == null && !data?.success) {
                    msg.error = data.error;
                }
                else {
                    msg.error = err;
                }

                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("delete", deleteNode);
}
