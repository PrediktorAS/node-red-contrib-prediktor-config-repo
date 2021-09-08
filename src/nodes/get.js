let utils = require('../utils/grpc');
module.exports = function(RED) {
    function GetNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {
            const nodeId = msg.nodeId || config.nodeId;

            let getNodesRequest = {
              id: nodeId
            };

            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);


            client.getNode(getNodesRequest, function(err, data){
                msg.payload = data;
                msg.error = err;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("get",GetNode);
}
