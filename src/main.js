const prediktorConfigRepository = require("./nodes/prediktor-config-repository");

ping = require("nodes/ping");
uploadContent = require("nodes/upload-content");
downloadContent = require("nodes/download-content");
getAll = require("nodes/get-all");
get = require("nodes/get");
create = require("nodes/create");
update = require("nodes/update");
del = require("nodes/delete");
prediktorConfigRepository = require("nodes/prediktor-config-repository");

module.exports = function(RED){
    RED.nodes.registerType('ping', ping.PingNode);
    RED.nodes.registerType('upload-content', uploadcontent.uploadContentNode);
    RED.nodes.registerType('download-content', downloadcontent.downloadContentNode);
    RED.nodes.registerType('get-all', getAll.GetAllNode);
    RED.nodes.registerType('get', get.GetNode);
    RED.nodes.registerType('create', create.CreateNode);
    RED.nodes.registerType('update', update.UpdateNode);
    RED.nodes.registerType('delete', del.DeleteNode);
    RED.nodes.registerType('prediktor-config-repository', prediktorconfigrepository.PrediktorConfigRepositoryNode);
}
