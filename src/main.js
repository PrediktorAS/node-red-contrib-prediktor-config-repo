ping = require("nodes/ping");
getnodes = require("nodes/get-nodes");
getnode = require("nodes/get-node");
createnode = require("nodes/create-node");
updatenode = require("nodes/update-node");
deletenode = require("nodes/delete-node");
remoteserver = require("nodes/remote-server");

module.exports = function(RED){
    RED.nodes.registerType('ping', ping.PingNode);
    RED.nodes.registerType('get-nodes', getnodes.GetNodesNode);
    RED.nodes.registerType('get-node', getnode.GetNodeNode);
    RED.nodes.registerType('create-node', createnode.CreateNodeNode);
    RED.nodes.registerType('update-node', updatenode.UpdateNodeNode);
    RED.nodes.registerType('delete-node', deletenode.DeleteNodeNode);
    RED.nodes.registerType('remote-server', remoteserver.RemoteServerNode);
}
