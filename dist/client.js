/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/ConfigOverlay.js":
/*!*********************************!*\
  !*** ./client/ConfigOverlay.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConfigOverlay)
/* harmony export */ });
/* harmony import */ var camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! camunda-modeler-plugin-helpers/react */ "./node_modules/camunda-modeler-plugin-helpers/react.js");
/* harmony import */ var camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camunda_modeler_plugin_helpers_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camunda-modeler-plugin-helpers/components */ "./node_modules/camunda-modeler-plugin-helpers/components.js");
/* harmony import */ var react_string_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-string-format */ "./node_modules/react-string-format/lib/index.js");
/* eslint-disable no-unused-vars */



const OFFSET = {
  right: 0
};
const pathToWSSubmElemsAdminShellIO = '/aas/{aasId}/submodels/RestServices/complete';
const pathToWSSubmElemsBasyx = '/shells/{aasId}/aas/submodels/RestServices/submodel/submodelElements';
const pathToAasListAdminShellIO = '/server/listaas';
const pathToAasListBasyx = '/shells'; //#region get data from AAS Server

function discoverAasRestServices(hostName, port, pathToAasList, pathToWSSubmElems) {
  if (hostName.endsWith("/")) hostName = hostName.slice(0, -1);
  if (pathToAasList.startsWith("/")) pathToAasList = pathToAasList.substring(1, pathToAasList.length);
  var aasUrl = hostName + ":" + port + '/' + pathToAasList;
  fetch(aasUrl).then(response => response.json()).then(data => {
    console.log(data);
    alert((0,react_string_format__WEBPACK_IMPORTED_MODULE_2__.format)('{0} AASs found.', data.aaslist.length));

    if (data.aaslist.length > 0) {
      data.aaslist.forEach(element => {
        var arElement = element.split(':');
        var aasIdentifier = arElement[1].trim(); //"1 : aasDevice01 : [Custom] AssetAdministrationShell---3472E221 : aasxs\\RaspberryDevice01.aasx",

        getSubmodelElementsFromAasId(hostName, port, aasIdentifier, pathToWSSubmElems);
      });
    }
  }).catch(console.log);
}

function getSubmodelElementsFromAasId(hostName, port, aasIdentifier, pathToWSSubmElems) {
  if (hostName.endsWith("/")) hostName = hostName.slice(0, -1);
  if (pathToWSSubmElems.startsWith("/")) pathToWSSubmElems = pathToWSSubmElems.substring(1, pathToWSSubmElems.length);
  pathToWSSubmElems = pathToWSSubmElems.replace("{aasId}", aasIdentifier);
  var aasUrl = hostName + ":" + port + '/' + pathToWSSubmElems;
  fetch(aasUrl).then(response => response.json()).then(data => {
    console.log(data.submodelElements);
    alert((0,react_string_format__WEBPACK_IMPORTED_MODULE_2__.format)('{0} web services found from the AAS «{1}»', data.submodelElements.length, aasIdentifier));
    data.submodelElements.forEach(element => {
      console.log(element);
    });
  }).catch(console.log);
} //#endregion
// we can even use hooks to render into the application


