import { format } from 'react-string-format';

/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
const lblAasWebServ = 'Create a ServiceTask out of ';
const keyPluginConfigFile = 'aasWebServiceDiscoverer';
var CUSTOM_PALETTE = {};

export default class CustomPaletteProvider {
  constructor(palette, create, elementFactory, bpmnFactory, spaceTool, lassoTool, handTool, globalConnect, translate) {
    this._palette = palette;
    CUSTOM_PALETTE = this._palette;
    CUSTOM_PALETTE.Actions = {};
    CUSTOM_PALETTE.NServicesFound = 0;
    CUSTOM_PALETTE.AASDiscovererStatus = 'READY';
    this._create = create;
    this._bpmnFactory = bpmnFactory;
    this._elementFactory = elementFactory;
    this._spaceTool = spaceTool;
    this._lassoTool = lassoTool;
    this._handTool = handTool;
    this._globalConnect = globalConnect;
    this._translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries() {
    var create = this._create,
      elementFactory = this._elementFactory,
      bpmnFactory = this._bpmnFactory;

    if (!CUSTOM_PALETTE.Actions.AASWebServicesGroupSeparator) {
      CUSTOM_PALETTE.Actions.AASWebServicesGroupSeparator = {
        group: 'AASWebServicesGroup',
        separator: true
      };
    }

    if (CUSTOM_PALETTE.AASDiscovererStatus == 'READY') {
      var discoverPromise = discoverAasWebServices({create, bpmnFactory, elementFactory}, 
                                                    window.PLUGIN_CONFIGS.aasImplementation, 
                                                    window.PLUGIN_CONFIGS.hostName, 
                                                    window.PLUGIN_CONFIGS.port, 
                                                    window.PLUGIN_CONFIGS.pathToAasList, 
                                                    window.PLUGIN_CONFIGS.pathToWSSubmElems);
      discoverPromise.finally((data) => {
        CUSTOM_PALETTE._update();
      });
    }

    return CUSTOM_PALETTE.Actions; 
  }
}

CustomPaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'bpmnFactory',
  'spaceTool',
  'lassoTool',
  'handTool',
  'globalConnect',
  'translate'
];

//tooling functions
function createAasWebServiceTask(modelerPlugs, name, id, url, method, content, isAsync, payload, response, aasIdentifier, aasIdShort) {
  const {create, bpmnFactory, elementFactory} = modelerPlugs;
  url = url ?? 'http://localhost:8085/sample';
  method = method ?? 'GET';
  content = content ?? 'application/json';
  payload = !payload ? '' : payload;
  response = !response ? '${response}' : '$' + response;

  return function (event) {
    const serviceTask = elementFactory.createShape({
      type: "bpmn:ServiceTask"
    });
    var urlInputParameter = bpmnFactory.create('camunda:InputParameter', {
      // type: 'string',
      name: 'url',
      value: url
    });
    var methodInputParameter = bpmnFactory.create('camunda:InputParameter', {
      // type: 'string',
      name: 'method',
      value: method
    });
    var contentTypeInputParameter = bpmnFactory.create('camunda:InputParameter', {
      // type: 'string',
      name: 'Content-Type',
      value: content
    });
    var payloadInputParameter = bpmnFactory.create('camunda:InputParameter', {
      // type: 'string',
      name: 'payload',
      value: payload
    });

    //create javascript inline script
    var inlineJsScriptOutParam = bpmnFactory.create('camunda:Script', {
      scriptFormat: "javascript",
      name: serviceResponseParamName,
      value: 'connector.getVariable("response");'
    });

    //give a name to output parameter (service response).
    var serviceResponseParamName = "response" + id.split(".")[1];
    var responseOutPutParameter = bpmnFactory.create('camunda:OutputParameter', {
      name: serviceResponseParamName
    });

    //assign inline script to output parameter
    responseOutPutParameter['definition'] = inlineJsScriptOutParam;

    var inputOutput = bpmnFactory.create('camunda:InputOutput', {
      inputParameters: [urlInputParameter, methodInputParameter, contentTypeInputParameter,
        payloadInputParameter],
      outputParameters: [responseOutPutParameter]
    });

    var connector = bpmnFactory.create("camunda:Connector", {
      connectorId: "http-connector", inputOutput
    });

    //add aasIdentifier and aasIdShort as an extensionElement under camunda:Properties nameSpace
    var eecpAasIdentifier = bpmnFactory.create("camunda:Property", {
      name: 'aasIdentifier', 
      value: aasIdentifier
    });

    var eecpAasIdShort = bpmnFactory.create("camunda:Property", {
      name: 'aasIdShort', 
      value: aasIdShort
    });

    var camundaProperties = bpmnFactory.create("camunda:Properties", {
      values: [eecpAasIdentifier, eecpAasIdShort]
    });

    //append all extensionElements
    var extensionElements = bpmnFactory.create('bpmn:ExtensionElements', {
      values: [connector, camundaProperties]
    });

    //set to the businessObject
    serviceTask.businessObject.set("extensionElements", extensionElements);
    serviceTask.businessObject.name = name;
    serviceTask.businessObject.id = id;
    serviceTask.businessObject.asyncBefore = isAsync;
    serviceTask.businessObject.asyncAfter = isAsync;
    create.start(event, serviceTask);
  };
}

