let utils = require('../utils/grpc');
module.exports = function(RED) {
  function updateNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.server = RED.nodes.getNode(config.server);

    node.on('input', function(msg) {
        const parentId = msg.parentId || config.parentId;
        const nodeId = msg.nodeId || config.nodeId;
        const nodeName = msg.nodeName || config.nodeName;
        const description = msg.description || config.description;
        const nodeType = msg.nodeType || config.nodeType;
        const revisionType = msg.revisionType || config.revisionType;
        const version = msg.version || config.version;
        const modelVersion = msg.modelVersion || config.modelVersion;
        const timestamp = parseInt(msg.timestamp || config.timestamp);
        config.backupsetid = msg.backupsetid || config.backupsetid;

        const nodeTypeId = {
          'undefined': 0,
          'node': 1,
          'namespaceNodeset': 2,
          'hiveConfiguration': 3,
          'namespaceDatabase': 4,
          'transformationExpressions': 5
        } [nodeType];

        const revisionTypeId = {
          'unknown': 0,
          'namespaceNodeset': 1,
          'hiveConfiguration': 2,
          'namespaceDatabase': 3,
          'transformationExpressions': 4
        } [revisionType];

        let nodeRequest = {
          parentId: {
            id: parentId
          },
          id: {
            id: nodeId
          },
          name: nodeName,
          description: description
        };

        if (config.nodeData == "NodeData") {
          nodeRequest["nodeData"] = {
            type: nodeTypeId
          }
        } else {
          nodeRequest["revisionData"] = {
            type: revisionTypeId,
            version: version,
            modelVersion: modelVersion,
            publicationDate: {
              timestamp: timestamp
            },
            backupSetId: backupSetId
          }
        }

        const url = node.server.host + ":" + node.server.port;
        const client = utils.getClient(url);

        client.createNode(nodeRequest, function(err, data) {
          msg.payload = data;
          msg.error = err;
          node.send(msg);
        });
    });
  }
  RED.nodes.registerType("update", updateNode);
}