function ConfigOverlay({
  anchor,
  initValues,
  onClose
}) {
  const [enabled, setEnabled] = (0,camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__.useState)(initValues.enabled);
  const [hostName, setHostName] = (0,camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__.useState)(initValues.hostName);
  const [port, setPort] = (0,camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__.useState)(initValues.port);
  const [aasImplementation, setAasImplementation] = (0,camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__.useState)(initValues.aasImplementation);
  const [pathToAasList, setPathToAasList] = (0,camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__.useState)(initValues.pathToAasList);
  const [pathToWSSubmElems, setPathToWSSubmElems] = (0,camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__.useState)(initValues.pathToWSSubmElems);
  const [autoDiscovererInterval, setAutoDiscovererInterval] = (0,camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__.useState)(initValues.autoDiscovererInterval);

  const onSubmit = () => {
    //discoverAasRestServices(hostName, port, pathToAasList, pathToWSSubmElems);
    onClose({
      enabled,
      hostName,
      port,
      aasImplementation,
      pathToAasList,
      pathToWSSubmElems,
      autoDiscovererInterval
    });
  };

  function onChangeAasImplementation(aasImplementation) {
    switch (aasImplementation) {
      case "adminShellIO":
        setPathToAasList(pathToAasListAdminShellIO);
        setPathToWSSubmElems(pathToWSSubmElemsAdminShellIO);
        break;

      case "Basyx":
        setPathToAasList(pathToAasListBasyx);
        setPathToWSSubmElems(pathToWSSubmElemsBasyx);
        break;

      default:
        break;
    }

    setAasImplementation(aasImplementation);
  } // we can use the built-in styles, e.g. by adding "btn btn-primary" class names


  return /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement(camunda_modeler_plugin_helpers_components__WEBPACK_IMPORTED_MODULE_1__.Overlay, {
    anchor: anchor,
    onClose: onClose,
    offset: OFFSET
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement(camunda_modeler_plugin_helpers_components__WEBPACK_IMPORTED_MODULE_1__.Section, null, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement(camunda_modeler_plugin_helpers_components__WEBPACK_IMPORTED_MODULE_1__.Section.Header, null, "AAS WebService Discoverer"), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement(camunda_modeler_plugin_helpers_components__WEBPACK_IMPORTED_MODULE_1__.Section.Body, null, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    id: "aasWebServiceDiscovererConfigForm",
    onSubmit: onSubmit
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    class: "form-group"
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    class: "custom-control custom-checkbox"
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    name: "enabled",
    className: "custom-control-input",
    id: "enabled",
    type: "checkbox",
    onChange: () => setEnabled(!enabled),
    value: enabled,
    defaultChecked: enabled
  }), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "custom-control-label",
    htmlFor: "enabled"
  }, "Enabled"))), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "hostName"
  }, "Host Name:"), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    className: "form-control",
    name: "hostName",
    value: hostName,
    onChange: event => setHostName(event.target.value)
  })), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "port"
  }, "Port:"), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "Number",
    className: "form-control",
    name: "port",
    min: "1",
    max: "99999",
    value: port,
    onChange: event => setPort(Number(event.target.value))
  })), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "aasImplementation"
  }, "AAS Implementation:"), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    className: "form-control",
    name: "aasImplementation",
    value: aasImplementation,
    onChange: event => onChangeAasImplementation(event.target.value)
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "adminShellIO",
    selected: true
  }, "admin-shell-io"), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "Basyx"
  }, "Basyx"), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "Other"
  }, "Other"))), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "pathToAasList"
  }, "Path to AAS List:"), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    className: "form-control",
    name: "pathToAasList",
    value: pathToAasList,
    onChange: event => setPathToAasList(event.target.value)
  })), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "pathToWSSubmElems"
  }, "Path to RestServices Submodel Elements:"), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    className: "form-control",
    name: "pathToWSSubmElems",
    value: pathToWSSubmElems,
    onChange: event => setPathToWSSubmElems(event.target.value)
  })), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "autoDiscovererInterval"
  }, "Auto Discover Interval (seconds):"), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "number",
    className: "form-control",
    name: "autoDiscovererInterval",
    min: "5",
    max: "60",
    value: autoDiscovererInterval,
    onChange: event => setAutoDiscovererInterval(Number(event.target.value))
  }))), /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement(camunda_modeler_plugin_helpers_components__WEBPACK_IMPORTED_MODULE_1__.Section.Actions, null, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    form: "aasWebServiceDiscovererConfigForm"
  }, "Save")))));
}

/***/ }),

/***/ "./client/aasWebServiceDiscovererExtension.js":
/*!****************************************************!*\
  !*** ./client/aasWebServiceDiscovererExtension.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ aasWebServiceDiscovererExtension)
/* harmony export */ });
/* harmony import */ var camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! camunda-modeler-plugin-helpers/react */ "./node_modules/camunda-modeler-plugin-helpers/react.js");
/* harmony import */ var camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camunda_modeler_plugin_helpers_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camunda-modeler-plugin-helpers/components */ "./node_modules/camunda-modeler-plugin-helpers/components.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _resources_aasicon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../resources/aasicon.svg */ "./resources/aasicon.svg");
/* harmony import */ var _ConfigOverlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConfigOverlay */ "./client/ConfigOverlay.js");





