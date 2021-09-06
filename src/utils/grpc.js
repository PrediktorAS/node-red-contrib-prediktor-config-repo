
const grpc = require("@grpc/grpc-js");
const loader = require("@grpc/proto-loader");

protoFileName = __dirname+"/../protobuf/ConfigurationRepository.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

var packageDefinition = loader.loadSync(protoFileName, options);
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var configurationrepository = protoDescriptor.ConfigurationRepository;

function getClient(url){
    const client = new configurationrepository.ConfigurationRepository(
        url, grpc.credentials.createInsecure());
    return client;
}

module.exports = {
    getClient: getClient
}
