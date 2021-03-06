let utils = require('../utils/grpc');
module.exports = function(RED) {
  function CreateNodeNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.serverUri = config.serverUri;

    node.on('input', function(msg) {
      const parentId = msg.parentId || config.parentId;
      const nodeName = msg.nodeName || config.nodeName;
      const description = msg.description || config.description;
      const nodeType = msg.nodeType || config.nodeType;
      const revisionType = msg.revisionType || config.revisionType;
      const version = msg.version || config.version;
      const modelVersion = msg.modelVersion || config.modelVersion;
      const timestamp = parseInt(msg.timestamp || config.timestamp);
      const backupSetId = msg.backupSetId || config.backupSetId;
      const nodeTypeId = parseInt(nodeType);
      const revisionTypeId = parseInt(revisionType);
      const url = msg.serverUri || config.serverUri;

      let nodeRequest = {
        parentId: {
          id: parentId
        },
        id: {
          id: ""
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
      
      const client = utils.getClient(url);

      client.createNode(nodeRequest, function(err, data) {
        
        msg.payload = data?.nodeId?.id;
        msg.success = true;
        msg.error = '';

        if(err) {
          msg.error = err;
          msg.success = false;
        }
        else if(!data?.result?.success) {
          msg.error = data.result?.error;
          msg.success = false;
        }
        
        node.send(msg);

      });
    });
  }
  RED.nodes.registerType("create", CreateNodeNode);
}