const keyPluginConfigFile = 'aasWebServiceDiscoverer';
const defaultState = {
  configOpen: false,
  enabled: false,
  hostName: 'http://127.0.0.1',
  port: '5103',
  aasImplementation: '',
  pathToAasList: '/',
  pathToWSSubmElems: '/',
  autoDiscovererInterval: 5
};
const PLUGIN_EVENT = 'AAS Web Service Discoverer:import';
window.PLUGIN_CONFIGS = {};
class aasWebServiceDiscovererExtension extends camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleConfigClosed = this.handleConfigClosed.bind(this);
    this._buttonRef = camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createRef();
  }

  componentDidMount() {
    const {
      config,
      subscribe
    } = this.props;
    subscribe(PLUGIN_EVENT, () => {
      this.openModal();
    }); // retrieve plugin related information from the application configuration

    config.getForPlugin(keyPluginConfigFile, 'config').then(config => {
      this.setState(config);
      window.PLUGIN_CONFIGS = config;
    });
  }

  openModal() {
    this.setState({
      configOpen: true
    });
  }

  handleConfigClosed(newConfig) {
    this.setState({
      configOpen: false
    });

    if (newConfig) {
      // via <config> it is also possible to save data into the application configuration
      this.props.config.setForPlugin(keyPluginConfigFile, 'config', newConfig).catch(console.error);
      this.setState(newConfig);
      window.location.reload(false);
    }
  }
  /**
   * render any React component you like to extend the existing
   * Camunda Modeler application UI
   */


  render() {
    const {
      configOpen,
      enabled,
      hostName,
      port,
      aasImplementation,
      pathToAasList,
      pathToWSSubmElems,
      autoDiscovererInterval
    } = this.state;
    const initValues = {
      enabled,
      hostName,
      port,
      aasImplementation,
      pathToAasList,
      pathToWSSubmElems,
      autoDiscovererInterval
    }; // we can use fills to hook React components into certain places of the UI

    return /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement(camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement(camunda_modeler_plugin_helpers_components__WEBPACK_IMPORTED_MODULE_1__.Fill, {
      slot: "status-bar__app",
      group: "1_aasWebServiceDiscoverer"
    }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      ref: this._buttonRef,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('btn', {
        'btn--active': configOpen
      }),
      onClick: () => this.setState({
        configOpen: true
      })
    }, /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_resources_aasicon_svg__WEBPACK_IMPORTED_MODULE_3__["default"], null))), this.state.configOpen && /*#__PURE__*/camunda_modeler_plugin_helpers_react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ConfigOverlay__WEBPACK_IMPORTED_MODULE_4__["default"], {
      anchor: this._buttonRef.current,
      onClose: this.handleConfigClosed,
      initValues: initValues
    }));
  }

}

/***/ }),

/***/ "./client/customPalette/CustomPaletteProvider.js":
/*!*******************************************************!*\
  !*** ./client/customPalette/CustomPaletteProvider.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomPaletteProvider)
/* harmony export */ });
/* harmony import */ var react_string_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-string-format */ "./node_modules/react-string-format/lib/index.js");

/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */

