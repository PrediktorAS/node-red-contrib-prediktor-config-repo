getnodes = require("nodes/get-nodes");
createnode = require("nodes/create-node");
remoteserver = require("nodes/remote-server");

module.exports = function(RED){
    RED.nodes.registerType('get-nodes', getnodes.GetNodesNode);
    RED.nodes.registerType('create-node', createnode.CreateNodeNode);
    RED.nodes.registerType('remote-server', remoteserver.RemoteServerNode);
}
