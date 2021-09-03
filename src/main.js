const prediktorConfigRepository = require("./nodes/prediktor-config-repository");

ping = require("nodes/ping");
uploadcontent = require("nodes/upload-content");
downloadcontent = require("nodes/download-content");
getnodes = require("nodes/get-nodes");
getnode = require("nodes/get-node");
createnode = require("nodes/create-node");
updatenode = require("nodes/update-node");
deletenode = require("nodes/delete-node");
prediktorconfigrepository = require("nodes/prediktor-config-repository");

module.exports = function(RED){
    RED.nodes.registerType('ping', ping.PingNode);
    RED.nodes.registerType('upload-content', uploadcontent.uploadContentNode);
    RED.nodes.registerType('download-content', downloadcontent.downloadContentNode);
    RED.nodes.registerType('get-nodes', getnodes.GetNodesNode);
    RED.nodes.registerType('get-node', getnode.GetNodeNode);
    RED.nodes.registerType('create-node', createnode.CreateNodeNode);
    RED.nodes.registerType('update-node', updatenode.UpdateNodeNode);
    RED.nodes.registerType('delete-node', deletenode.DeleteNodeNode);
    RED.nodes.registerType('prediktor-config-repository', prediktorconfigrepository.PrediktorConfigRepositoryNode);
}