const lblAasWebServ = 'Create a ServiceTask out of ';
const keyPluginConfigFile = 'aasWebServiceDiscoverer';
var CUSTOM_PALETTE = {};
function CustomPaletteProvider(palette, create, elementFactory, bpmnFactory, spaceTool, lassoTool, handTool, globalConnect, translate) {
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
CustomPaletteProvider.$inject = ['palette', 'create', 'elementFactory', 'bpmnFactory', 'spaceTool', 'lassoTool', 'handTool', 'globalConnect', 'translate'];

CustomPaletteProvider.prototype.getPaletteEntries = function (element) {
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
        inputParameters: [urlInputParameter, methodInputParameter, contentTypeInputParameter, payloadInputParameter],
        outputParameters: [responseOutPutParameter]
      });
      const connector = bpmnFactory.create("camunda:Connector", {
        connectorId: "http-connector",
        inputOutput
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

  if (!CUSTOM_PALETTE.Actions.AASWebServicesGroupSeparator) {
    CUSTOM_PALETTE.Actions.AASWebServicesGroupSeparator = {
      group: 'AASWebServicesGroup',
      separator: true
    };
  } //#region get data from AAS Server


  function addServiceTaskFromAAS(aasIdentifier, element) {
    let serviceId = aasIdentifier + '.' + element.idShort;
    let serviceName = aasIdentifier + ' ' + element.value.find(x => x.idShort == 'Name').value;
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
        dragstart: createAasWebServiceTask(serviceName, serviceId, url, method, requestContentType, isAsync, payload, response),
        click: createAasWebServiceTask(serviceName, serviceId, url, method, requestContentType, isAsync, payload, response)
      }
    };
  }

  async function discoverAasWebServices(hostName, port, pathToAasList, pathToWSSubmElems) {
    if (hostName.endsWith("/")) hostName = hostName.slice(0, -1);
    if (pathToAasList.startsWith("/")) pathToAasList = pathToAasList.substring(1, pathToAasList.length);
    var aasUrl = hostName + ":" + port + '/' + pathToAasList;
    await fetch(aasUrl).then(response => response.json()).then(async data => {
      console.log(data); //alert(format('{0} AASs found.', data.aaslist.length));

      if (data.aaslist.length > 0) {
        for (let i = 0; i < data.aaslist.length; i++) {
          let element = data.aaslist[i];
          let arElement = element.split(':');
          let aasIdentifier = arElement[1].trim(); //"1 : aasDevice01 : [Custom] AssetAdministrationShell---3472E221 : aasxs\\RaspberryDevice01.aasx",

          await getSubmodelElementsFromAasId(hostName, port, aasIdentifier, pathToWSSubmElems);
        }

        CUSTOM_PALETTE.AASDiscovererStatus = 'FINISHED';
      }
    }).catch(() => {
      CUSTOM_PALETTE.AASDiscovererStatus = 'FINISHED';
      console.log;
    });
  }

  async function getSubmodelElementsFromAasId(hostName, port, aasIdentifier, pathToWSSubmElems) {
    if (hostName.endsWith("/")) hostName = hostName.slice(0, -1);
    if (pathToWSSubmElems.startsWith("/")) pathToWSSubmElems = pathToWSSubmElems.substring(1, pathToWSSubmElems.length);
    pathToWSSubmElems = pathToWSSubmElems.replace("{aasId}", aasIdentifier);
    var aasUrl = hostName + ":" + port + '/' + pathToWSSubmElems;
    await fetch(aasUrl).then(response => response.json()).then(data => {
      console.log(data.submodelElements); //alert(format('{0} web services found from the AAS «{1}»', data.submodelElements.length, aasIdentifier));

      data.submodelElements.forEach(element => {
        CUSTOM_PALETTE.NServicesFound++;
        addServiceTaskFromAAS(aasIdentifier, element);
      });
    }).catch(console.log);
  } //#endregion

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


  if (CUSTOM_PALETTE.AASDiscovererStatus == 'READY') {
    var discoverPromise = discoverAasWebServices(window.PLUGIN_CONFIGS.hostName, window.PLUGIN_CONFIGS.port, window.PLUGIN_CONFIGS.pathToAasList, window.PLUGIN_CONFIGS.pathToWSSubmElems);
    discoverPromise.finally(data => {
      CUSTOM_PALETTE._update();
    });
  }

  return CUSTOM_PALETTE.Actions;
};

/***/ }),

/***/ "./node_modules/camunda-modeler-plugin-helpers/components.js":
/*!*******************************************************************!*\
  !*** ./node_modules/camunda-modeler-plugin-helpers/components.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fill": () => (/* binding */ Fill),
/* harmony export */   "Modal": () => (/* binding */ Modal),
/* harmony export */   "NotCompatible": () => (/* binding */ NotCompatible),
/* harmony export */   "Overlay": () => (/* binding */ Overlay),
/* harmony export */   "Section": () => (/* binding */ Section),
/* harmony export */   "ToggleSwitch": () => (/* binding */ ToggleSwitch)
/* harmony export */ });
if (!window.components) {
  throw notCompatible('3.4');
}

function notCompatible(requiredVersion) {
  return new Error('Not compatible with Camunda Modeler < v' + requiredVersion);
}

const NotCompatible = function(requiredVersion) {
  return function NotCompatibleComponent() {
    throw notCompatible(requiredVersion);
  };
};

