const { loadPackageDefinition } = require('@grpc/grpc-js');
let utils = require('../utils/grpc');
let fs = require('fs');

module.exports = function(RED) {
    function uploadContentNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        this.server = RED.nodes.getNode(config.server);

        node.on('input', function(msg) {

            uploadContent(msg);
        });

        function uploadContent(msg) {

            const nodeId = config.nodeId || msg.nodeId;
            const fileName = config.fileName || msg.fileName;

            if(!nodeId) {
                msg.error = 'No nodeId specified. Upload content failed';
                node.send(msg);
                return;
            }

            if(!fileName) {
                msg.error = 'No fileName specified. Upload content failed';
                node.send(msg);
                return;
            }

            if(!fs.existsSync(fileName)) {
                msg.error = 'File \'' + fileName + '\' was not found';
                node.send(msg);
                return;
            }

            const method = config.contentType == "Binary" ? "uploadBinaryContent" : "uploadTextContent";
            const url = node.server.host+":"+node.server.port;
            const client = utils.getClient(url);

            function runUploadInChunks() {
                const call = client[method](function(err, data) {
                    msg.payload = data;

                    msg.error = (err == null && !data?.success) ? data.error : err;
    
                    node.send(msg);
                });

                let revChunk = {  revisionId: { id: nodeId } };
                call.write(revChunk);

                async function streamFile() {

                    const chunk_size = 4000000; // 4 MB

                    let contentType = config.contentType == "Binary" ? null : "utf8";

                    const stream = fs.createReadStream(fileName, 
                        {highWaterMark: chunk_size, encoding: contentType});

                    for await (const data of stream) {
                        
                        let chunk = config.contentType == "Binary" ? {  binaryChunk: { bytes: data } } : {  textChunk: { arr: [data] } };

                        call.write(chunk);
                    }

                    call.end();
                }

                streamFile();
            }

            runUploadInChunks();
        }
    }

    RED.nodes.registerType("upload-content", uploadContentNode);
}
