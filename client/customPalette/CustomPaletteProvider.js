import { format } from 'react-string-format';

/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
 const lblAasWebServ = 'Create a ServiceTask out of ';
 const keyPluginConfigFile = 'aasWebServiceDiscoverer';
 var CUSTOM_PALETTE={};

 export default function CustomPaletteProvider(palette, create, elementFactory, bpmnFactory, spaceTool, lassoTool, handTool, globalConnect, translate) {
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

CustomPaletteProvider.prototype.getPaletteEntries = function(element) {
  var create = this._create,
      elementFactory = this._elementFactory,
      bpmnFactory = this._bpmnFactory;

  function createAasWebServiceTask(name, id, url, method, content, isAsync, payload, response) {
    url = url ?? 'http://localhost:8085/sample';
    method = method ?? 'GET';
    content = content ?? 'application/json';
    payload = !payload ? '' : '$' + payload;
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

       var responseOutPutParameter = bpmnFactory.create('camunda:OutputParameter', {
        // type: 'string',
        name: 'responsename',
        value: response
      });  

      var inputOutput = bpmnFactory.create('camunda:InputOutput', {
        inputParameters: [urlInputParameter,methodInputParameter,contentTypeInputParameter,
          payloadInputParameter ],   
          outputParameters: [responseOutPutParameter]  
      });  

      const connector = bpmnFactory.create("camunda:Connector", {
        connectorId: "http-connector", inputOutput
      });
      var extensionElements = bpmnFactory.create('bpmn:ExtensionElements', {
        values: [connector]
      });
      serviceTask.businessObject.set("extensionElements", extensionElements);
      serviceTask.businessObject.name = name;
      serviceTask.businessObject.id = id;
      serviceTask.businessObject.asyncBefore = isAsync;
      serviceTask.businessObject.asyncAfter = isAsync;
      create.start(event, serviceTask);
    };
  }

  if(!CUSTOM_PALETTE.Actions.AASWebServicesGroupSeparator){
    CUSTOM_PALETTE.Actions.AASWebServicesGroupSeparator = {
      group: 'AASWebServicesGroup',
      separator: true
    };
  }

  //#region get data from AAS Server
function addServiceTaskFromAAS(aasIdShort, element){
  let serviceId = aasIdShort + '.' + element.idShort;
  let serviceName = aasIdShort + ' ' + element.value.find(x=> x.idShort == 'Name').value;
  let url = element.value.find(x=> x.idShort == 'URL').value;
  let method = element.value.find(x=> x.idShort == 'Method').value;
  let isAsync = element.value.find(x=> x.idShort == 'IsAsync').value;
  let payload = element.value.find(x=> x.idShort == 'RequestBody').value;
  let requestContentType = 'application/json';
  let response = '';

  CUSTOM_PALETTE.Actions[serviceId] = {
    group: 'AASWebServicesGroup',
    className: 'bpmn-icon-service-task',
    title: lblAasWebServ + serviceName,
    action: {
      dragstart: createAasWebServiceTask(serviceName, serviceId, url, method, requestContentType, isAsync, payload, response),
      click: createAasWebServiceTask(serviceName, serviceId, url, method, requestContentType, isAsync, payload, response)
    }
  }
}

async function discoverAasWebServices(aasImplementation, hostName, port, pathToAasList, pathToWSSubmElems){
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

    if(!arShells || arShells.length == 0){
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
      
      await getSubmodelElementsFromAasId(aasImplementation, hostName, port, aasIdentifier, aasIdShort, pathToWSSubmElems);
    }
    CUSTOM_PALETTE.AASDiscovererStatus = 'FINISHED';
  })
  .catch(()=>{
    CUSTOM_PALETTE.AASDiscovererStatus = 'FINISHED'; 
    console.log;
  });
}

async function getSubmodelElementsFromAasId(aasImplementation, hostName, port, aasIdentifier, aasIdShort, pathToWSSubmElems){
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
      addServiceTaskFromAAS(aasIdShort, element);
    });
  })
  .catch(console.log);
}
//#endregion


  /*
    'AASWebService1': {
      group: 'AASWebServicesGroup',
      className: 'bpmn-icon-service-task',
      title: lblAasWebServ + 'AASWebService1',
      action: {
        dragstart: createAasWebServiceTask('AASWebService1','AASWebService1'),
        click: createAasWebServiceTask('AASWebService1','AASWebService1')
      }
    },
    'AASWebService2': {
      group: 'AASWebServicesGroup',
      className: 'bpmn-icon-service-task',
      title: lblAasWebServ + 'AASWebService2',
      action: {
        dragstart: createAasWebServiceTask('AASWebService2','AASWebService2'),
        click: createAasWebServiceTask('AASWebService2','AASWebService2')
      }
    }
  };*/

  if (CUSTOM_PALETTE.AASDiscovererStatus == 'READY'){
    var discoverPromise = discoverAasWebServices(window.PLUGIN_CONFIGS.aasImplementation, window.PLUGIN_CONFIGS.hostName, window.PLUGIN_CONFIGS.port, window.PLUGIN_CONFIGS.pathToAasList, window.PLUGIN_CONFIGS.pathToWSSubmElems);
    discoverPromise.finally((data) => {
      CUSTOM_PALETTE._update();
    });
  }

  return CUSTOM_PALETTE.Actions;
};