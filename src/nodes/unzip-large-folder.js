module.exports = function (RED) {
    const fs = require('fs');  
    const unzipper = require('unzipper'); 
    const path = require('node:path');
    const fsExtra = require('fs-extra');

    function UnzipLargeFolderNode (config) {
        RED.nodes.createNode(this, config);
        this.zipFilepath = config.zipFilepath;
        this.outputPath = config.outputPath;
        this.clearFolder = config.clearFolder;
        let node = this;

        this.on('input', function (msg, send, done) {
            if (typeof node.zipFilepath !== 'string') {
                done("zipFilepath must be a string");
                return;
            } else if (typeof node.outputPath !== 'string') {
                done("outputPath must be a string");
                return;
            }

            let zipFilepath = msg.zipFilepath || node.zipFilepath;
            let outputPath = msg.outputPath || node.outputPath;
            let clearFolder  = msg.clearFolder || node.clearFolder;

            try {
                if (fs.existsSync(zipFilepath)) {
                    let emptiedFolder = !clearFolder;
                    let startedUnzipping = false;
                    let finishedUnzipping = false;
                    let counter = 0;

                    let timer = setInterval(function() {
                        if (!emptiedFolder) {
                            if (fs.existsSync(outputPath)) {
                                fsExtra.emptyDirSync(outputPath);
                            }
                            emptiedFolder = true;
                        }
                        else if (emptiedFolder && !startedUnzipping) {
                            startedUnzipping = true;

                            const stream = fs.createReadStream(zipFilepath).pipe(unzipper.Extract({ path: outputPath }));

                            stream.on('close', function() {
                                finishedUnzipping = true;
                            })
                        }
                        else if (finishedUnzipping) {
                            readFolder(outputPath, msg, send);
                            clearInterval(timer);
                        } else if (counter >= 360) {
                            clearInterval(timer);
                        }
                        counter ++;
                    }, 500);

                    if (counter >= 360) {
                        done("Error: unzipping timed out");
                        return;
                    }

                    function readFolder (outputPath, msg, send) {
                        function getDirectory (path) {
                            return fs.readdirSync(path).filter(function (file) {
                                return fs.statSync(path + '/' + file).isDirectory();
                            })
                        }
    
                        let folderName = getDirectory(outputPath);

                        if(!folderName[0]) {
                            done("The name of the unzipped folder is undefined");
                            return;
                        }

                        let newOutputPath = path.join(outputPath, folderName[0]);
                        let filenames = fs.readdirSync(newOutputPath);
    
                        msg.path = newOutputPath;
                        msg.filenames = filenames;
                        send(msg);
                    }                  
                } else {
                    throw new Error('The zipFilepath does not exist');
                }
                
            }
            catch (err) {
                done(err.message);
            }
        });
    }
    RED.nodes.registerType("unzip-large-folder", UnzipLargeFolderNode);
}

