
const grpc = require("@grpc/grpc-js");
const loader = require("@grpc/proto-loader");

protoFileName = __dirname+"/../protobuf/ConfigRepository.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

var packageDefinition = loader.loadSync(protoFileName, options);
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var configurationrepository = protoDescriptor.ConfigRepository;

function getClient(url){
    const client = new configurationrepository.ConfigRepository(
        url, grpc.credentials.createInsecure());
    return client;
}

module.exports = {
    getClient: getClient
}
