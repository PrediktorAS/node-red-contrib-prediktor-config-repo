module.exports = function(RED) {
    function PrediktorConfigRepositoryNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
    }
    RED.nodes.registerType("prediktor-config-repository",PrediktorConfigRepositoryNode);
}