/**
 * Fill component. Set `slot` to "toolbar" to include in the top toolbar.
 * Use `group` and `priority=0` to place for correct ordering. The higher
 * the priority, the earlier the Fill is displayed within the group.
 *
 * @type {import('react').ComponentType<{ slot: string, group?: string, priority?: Number }>}
 *
 * @example
 *
 * import { Fill } from 'camunda-modeler-plugin-helpers/components';
 *
 * function CustomFill(props) {
 *   return (
 *     <Fill group="4_export" slot="toolbar" priority={100}>
 *       <button type="button" onClick={ props.openExportTool }>
 *         Open Export Tool
 *       </button>
 *     </Fill>
 *   );
 * }
 */
const Fill = window.components.Fill;

/**
 * Modal component.
 *
 * @type {import('react').ComponentType<{ onClose: Function }>}
 *
 * @example
 *
 * import { Modal } from 'camunda-modeler-plugin-helpers/components';
 *
 * function CustomModal(props) {
 *   return (
 *    <Modal onClose={ props.onClose }>
 *      <Modal.Title>
 *        Custom Modal
 *      </Modal.Title>
 *      <Modal.Body>
 *        Hello world!
 *      </Modal.Body>
 *      <Modal.Footer>
 *        <button type="button" onClick={ props.onClose }>
 *          Close
 *        </button>
 *      </Modal.Footer>
 *    </Modal>
 *   );
 * }
 */
const Modal = window.components.Modal;

/**
 * Overlay component.
 *
 * @type {import('react').ComponentType<{ 
 *  onClose: Function, 
 *  anchor: Node, 
 *  offset?: { top?: number, bottom?: number, left?: number, right?: number }, 
 *  maxWidth?: number | string,
 *  maxHeight?: number | string,
 *  minWidth?: number | string,
 *  minHeight?: number | string
 * }>}
 *
 * @example
 * 
 * import { Overlay } from 'camunda-modeler-plugin-helpers/components';
 *
 * function CustomOverlay(props) {
 *   return (
 *    <Overlay onClose={ props.onClose } anchor={ props.btn_ref } offset={ props.anchor }>
 *      <Overlay.Title>
 *        Custom Modal
 *      </Overlay.Title>
 *      <Overlay.Body>
 *        Hello world!
 *      </Overlay.Body>
 *      <Overlay.Footer>
 *        <button type="button" onClick={ props.onClose }>
 *          Close
 *        </button>
 *      </Overlay.Footer>
 *    </Overlay>
 *   );
 * }
 */
 const Overlay = window.components.Overlay || NotCompatible('5.0');

 /**
 * Section component.
 *
 * @type {import('react').ComponentType<{ maxHeight: Number | String, relativePos: Boolean } }>}
 *
 * @example
 * 
 * import { Section } from 'camunda-modeler-plugin-helpers/components';
 *
 * function CustomSection(props) {
 *   return (
 *    <Section maxHeight="240px">
 *     <Section.Header>
 *       Custom section
 *     </Section.Header>
 *     <Section.Body>
 *       Hello world!
 *     </Section.Body>
 *     <Section.Actions>
 *      <button type="button" onClick={ props.onClose }>
 *        Close
 *      </button>
 *     </Section.Actions>
 *    </Section>
 *   );
 * }
 */
const Section = window.components.Section || NotCompatible('5.0');

 /**
 * ToggleSwitch component.
 *
 * @type {import('react').ComponentType<{ id: string, name: string, label?: string, switcherLabel?: string, description?: string }>}
 *
 * @example
 * 
 * import { ToggleSwitch } from 'camunda-modeler-plugin-helpers/components';
 *
 * function CustomToggle(props) {
 *   return (
 *    <Formik initialValues={ initialValues } onSubmit={ this.onSubmit }>
 *      {() => (
 *        <Form>
 *          <Field
 *            component={ ToggleSwitch }
 *            switcherLabel="Switcher label"
 *            id={ id }
 *            name={ name }
 *            description="Toggle description"
 *          />
 *        </Form>
 *       )}
 *    </Formik>
 *   );
 * }
 */
const ToggleSwitch = window.components.ToggleSwitch || NotCompatible('5.0');

/***/ }),

