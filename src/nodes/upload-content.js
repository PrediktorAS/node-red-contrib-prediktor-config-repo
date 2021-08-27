let utils = require('../utils/grpc');
module.exports = function(RED) {
    function uploadContentNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);


        node.on('input', function(msg) {
            const str = "This is a chunk"
            const chunk = Buffer.from(str, "utf-8");

            console.log(config);
            var request;
            if(config.contenttype == "Binary"){
                request = {
            		binaryChunk: msg.payload || chunk
                };
            }
            else{
                request = {
            		textChunk: msg.payload || str
                };
            }

            msg.payload = {
                request: request
            };

            const method = (config.contenttype == "Binary") ? "uploadBinaryContent" : "uploadTextContent";
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            console.log(msg.payload);

            client[method](msg.payload, function(err, data){
                msg.payload = data;
                msg.error = err;

                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("upload-content", uploadContentNode);
}
