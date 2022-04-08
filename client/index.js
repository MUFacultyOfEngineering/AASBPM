/** 
 * NOTE: This is specifically a registration of a **bpmn-js** extension. If you would like to create another type of plugin 
 * (say a client extension), the structure of the plugin and the function to register it will be slightly different.
 * 
 * Please refer to:
 * Examples plugins - https://github.com/camunda/camunda-modeler-plugins
 * Plugin documentation - https://docs.camunda.io/docs/components/modeler/desktop-modeler/plugins/
 */

import { registerClientExtension, registerBpmnJSPlugin } from 'camunda-modeler-plugin-helpers';
import aasWebServicePlugin from './aasWebServiceDiscovererExtension';
import customPalettePlugin from './customPalette/CustomPaletteProvider';

registerClientExtension(aasWebServicePlugin);

//2nd plugin
const customPaletteBpmnJSPlugin = {
  __init__: [ 'customPaletteProvider' ],
  customPaletteProvider: [ 'type', customPalettePlugin ]
};

registerBpmnJSPlugin(customPaletteBpmnJSPlugin);
