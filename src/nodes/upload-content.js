let utils = require('../utils/grpc');
module.exports = function(RED) {
    function uploadContentNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {
            var data;
            if(config.contentType == "Binary")
                data = msg.data || Buffer.from(config.testValue, "utf-8");
            else
                data = msg.data || config.testValue;
            const nodeId = msg.nodeId || config.nodeId;

            var chunks = [
                {  revisionId: { id: nodeId } },
            ];

            const chunk_size = 4000000; // 4 MB
            const data_len = data.length;
            var i = 0;
            while(i < data_len){
                chunk = data.slice(i, i += data_len)
                if(config.contentType == "Binary")
                    chunks.push({ binaryChunk: { bytes: chunk } });
                else
                    chunks.push({  textChunk: { arr: [chunk] } });
            }

            const method = (config.contentType == "Binary") ? "uploadBinaryContent" : "uploadTextContent";
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            function runUploadChunk(callback){
                var call = client[method](function(error, status) {
                    msg.payload = status;
                    msg.error = error;
                    node.send(msg);
                });

                for(const chunk of chunks){
                    call.write(chunk);
                }
                call.end();
            }

            runUploadChunk();
        });
    }
    RED.nodes.registerType("upload-content", uploadContentNode);
}