/***/ "./node_modules/camunda-modeler-plugin-helpers/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/camunda-modeler-plugin-helpers/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getModelerDirectory": () => (/* binding */ getModelerDirectory),
/* harmony export */   "getPluginsDirectory": () => (/* binding */ getPluginsDirectory),
/* harmony export */   "registerBpmnJSModdleExtension": () => (/* binding */ registerBpmnJSModdleExtension),
/* harmony export */   "registerBpmnJSPlugin": () => (/* binding */ registerBpmnJSPlugin),
/* harmony export */   "registerClientExtension": () => (/* binding */ registerClientExtension),
/* harmony export */   "registerClientPlugin": () => (/* binding */ registerClientPlugin),
/* harmony export */   "registerCloudBpmnJSModdleExtension": () => (/* binding */ registerCloudBpmnJSModdleExtension),
/* harmony export */   "registerCloudBpmnJSPlugin": () => (/* binding */ registerCloudBpmnJSPlugin),
/* harmony export */   "registerDmnJSModdleExtension": () => (/* binding */ registerDmnJSModdleExtension),
/* harmony export */   "registerDmnJSPlugin": () => (/* binding */ registerDmnJSPlugin),
/* harmony export */   "registerPlatformBpmnJSModdleExtension": () => (/* binding */ registerPlatformBpmnJSModdleExtension),
/* harmony export */   "registerPlatformBpmnJSPlugin": () => (/* binding */ registerPlatformBpmnJSPlugin)
/* harmony export */ });
/**
 * Validate and register a client plugin.
 *
 * @param {Object} plugin
 * @param {String} type
 */
function registerClientPlugin(plugin, type) {
  var plugins = window.plugins || [];
  window.plugins = plugins;

  if (!plugin) {
    throw new Error('plugin not specified');
  }

  if (!type) {
    throw new Error('type not specified');
  }

  plugins.push({
    plugin: plugin,
    type: type
  });
}

/**
 * Validate and register a client plugin.
 *
 * @param {import('react').ComponentType} extension
 *
 * @example
 *
 * import MyExtensionComponent from './MyExtensionComponent';
 *
 * registerClientExtension(MyExtensionComponent);
 */
function registerClientExtension(component) {
  registerClientPlugin(component, 'client');
}

/**
 * Validate and register a bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerBpmnJSPlugin(BpmnJSModule);
 */
function registerBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.modeler.additionalModules');
}

/**
 * Validate and register a platform specific bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerPlatformBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerPlatformBpmnJSPlugin(BpmnJSModule);
 */
function registerPlatformBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.platform.modeler.additionalModules');
}

/**
 * Validate and register a cloud specific bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerCloudBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerCloudBpmnJSPlugin(BpmnJSModule);
 */
function registerCloudBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.cloud.modeler.additionalModules');
}

/**
 * Validate and register a bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerBpmnJSModdleExtension(moddleDescriptor);
 */
function registerBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.modeler.moddleExtension');
}

/**
 * Validate and register a platform specific bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerPlatformBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerPlatformBpmnJSModdleExtension(moddleDescriptor);
 */
function registerPlatformBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.platform.modeler.moddleExtension');
}

/**
 * Validate and register a cloud specific bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerCloudBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerCloudBpmnJSModdleExtension(moddleDescriptor);
 */
function registerCloudBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.cloud.modeler.moddleExtension');
}

/**
 * Validate and register a dmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerDmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerDmnJSModdleExtension(moddleDescriptor);
 */
function registerDmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'dmn.modeler.moddleExtension');
}

/**
 * Validate and register a dmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerDmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const DmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerDmnJSPlugin(DmnJSModule, [ 'drd', 'literalExpression' ]);
 * registerDmnJSPlugin(DmnJSModule, 'drd')
 */
function registerDmnJSPlugin(module, components) {

  if (!Array.isArray(components)) {
    components = [ components ]
  }

  components.forEach(c => registerClientPlugin(module, `dmn.modeler.${c}.additionalModules`)); 
}

/**
 * Return the modeler directory, as a string.
 *
 * @deprecated Will be removed in future Camunda Modeler versions without replacement.
 *
 * @return {String}
 */
function getModelerDirectory() {
  return window.getModelerDirectory();
}

/**
 * Return the modeler plugin directory, as a string.
 *
 * @deprecated Will be removed in future Camunda Modeler versions without replacement.
 *
 * @return {String}
 */
function getPluginsDirectory() {
  return window.getPluginsDirectory();
}

/***/ }),

/***/ "./node_modules/camunda-modeler-plugin-helpers/react.js":
/*!**************************************************************!*\
  !*** ./node_modules/camunda-modeler-plugin-helpers/react.js ***!
  \**************************************************************/
