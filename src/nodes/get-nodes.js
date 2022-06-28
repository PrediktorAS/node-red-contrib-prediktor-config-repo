let utils = require('../utils/grpc');

module.exports = function(RED) {
    function GetAllNodes(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.serverUri = config.serverUri;

        node.on('input', function(msg) {
            const parentId = msg.parentId || config.parentId;
            const getNodesRequest = {
                parentNodeId: {
                    id: parentId
                },
                pageNo: 0,
                pageSize: 0
            };

            const url = msg.serverUri || config.serverUri;
            const client = utils.getClient(url);

            client.getNodes(getNodesRequest, function(err, data){
                msg.payload = data;
                msg.success = true;
                msg.error = '';

                if(err) {
                    msg.error = err;
                    msg.success = false;
                }
                else if(!data?.result?.success) {
                    msg.error = data.result?.error;
                    msg.success = false;
                }
          
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("get-nodes",GetAllNodes);
}
