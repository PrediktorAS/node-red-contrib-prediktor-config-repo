let utils = require('../utils/grpc');

module.exports = function(RED) {
    function deleteNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.serverUri =  config.serverUri;

        node.on('input', function(msg) {
            const nodeId = msg.nodeId || config.nodeId;
            const url = msg.serverUri || config.serverUri;
            const client = utils.getClient(url);

            client.deleteNode({id: nodeId}, function(err, data){
                msg.payload = data;
                msg.success = true;
                msg.error = '';
        
                if(err) {
                    msg.error = err;
                    msg.success = false;
                }
                else if(!data?.success) {
                    msg.error = data.error;
                    msg.success = false;
                }

                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("delete", deleteNode);
}