/***/ ((module) => {

if (!window.react) {
  throw new Error('Not compatible with Camunda Modeler < 3.4');
}

/**
 * React object used by Camunda Modeler. Use it to create UI extension.
 *
 * @type {import('react')}
 */
module.exports = window.react;

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/react-string-format/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-string-format/lib/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __webpack_require__(/*! react */ "./node_modules/camunda-modeler-plugin-helpers/react.js");
exports.WhiteSpaceChar = '&nbsp;';
function format(text) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    var result = [text];
    params.forEach(function (param, i) {
        result = parseAndReplace(result, param, i);
    });
    if (result.length === 0) {
        return '';
    }
    else if (result.length === 1 && typeof result[0] === 'string') {
        return result[0];
    }
    else {
        return (React.createElement(React.Fragment, null, result.map(function (x, i) {
            return React.createElement(React.Fragment, { key: i }, x);
        })));
    }
}
exports.format = format;
function replaceWhiteSpace(text) {
    var result = [];
    var start = false;
    var end = false;
    if (!!text.match(/^\s+/gi)) {
        text = text.replace(/^\s+/gi, '');
        start = true;
    }
    if (!!text.match(/\s+$/gi)) {
        text = text.replace(/\s+$/gi, '');
        end = true;
    }
    if (start) {
        result.push(React.createElement(React.Fragment, null, "\u00A0"));
    }
    result.push(text);
    if (end) {
        result.push(React.createElement(React.Fragment, null, "\u00A0"));
    }
    return result;
}
function parseAndReplace(source, replaceWith, index) {
    var result = [];
    source.forEach(function (possibleText) {
        if (typeof possibleText === 'string') {
            var pattern = new RegExp("\\{" + index + "\\}", 'gi');
            if (typeof replaceWith === 'string' || typeof replaceWith === 'number') {
                result.push(possibleText.replace(pattern, "" + replaceWith));
            }
            else {
                var splits_1 = possibleText.split(pattern);
                splits_1.forEach(function (splitText, i) {
                    if (splitText) {
                        replaceWhiteSpace(splitText).forEach(function (text) { return result.push(text); });
                    }
                    // if NOT last
                    if (i + 1 < splits_1.length) {
                        result.push(replaceWith);
                    }
                });
            }
        }
        else {
            result.push(possibleText);
        }
    });
    return result;
}


/***/ }),

/***/ "./resources/aasicon.svg":
/*!*******************************!*\
  !*** ./resources/aasicon.svg ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/camunda-modeler-plugin-helpers/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({
  styles = {},
  ...props
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "25",
  viewBox: "0 0 200 252"
}, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("image", {
  width: "200",
  height: "220",
  href: "data:image/png;base64,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 8H2hGldXx+3zIAAAAASUVORK5CYII="
})));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! camunda-modeler-plugin-helpers */ "./node_modules/camunda-modeler-plugin-helpers/index.js");
/* harmony import */ var _aasWebServiceDiscovererExtension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aasWebServiceDiscovererExtension */ "./client/aasWebServiceDiscovererExtension.js");
/* harmony import */ var _customPalette_CustomPaletteProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customPalette/CustomPaletteProvider */ "./client/customPalette/CustomPaletteProvider.js");
/** 
 * NOTE: This is specifically a registration of a **bpmn-js** extension. If you would like to create another type of plugin 
 * (say a client extension), the structure of the plugin and the function to register it will be slightly different.
 * 
 * Please refer to:
 * Examples plugins - https://github.com/camunda/camunda-modeler-plugins
 * Plugin documentation - https://docs.camunda.io/docs/components/modeler/desktop-modeler/plugins/
 */



(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerClientExtension)(_aasWebServiceDiscovererExtension__WEBPACK_IMPORTED_MODULE_1__["default"]); //2nd plugin

const customPaletteBpmnJSPlugin = {
  __init__: ['customPaletteProvider'],
  customPaletteProvider: ['type', _customPalette_CustomPaletteProvider__WEBPACK_IMPORTED_MODULE_2__["default"]]
};
(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerBpmnJSPlugin)(customPaletteBpmnJSPlugin);
})();

/******/ })()
;
//# sourceMappingURL=client.js.map