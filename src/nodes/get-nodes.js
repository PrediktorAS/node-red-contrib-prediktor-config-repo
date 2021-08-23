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
            msg.service = "ConfigurationRepository";
            msg.method = "getNodes";
            node.send(msg);
        });
    }
    RED.nodes.registerType("get-nodes",GetNodesNode);
}
