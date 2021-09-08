let utils = require('../utils/grpc');
module.exports = function(RED) {
    function PingNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            client.ping({}, function(err, data){
                msg.payload = data;
                msg.error = err;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("ping",PingNode);
}
