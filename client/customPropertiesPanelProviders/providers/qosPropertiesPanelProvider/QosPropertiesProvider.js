// Import your custom list group entries.
import parametersProps from './parts/QosParametersProperties';

// Import the properties panel list group component.
var propertiesPanel = require('@bpmn-io/properties-panel');

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

/**
 * An extension that makes quality of service parameters and conditions configurable via a new properties tab.
 *
 * @param {didi.Injector} injector
 * @param {didi.Translate} translate
 */
export default class QosPropertiesProvider {
  constructor(propertiesPanel, injector, translate) {
    this._injector = injector;
    this._translate = translate;
    propertiesPanel.registerProvider(LOW_PRIORITY, this);
  }


  getGroups(element) {
    return groups => {

      if (is(element, 'bpmn:ServiceTask')) {
        groups.push(createParametersGroup(element, this._injector, this._translate));
      }

      return groups;
    }
  };
}

QosPropertiesProvider.$inject = ['propertiesPanel', 'injector', 'translate'];

// Create the custom parameters list group.
function createParametersGroup(element, injector, translate) {

  // Create a group called "parameters".
  const parametersGroup = {
    label: translate('Quality of service parameters'),
    id: 'QualityOfServiceParameters',
    component: propertiesPanel.ListGroup,
    ...parametersProps({ element, injector })
  };

  return parametersGroup.items ? parametersGroup : null;
  //return parametersGroup;
}