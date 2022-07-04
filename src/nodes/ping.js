let utils = require('../utils/grpc');

module.exports = function(RED) {
    function PingNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.serverUri = config.serverUri;

        node.on('input', function(msg) {
            let serverUri = msg.serverUri || node.serverUri;
            const client = utils.getClient(serverUri);

            client.ping({}, function(err, data){
                msg.payload = data;
                msg.error = err;
                if(err)
                    msg.success = false;
                else
                    msg.success = true;

                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("ping",PingNode);
}
