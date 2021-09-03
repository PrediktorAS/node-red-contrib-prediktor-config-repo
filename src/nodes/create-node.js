let utils = require('../utils/grpc');
module.exports = function(RED) {
    function CreateNodeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {

            config.parentid = msg.parentid || config.parentid;
            config.nodeid = msg.nodeid || config.nodeid;
            config.nodename = msg.nodename || config.nodename;
            config.description = msg.description || config.description;
            config.nodetype = msg.nodetype || config.nodetype;
            config.revisiontype = msg.revisiontype || config.revisiontype;
            config.version = msg.version || config.version;
            config.modelversion = msg.modelversion || config.modelversion;
            config.timestamp = msg.timestamp || config.timestamp;
            config.publicationdate = {
                timestamp: parseInt(config.timestamp)
            }
            config.backupsetid = msg.backupsetid || config.backupsetid;

            console.log(config);
            
            const nodetype = {
                'undefined': 0,
                'node': 1,
                'namespaceNodeset': 2,
                'hiveConfiguration': 3,
                'namespaceDatabase': 4,
                'transformationExpressions': 5
            }[config.nodetype];

            const revisiontype = {
                'unknown': 0,
                'namespaceNodeset': 1,
                'hiveConfiguration': 2,
                'namespaceDatabase': 3,
                'transformationExpressions': 4
            }[config.revisiontype];

            msg.payload = {
                parentId: {
                    id: config.parentid
                },
                id: {
                    id: config.nodeid
                },
                name: config.nodename,
                description: config.description
            };

            if(config.nodedata == "NodeData"){
                msg.payload["nodeData"] = {
                    type:  nodetype
                }
            }
            else{
                msg.payload["revisionData"] = {
                	type: revisiontype,
                	version: config.version,
                	modelVersion: config.modelversion,
                	publicationDate: config.publicationdate,
                	backupSetId: config.backupsetid
                }
            }

            console.log(msg.payload);

            const method = "createNode";
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            client[method](msg.payload, function(err, data){
                msg.payload = data;
                msg.error = err;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("create-node", CreateNodeNode);
}
