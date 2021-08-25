let utils = require('../utils/grpc');
module.exports = function(RED) {
    function updateNodeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {
            config.parentid = msg.parentid || config.parentid;
            config.nodeid = msg.nodeid || config.nodeid;
            config.nodename = msg.nodename || config.nodename;
            config.description = msg.description || config.description;
            config.nodetype = msg.nodetype || config.nodetype;

            msg.payload = {
                parentId: {
                    id: config.parentid
                },
                id: {
                    id: config.nodeid
                },
                name: config.nodename,
                description: config.description,
                nodeData: {
                    type: 1
                }
            };
            
            const method = "updateNode";
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            client[method](msg.payload, function(err, data){
                msg.payload = data;
                msg.error = err;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("update-node", updateNodeNode);
}
