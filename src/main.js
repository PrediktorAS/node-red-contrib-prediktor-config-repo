getnodes = require("nodes/get-nodes");
createnode = require("nodes/create-node");

module.exports = function(RED){
    RED.nodes.registerType('get-nodes', getnodes.GetNodesNode);
    RED.nodes.registerType('create-node', createnode.CreateNodeNode);
}