function addServiceTaskFromAAS(modelerPlugs, aasIdShort, aasIdentifier, element) {
  let serviceId = aasIdShort + '.' + element.idShort;
  let serviceName = aasIdShort + ' ' + element.value.find(x => x.idShort == 'Name').value;
  let url = element.value.find(x => x.idShort == 'URL').value;
  let method = element.value.find(x => x.idShort == 'Method').value;
  let isAsync = element.value.find(x => x.idShort == 'IsAsync').value;
  let payload = element.value.find(x => x.idShort == 'RequestBody').value;
  let requestContentType = 'application/json';
  let response = '';

  CUSTOM_PALETTE.Actions[serviceId] = {
    group: 'AASWebServicesGroup',
    className: 'bpmn-icon-service-task',
    title: lblAasWebServ + serviceName,
    action: {
      dragstart: createAasWebServiceTask(modelerPlugs, serviceName, serviceId, url, method, requestContentType, isAsync, payload, response, aasIdentifier, aasIdShort),
      click: createAasWebServiceTask(modelerPlugs, serviceName, serviceId, url, method, requestContentType, isAsync, payload, response, aasIdentifier, aasIdShort)
    }
  }
}

async function discoverAasWebServices(modelerPlugs, aasImplementation, hostName, port, pathToAasList, pathToWSSubmElems) {
  if (hostName.endsWith("/")) hostName = hostName.slice(0, -1);
  if (pathToAasList.startsWith("/")) pathToAasList = pathToAasList.substring(1, pathToAasList.length);
  var aasUrl = hostName + ":" + port + '/' + pathToAasList;

  await fetch(aasUrl)
    .then(response => response.json())
    .then(async (data) => {
      console.log(data);

      let arShells = [];

      switch (aasImplementation) {
        case "AdminShellIO":
          //alert(format('{0} AASs found.', data.aaslist.length));
          arShells = data.aaslist;
          break;
        case "Basyx":
          arShells = data;
          break;
        default:
          break;
      }

      if (!arShells || arShells.length == 0) {
        alert('No shells found in the server');
        CUSTOM_PALETTE.AASDiscovererStatus = 'FINISHED';
        return;
      }
      //alert(format('{0} shells have been found', arShells.length));

      for (let i = 0; i < arShells.length; i++) {
        let shellObj = arShells[i];
        let aasIdentifier = '';
        let aasIdShort = '';

        switch (aasImplementation) {
          case "AdminShellIO":
            //"1 : aasDevice01 : [Custom] AssetAdministrationShell---3472E221 : aasxs\\RaspberryDevice01.aasx",
            let arShellDescription = shellObj.split(':');
            aasIdShort = arShellDescription[1].trim();
            aasIdentifier = arShellDescription[2].trim(); //still have to remove '[Custom] '
            break;
          case "Basyx":
            aasIdShort = shellObj.idShort;
            aasIdentifier = shellObj.identification.id;
            break;
          default:
            break;

        }
        //aasIdentifier can be URI. encode it.
        aasIdentifier = encodeURIComponent(aasIdentifier);

        await getSubmodelElementsFromAasId(modelerPlugs, aasImplementation, hostName, port, aasIdentifier, aasIdShort, pathToWSSubmElems);
      }
      CUSTOM_PALETTE.AASDiscovererStatus = 'FINISHED';
    })
    .catch(() => {
      CUSTOM_PALETTE.AASDiscovererStatus = 'FINISHED';
      console.log;
    });
}

async function getSubmodelElementsFromAasId(modelerPlugs, aasImplementation, hostName, port, aasIdentifier, aasIdShort, pathToWSSubmElems) {
  if (hostName.endsWith("/")) hostName = hostName.slice(0, -1);
  if (pathToWSSubmElems.startsWith("/")) pathToWSSubmElems = pathToWSSubmElems.substring(1, pathToWSSubmElems.length);

  switch (aasImplementation) {
    case "AdminShellIO":
      pathToWSSubmElems = pathToWSSubmElems.replace("{aasIdShort}", aasIdShort);
      break;
    case "Basyx":
      pathToWSSubmElems = pathToWSSubmElems.replace("{aasId}", aasIdentifier);
      break;
    default:
      break;
  }

  var aasUrl = hostName + ":" + port + '/' + pathToWSSubmElems;

  await fetch(aasUrl)
    .then(response => response.json())
    .then((data) => {
      console.log(data.submodelElements);
      //alert(format('{0} web services found from the AAS «{1}»', data.submodelElements.length, aasIdentifier));

      data.submodelElements.forEach(element => {
        CUSTOM_PALETTE.NServicesFound++;
        addServiceTaskFromAAS(modelerPlugs, aasIdShort, aasIdentifier, element);
      });
    })
    .catch(console.log);
}
