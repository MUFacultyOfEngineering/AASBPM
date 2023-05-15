import { TextFieldEntry, isTextFieldEntryEdited, SelectEntry, isSelectEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import { useEffect, useState } from '@bpmn-io/properties-panel/preact/hooks';

const EVALUATION_CONDITIONS = [
  { value: '<', label: '<' },
  { value: '<=', label: '<=' },
  { value: '>', label: '>' },
  { value: '>=', label: '>=' },
  { value: '==', label: '==' },
  { value: '!=', label: '!=' }
];

const CONDITIONAL_OPERATOR = [
  { value: '||', label: '||' },
  { value: '&&', label: '&&' }
];

var aasIdentifier = '';

export default function (props) {
  const {
    idPrefix,
    element,
    parameter
  } = props;

  //get aasIdentifier from serviveTask.camunda:Properties.aasIdentifier
  let extElemCamundaProps = element.businessObject.extensionElements.values.find(x=> x.$type == 'camunda:Properties')?.values;
  aasIdentifier = extElemCamundaProps? extElemCamundaProps.find(x=> x.name == 'aasIdentifier')?.value : '';

  const entries = [
    {
      id: idPrefix + '-name',
      component: CreateFieldQosParameterName,
      isEdited: isSelectEntryEdited,
      idPrefix,
      parameter
    },
    {
      id: idPrefix + '-condition',
      component: CreateFieldQosEvaluationCondition,
      isEdited: isSelectEntryEdited,
      idPrefix,
      parameter
    },
    {
      id: idPrefix + '-value',
      component: CreateFieldQosParameterValue,
      isEdited: isTextFieldEntryEdited,
      idPrefix,
      parameter
    },
    {
      id: idPrefix + '-operator',
      component: CreateFieldQosConditionalOperator,
      isEdited: isSelectEntryEdited,
      idPrefix,
      parameter
    }
  ];

  return entries;
}


//create parameter name selectBox
function CreateFieldQosParameterName(props) {
  const {
    idPrefix,
    element,
    parameter
  } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: parameter,
      properties: {
        name: value
      }
    });
  };

  const getValue = () => {
    return parameter.name;
  };

  const [ arParameterNamesFromAas, setParameterNamesFromAas ] = useState([]);

  useEffect(() => {    
    //gather parameterNames from AAS
    function getParameterNamesFromAas(aasIdentifier) {
      let hostName = window.PLUGIN_CONFIGS.hostName, 
        port = window.PLUGIN_CONFIGS.port, 
        pathToSubmElems = `/aasServer/shells/${aasIdentifier}/aas/submodels/InterfaceConnectionSheet/submodel`;

      if (hostName.endsWith("/")) hostName = hostName.slice(0, -1);
      if (pathToSubmElems.startsWith("/")) pathToSubmElems = pathToSubmElems.substring(1, pathToSubmElems.length);
      var icsSubmodelElementsUrl = hostName + ":" + port + '/' + pathToSubmElems;

      //set default qos params
      let arSelectBoxOptions = [
        { value: 'SuccessRate', label: 'SuccessRate' },
        { value: 'AvgResponseTime', label: 'AvgResponseTime' },
        { value: 'LastResponseTime', label: 'LastResponseTime' },
        { value: 'AvgNetworkLatency', label: 'AvgNetworkLatency' },
        { value: 'LastNetworkLatency', label: 'LastNetworkLatency' }
      ];

      fetch(icsSubmodelElementsUrl)
        .then(response => response.json())
        .then(async (data) => {
          let icsSubmodelElements = data.submodelElements;

          if (!icsSubmodelElements || icsSubmodelElements.length == 0) {
            console.log(`No QoS parameters found in the shell ${aasIdentifier}`);
            return;
          }
          console.log(`${icsSubmodelElements.length} QoS parameters found in the shell ${aasIdentifier}`);
          
          for (let i = 0; i < icsSubmodelElements.length; i++) {
            //there's one property that defines deviceIP address, omit this one and go for the next
            if (icsSubmodelElements[i].idShort == "DeviceIP") continue;

            //add to array for selectBox
            arSelectBoxOptions.push({
              value: icsSubmodelElements[i].value.find(x=> x.idShort == 'ShortName').value,
              label: icsSubmodelElements[i].value.find(x=> x.idShort == 'ShortName').value,
            });
          }
        })
        .catch(error => console.error(error))
        .finally(setParameterNamesFromAas(arSelectBoxOptions));
    }
    
    //get qos params from aas
    getParameterNamesFromAas(aasIdentifier);
  }, [ setParameterNamesFromAas ]);

  const getOptions = () => {
    return arParameterNamesFromAas;
  }

  return SelectEntry({
    element,
    id: idPrefix + '-name',
    description: translate('Select parameter'),
    label: translate('QoS Parameter'),
    getValue,
    setValue,
    debounce,
    getOptions: getOptions
  });
}

//create evaluation condition selectBox
function CreateFieldQosEvaluationCondition(props) {
  const {
    idPrefix,
    element,
    parameter
  } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: parameter,
      properties: {
        condition: value
      }
    });
  };

  const getValue = () => {
    return parameter.condition;
  };

  const getOptions = () => {
    return EVALUATION_CONDITIONS;
  }

  return SelectEntry({
    element,
    id: idPrefix + '-condition',
    description: translate('Select condition'),
    label: translate('Condition'),
    getValue,
    setValue,
    debounce,
    getOptions
  });
}

//create parameter value textField
function CreateFieldQosParameterValue(props) {
  const {
    idPrefix,
    element,
    parameter
  } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: parameter,
      properties: {
        value: value
      }
    });
  };

  const getValue = () => {
    return parameter.value;
  };

  return TextFieldEntry({
    element,
    id: idPrefix + '-value',
    description: translate('Parameter value'),
    label: translate('QoS Value'),
    getValue,
    setValue,
    debounce
  });
}

//create evaluation Conditional Operator selectBox
function CreateFieldQosConditionalOperator(props) {
  const {
    idPrefix,
    element,
    parameter
  } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: parameter,
      properties: {
        operator: value
      }
    });
  };

  const getValue = () => {
    return parameter.operator;
  };

  const getOptions = () => {
    return CONDITIONAL_OPERATOR;
  }

  return SelectEntry({
    element,
    id: idPrefix + '-operator',
    description: translate('Select conditional operator to connect with the next evaluation expression'),
    label: translate('Operator'),
    getValue,
    setValue,
    debounce,
    getOptions
  });
}
