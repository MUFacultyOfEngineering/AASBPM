/* eslint-disable no-unused-vars */
import React, { useState } from 'camunda-modeler-plugin-helpers/react';
import { Overlay, Section } from 'camunda-modeler-plugin-helpers/components';
import { format } from 'react-string-format';

const OFFSET = { right: 0 };

const pathToWSSubmElemsAdminShellIO = '/aas/{aasIdShort}/submodels/RestServices/complete';
const pathToWSSubmElemsBasyx = '/aasServer/shells/{aasId}/aas/submodels/RestServices/submodel';
const pathToAasListAdminShellIO = '/server/listaas';
const pathToAasListBasyx = '/aasServer/shells';

//#region get data from AAS Server
function discoverAasRestServices(aasImplementation, hostName, port, pathToAasList, pathToWSSubmElems){
  if (hostName.endsWith("/")) hostName = hostName.slice(0, -1);
  if (pathToAasList.startsWith("/")) pathToAasList = pathToAasList.substring(1, pathToAasList.length);
  var aasUrl = hostName + ":" + port + '/' + pathToAasList;

  fetch(aasUrl)
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    alert(format('{0} AASs found.', data.aaslist.length));

    if(data.aaslist.length > 0){
      data.aaslist.forEach(element => {
        var arElement = element.split(':');
        var aasIdentifier = arElement[1].trim();

        //"1 : aasDevice01 : [Custom] AssetAdministrationShell---3472E221 : aasxs\\RaspberryDevice01.aasx",
        getSubmodelElementsFromAasId(hostName, port, aasIdentifier, pathToWSSubmElems)
      });
    }
  })
  .catch(console.log)
}

function getSubmodelElementsFromAasId(aasImplementation, hostName, port, aasIdentifier, pathToWSSubmElems){
  if (hostName.endsWith("/")) hostName = hostName.slice(0, -1);
  if (pathToWSSubmElems.startsWith("/")) pathToWSSubmElems = pathToWSSubmElems.substring(1, pathToWSSubmElems.length);
  pathToWSSubmElems = pathToWSSubmElems.replace("{aasId}", aasIdentifier);
  var aasUrl = hostName + ":" + port + '/' + pathToWSSubmElems;

  fetch(aasUrl)
  .then(response => response.json())
  .then((data) => {
    console.log(data.submodelElements);
    alert(format('{0} web services found from the AAS «{1}»', data.submodelElements.length, aasIdentifier));
    data.submodelElements.forEach(element => {
      console.log(element);
    });
  })
  .catch(console.log)
}
//#endregion

// we can even use hooks to render into the application
export default function ConfigOverlay({ anchor, initValues, onClose }) {
  const [ enabled, setEnabled ] = useState(initValues.enabled);
  const [ hostName, setHostName ] = useState(initValues.hostName);
  const [ port, setPort ] = useState(initValues.port);
  const [ aasImplementation, setAasImplementation ] = useState(initValues.aasImplementation);
  const [ pathToAasList, setPathToAasList ] = useState(initValues.pathToAasList);
  const [ pathToWSSubmElems, setPathToWSSubmElems ] = useState(initValues.pathToWSSubmElems);
  const [ autoDiscovererInterval, setAutoDiscovererInterval ] = useState(initValues.autoDiscovererInterval);

  const onSubmit = () => {
    //discoverAasRestServices(aasImplementation, hostName, port, pathToAasList, pathToWSSubmElems);
    onClose({ enabled, hostName, port, aasImplementation, pathToAasList, pathToWSSubmElems, autoDiscovererInterval });
  }

  function onChangeAasImplementation(aasImplementation){
    switch(aasImplementation){
      case "AdminShellIO":
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
  }

  // we can use the built-in styles, e.g. by adding "btn btn-primary" class names
  return (
    <Overlay anchor={ anchor } onClose={ onClose } offset={ OFFSET }>
      <Section>
        <Section.Header>AAS WebService Discoverer</Section.Header>

        <Section.Body>
          <form id="aasWebServiceDiscovererConfigForm" onSubmit={ onSubmit }>
            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input name="enabled" className="custom-control-input" id="enabled" type="checkbox" onChange={ () => setEnabled(!enabled) } value={ enabled } defaultChecked={ enabled } />
                <label className="custom-control-label" htmlFor="enabled">Enabled</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="hostName">Host Name:</label>
              <input type="text" className="form-control" name="hostName" value={ hostName } onChange={ (event) => setHostName(event.target.value) } />
            </div>
            <div className="form-group">
              <label htmlFor="port">Port:</label>
              <input type="Number" className="form-control" name="port" min="1" max="99999" value={ port } onChange={ (event) => setPort(Number(event.target.value)) } />
            </div>
            <div className="form-group">
              <label htmlFor="aasImplementation">AAS Implementation:</label>
              <select className='form-control' name='aasImplementation' value={ aasImplementation } onChange={ (event) => onChangeAasImplementation(event.target.value) } >
                <option value={"AdminShellIO"} selected>admin-shell-io</option>
                <option value={"Basyx"}>Basyx</option>
                <option value={"Other"}>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pathToAasList">Path to AAS List:</label>
              <input type="text" className="form-control" name="pathToAasList" value={ pathToAasList } onChange={ (event) => setPathToAasList(event.target.value) } />
            </div>
            <div className="form-group">
              <label htmlFor="pathToWSSubmElems">Path to RestServices Submodel Elements:</label>
              <input type="text" className="form-control" name="pathToWSSubmElems" value={ pathToWSSubmElems } onChange={ (event) => setPathToWSSubmElems(event.target.value) } />
            </div>
            <div className="form-group">
              <label htmlFor="autoDiscovererInterval">Auto Discover Interval (seconds):</label>
              <input type="number" className="form-control" name="autoDiscovererInterval" min="5" max="60" value={ autoDiscovererInterval } onChange={ (event) => setAutoDiscovererInterval(Number(event.target.value)) } />
            </div>
          </form>

          <Section.Actions>
            <button type="submit" className="btn btn-primary" form="aasWebServiceDiscovererConfigForm">Save</button>
          </Section.Actions>
        </Section.Body>
      </Section>
    </Overlay>
  );
}
