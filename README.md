# A Node-Red plugin for working with the Configuration Repository of Prediktor APIS/EDGE

### What is Node-Red?
[Read more at the Official Site](https://nodered.org/)

### What is Prediktor APIS/EDGE?
[Read more at the Prediktor Documentation Site](https://docs.prediktor.com)

## Config Repository
The Configuration Repository (CR) is a standalone service for backups of:
- Ua Namespace nodeset files
- Apis Variable mapping files
- Apis Hive configuration files

CR can compare different versions of backups to each other.

The structure inside CR is organized as a hierachy 
- Level 1: Folders
- Level 2: Stores
- Level 3: Revisions
- Level 4: Content

### Folders
Folders can be nested to the users choosing. Only folders can be at the root of the repository. The users are free to organize a folder hierachy. 

### Stores
Stores are containers for Revisions (backups). A store is of one specific type, `Namespace`, `Variable Mapping` or `Hive Configuration`. 
- A Store of type `Namespace` can store nodeset2.xml file only.
- A Store of type `Variable Mapping` can store Apis hive config files only (text).
- A Store of type `Hive Config` can store Hive configuration backups only (zip).

### Revisions
Revisions can be added to Stores only, and must be of the same type as the Store. A Revision is a placeholder for an actual backup (Content). The revision contains metadata for the backup like, name, description, version, date and more. 

A Revisions type must correspond to the type of the Store it belongs to. I.e. a Revision for a namespace can only belong to a Store for namespaces.

### Content
Content is an actual backup file. Content is always assosiated with a Revision.

A Content file might be:
- nodeset2.xml file for an Ua Namespace
- Hive config text file for Variable Mapping
- Hive backup zip file for Hive Configuration


## Compare Revisions
Revisions in the same Store can be compared to one another. One revision is selected as base, the other as "compare to". The result will be sets of Added/Deleted/Modified from the viewpoint of the base. The diff-results for the 3 different types are different.

## Sample flow

    [ { "id": "ca93d23b7478210e", "type": "tab", "label": "Flow 1", "disabled": false, "info": "" }, { "id": "d01a81e6b4585a8a", "type": "inject", "z": "ca93d23b7478210e", "name": "Test", "props": [ { "p": "payload" }, { "p": "topic", "vt": "str" } ], "repeat": "", "crontab": "", "once": false, "onceDelay": 0.1, "topic": "", "payloadType": "date", "x": 590, "y": 100, "wires": [ [ "2382e44accf4468f" ] ] }, { "id": "e2661337b897c05b", "type": "debug", "z": "ca93d23b7478210e", "name": "", "active": true, "tosidebar": true, "console": false, "tostatus": false, "complete": "false", "statusVal": "", "statusType": "auto", "x": 1050, "y": 100, "wires": [] }, { "id": "2cf6aeae2c2d690d", "type": "inject", "z": "ca93d23b7478210e", "name": "Test", "props": [ { "p": "payload" }, { "p": "topic", "vt": "str" } ], "repeat": "", "crontab": "", "once": false, "onceDelay": 0.1, "topic": "", "payloadType": "date", "x": 590, "y": 160, "wires": [ [ "2280bc072a2e41d7" ] ] }, { "id": "753286c35a1a4227", "type": "debug", "z": "ca93d23b7478210e", "name": "", "active": true, "tosidebar": true, "console": false, "tostatus": false, "complete": "payload", "targetType": "msg", "statusVal": "", "statusType": "auto", "x": 1050, "y": 160, "wires": [] }, { "id": "babbd70329a98dd8", "type": "inject", "z": "ca93d23b7478210e", "name": "Test", "props": [ { "p": "payload" }, { "p": "topic", "vt": "str" } ], "repeat": "", "crontab": "", "once": false, "onceDelay": 0.1, "topic": "", "payloadType": "date", "x": 590, "y": 280, "wires": [ [ "56bf1fe3096433b7" ] ] }, { "id": "9af16a02798cd45e", "type": "debug", "z": "ca93d23b7478210e", "name": "", "active": true, "tosidebar": true, "console": false, "tostatus": false, "complete": "true", "targetType": "full", "statusVal": "", "statusType": "auto", "x": 1030, "y": 280, "wires": [] }, { "id": "2382e44accf4468f", "type": "ping", "z": "ca93d23b7478210e", "name": "", "server": "f6260fe87a01091b", "x": 770, "y": 100, "wires": [ [ "e2661337b897c05b" ] ] }, { "id": "1da5f7f120b7afc9", "type": "inject", "z": "ca93d23b7478210e", "name": "Test", "props": [ { "p": "payload" }, { "p": "topic", "vt": "str" } ], "repeat": "", "crontab": "", "once": false, "onceDelay": 0.1, "topic": "", "payloadType": "date", "x": 590, "y": 400, "wires": [ [ "c210be3ea261085e" ] ] }, { "id": "a2b66731d0554656", "type": "debug", "z": "ca93d23b7478210e", "name": "", "active": true, "tosidebar": true, "console": false, "tostatus": false, "complete": "true", "targetType": "full", "statusVal": "", "statusType": "auto", "x": 1030, "y": 400, "wires": [] }, { "id": "f85957de993d8622", "type": "inject", "z": "ca93d23b7478210e", "name": "Test", "props": [ { "p": "payload" }, { "p": "topic", "vt": "str" } ], "repeat": "", "crontab": "", "once": false, "onceDelay": 0.1, "topic": "", "payloadType": "date", "x": 590, "y": 340, "wires": [ [ "e2bdd83054fa996e" ] ] }, { "id": "d2689d16f7772d67", "type": "debug", "z": "ca93d23b7478210e", "name": "", "active": true, "tosidebar": true, "console": false, "tostatus": false, "complete": "true", "targetType": "full", "statusVal": "", "statusType": "auto", "x": 1030, "y": 340, "wires": [] }, { "id": "7125ca95edb08471", "type": "inject", "z": "ca93d23b7478210e", "name": "Test", "props": [ { "p": "payload" }, { "p": "topic", "vt": "str" } ], "repeat": "", "crontab": "", "once": false, "onceDelay": 0.1, "topic": "", "payloadType": "date", "x": 590, "y": 220, "wires": [ [ "6647d3fac8a976ce" ] ] }, { "id": "9b5f2f4c5f77118f", "type": "debug", "z": "ca93d23b7478210e", "name": "", "active": true, "tosidebar": true, "console": false, "tostatus": false, "complete": "true", "targetType": "full", "statusVal": "", "statusType": "auto", "x": 1030, "y": 220, "wires": [] }, { "id": "7204f3ca661b98f1", "type": "comment", "z": "ca93d23b7478210e", "name": "Individual methods", "info": "", "x": 810, "y": 40, "wires": [] }, { "id": "2280bc072a2e41d7", "type": "get-nodes", "z": "ca93d23b7478210e", "name": "", "server": "f6260fe87a01091b", "parentId": "", "x": 770, "y": 160, "wires": [ [ "753286c35a1a4227" ] ] }, { "id": "56bf1fe3096433b7", "type": "create", "z": "ca93d23b7478210e", "name": "", "server": "f6260fe87a01091b", "parentId": "", "nodeName": "Test Node", "description": "", "nodeData": "NodeData", "nodeType": "node", "revisionType": "unknownRevision", "version": "", "modelVersion": "", "timestamp": 0, "backupSetId": "", "x": 770, "y": 280, "wires": [ [ "9af16a02798cd45e" ] ] }, { "id": "c210be3ea261085e", "type": "delete", "z": "ca93d23b7478210e", "name": "", "server": "f6260fe87a01091b", "x": 790, "y": 400, "wires": [ [ "a2b66731d0554656" ] ] }, { "id": "6647d3fac8a976ce", "type": "get", "z": "ca93d23b7478210e", "name": "", "server": "f6260fe87a01091b", "nodeId": "1ab2ae0f-fafa-46ad-805f-655b5246dadc", "x": 770, "y": 220, "wires": [ [ "9b5f2f4c5f77118f" ] ] }, { "id": "e2bdd83054fa996e", "type": "update", "z": "ca93d23b7478210e", "name": "", "server": "f6260fe87a01091b", "parentId": "", "nodeId": "1ab2ae0f-fafa-46ad-805f-655b5246dadc", "nodeName": "", "description": "", "nodeData": "NodeData", "nodeType": "node", "revisionType": "unknownRevision", "version": "", "modelVersion": "", "timestamp": 0, "backupSetId": "", "x": 780, "y": 340, "wires": [ [ "d2689d16f7772d67" ] ] }, { "id": "f6260fe87a01091b", "type": "prediktor-config-repository", "host": "10.100.86.237", "port": "8237" } ]
## Install

`npm i node-red-contrib-prediktor-config-repo` or through the Node-Red palette
