const compareHiveConfig = require("./nodes/compare-hive-config");
const compareVariableMappings = require("./nodes/compare-variable-mappings");
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
unzip = require("nodes/unzip-large-folder");
compareVariableMappings = require("nodes/compare-variable-mappings");
compareHiveConfig = requiure("nodes/compare-hive-config")

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
    RED.nodes.registerType('unzip-large-folder', unzip.UnzipLargeFolderNode);
    RED.nodes.registerType('compare-variable-mappings', compareVariableMappings.CompareVariableMappingsNode);
    RED.nodes.registerType('compare-hive-config', compareHiveConfig.CompareConfigNode);
}
