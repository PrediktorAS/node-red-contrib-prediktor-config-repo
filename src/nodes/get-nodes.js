let utils = require('../utils/grpc');
module.exports = function(RED) {
    function GetNodesNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {
            msg.payload = {
                parentNodeId: {
                    id: ""
                },
                pageNo: 0,
                pageSize: 0
            };
            const service = "ConfigurationRepository";
            const method = "getNodes";

            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            client[method](msg.payload, function(err, data){
                msg.payload = data;
                msg.error = err;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("get-nodes",GetNodesNode);
}
