const { loadPackageDefinition } = require('@grpc/grpc-js');
let utils = require('../utils/grpc');
let fs = require('fs');
const readline = require('readline');

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

                const chunk_size = 4000000; // 4 MB

                async function streamBinaryFile() {

                    let contentType = null;

                    const stream = fs.createReadStream(fileName, 
                        {highWaterMark: chunk_size, encoding: contentType});

                    for await (const data of stream) {
                        
                        let chunk = {  binaryChunk: { bytes: data } };

                        call.write(chunk);
                    }

                    call.end();
                }

                function streamTextFile() {

                    let contentType = "utf8";

                    const readInterface = readline.createInterface({
                        input: fs.createReadStream(fileName, {encoding: contentType}),
                        console: false
                    });

                    let chunks = [];
                    let lineCounter = 0;
                    let numBytes = 0;
                    let counter = 0;
                    readInterface.on('line', function(line) {


                        chunks[lineCounter++] = line;

                        numBytes += line.length;

                        if(numBytes >= chunk_size) {

                            //console.log("Sending chunks " + counter++);

                            let chunk = {  textChunk: { arr: chunks } };
                            call.write(chunk);
                            chunks = [];
                            lineCounter = 0;
                            numBytes = 0;
                        }

                    });

                    readInterface.on('close', function(){
                        if(lineCounter > 0) {
                            //console.log("Sending last chunks " + counter++);
                            let chunk = {  textChunk: { arr: chunks } };
                            call.write(chunk);
                        }
    
                        //console.log("End Stream " + lineCounter);
                        call.end();
                    });

                }

                if(config.contentType == "Binary")
                    streamBinaryFile();
                else 
                    streamTextFile();
            }

            runUploadInChunks();
        }
    }

    RED.nodes.registerType("upload-content", uploadContentNode);
}
