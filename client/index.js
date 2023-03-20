/** 
 * NOTE: This is specifically a registration of a **bpmn-js** extension. If you would like to create another type of plugin 
 * (say a client extension), the structure of the plugin and the function to register it will be slightly different.
 * 
 * Please refer to:
 * Examples plugins - https://github.com/camunda/camunda-modeler-plugins
 * Plugin documentation - https://docs.camunda.io/docs/components/modeler/desktop-modeler/plugins/
 */

import { registerClientExtension, registerBpmnJSPlugin, registerPlatformBpmnJSPlugin, registerPlatformBpmnJSModdleExtension, registerBpmnJSModdleExtension } from 'camunda-modeler-plugin-helpers';
import aasWebServicePlugin from './aasWebServiceDiscovererExtension';
import customPaletteProviderModule from './customPaletteProviders';
import qosPropertiesProviderModule from './customPropertiesPanelProviders/providers/qosPropertiesPanelProvider';
import qosModdleDescriptor from './customPropertiesPanelProviders/descriptors/QosXmlFieldsDescriptor.json';

//register aas modal window
registerClientExtension(aasWebServicePlugin);

//register custom palette
//registerPlatformBpmnJSPlugin(customPaletteProviderModule);
registerBpmnJSPlugin(customPaletteProviderModule);

//register qos properties panel
//registerPlatformBpmnJSPlugin(qosPropertiesProviderModule);
registerBpmnJSPlugin(qosPropertiesProviderModule);

//register descriptor of the qosModdleDescriptor
//registerPlatformBpmnJSModdleExtension(qosModdleDescriptor);
registerBpmnJSModdleExtension(qosModdleDescriptor);
