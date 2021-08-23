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
            msg.service = "ConfigurationRepository";
            msg.method = "createNode";
            node.send(msg);
        });
    }
    RED.nodes.registerType("create-node", CreateNodeNode);
}
