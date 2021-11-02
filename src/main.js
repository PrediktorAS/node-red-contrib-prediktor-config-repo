const prediktorConfigRepository = require("./nodes/prediktor-config-repository");

ping = require("nodes/ping");
uploadContent = require("nodes/upload-content");
downloadContent = require("nodes/download-content");
getNodes = require("nodes/get-nodes");
get = require("nodes/get");
create = require("nodes/create");
update = require("nodes/update");
del = require("nodes/delete");
compare = require("nodes/compare-namespaces");
prediktorConfigRepository = require("nodes/prediktor-config-repository");

module.exports = function(RED){
    RED.nodes.registerType('ping', ping.PingNode);
    RED.nodes.registerType('upload-content', uploadcontent.uploadContentNode);
    RED.nodes.registerType('download-content', downloadcontent.downloadContentNode);
    RED.nodes.registerType('get-nodes', getNodes.GetAllNodes);
    RED.nodes.registerType('get', get.GetNode);
    RED.nodes.registerType('create', create.CreateNode);
    RED.nodes.registerType('update', update.UpdateNode);
    RED.nodes.registerType('delete', del.DeleteNode);
    RED.nodes.registerType('compare-namespaces', compare.CompareNamespacesNode);
    RED.nodes.registerType('prediktor-config-repository', prediktorconfigrepository.PrediktorConfigRepositoryNode);
}
