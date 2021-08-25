let utils = require('../utils/grpc');
module.exports = function(RED) {
    function CreateNodeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {
            msg.payload = {
                parentId: {
                    id: ""
                },
                id: {
                    id: ""
                },
                name: "test-node",
                description: "test-node-description",
                nodeData: {
                    type: 1
                }
            };

            const method = "createNode";
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            client[method](msg.payload, function(err, data){
                msg.payload = data;
                msg.error = err;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("create-node", CreateNodeNode);
}
