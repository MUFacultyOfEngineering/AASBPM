import React, { Fragment, PureComponent } from 'camunda-modeler-plugin-helpers/react';
import { Fill } from 'camunda-modeler-plugin-helpers/components';

import classNames from 'classnames';

import Icon from '../resources/aasicon.svg';

import ConfigOverlay from './ConfigOverlay';

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

export default class aasWebServiceDiscovererExtension extends PureComponent{
  constructor(props) {
    super(props);

    this.state = defaultState;
    this.handleConfigClosed = this.handleConfigClosed.bind(this);
    this._buttonRef = React.createRef();
  }

  componentDidMount() {
    const {
      config,
      subscribe
    } = this.props;

    subscribe(PLUGIN_EVENT, () => {
      this.openModal();
    });

    // retrieve plugin related information from the application configuration
    config.getForPlugin(keyPluginConfigFile, 'config')
      .then((config) => {
        this.setState(config); 
        window.PLUGIN_CONFIGS = config;
      });
  }

  openModal() {
    this.setState({ configOpen: true });
  }

  handleConfigClosed(newConfig) {
    this.setState({ configOpen: false });

    if (newConfig) {

      // via <config> it is also possible to save data into the application configuration
      this.props.config.setForPlugin(keyPluginConfigFile, 'config', newConfig)
        .catch(console.error);

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
    };

    // we can use fills to hook React components into certain places of the UI
    return <Fragment>
      <Fill slot="status-bar__app" group="1_aasWebServiceDiscoverer">
        <button
          ref={ this._buttonRef }
          className={ classNames('btn', { 'btn--active': configOpen }) }
          onClick={ () => this.setState({ configOpen: true }) }>
          <Icon />
        </button>
      </Fill>
      { this.state.configOpen && (
        <ConfigOverlay
          anchor={ this._buttonRef.current }
          onClose={ this.handleConfigClosed }
          initValues={ initValues }
        />
      )}
    </Fragment>;
  }
}
