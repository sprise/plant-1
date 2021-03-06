const React = require('react');

class DebugSettings extends React.Component {
  constructor() {
    super();
    this.clickCheck = this.clickCheck.bind(this);
    let debugSettings = localStorage.getItem('debug-settings');
    try {
      debugSettings = JSON.parse(debugSettings);
    } catch(e) {
      debugSettings = {};
    }
    this.state = debugSettings;
  }

  clickCheck(key) {
    const settings = this.state;
    if(settings[key]) {
      settings[key] = false;
    } else {
      settings[key] = true;
    }
    localStorage.setItem('debug-settings', JSON.stringify(settings));
    this.setState(settings);
  }

  renderCheckbox(setting) {
    const debugSettings = this.state;
    const checked = !!debugSettings[setting.name];
    return (
      <label>
        <input key={setting.name} type='checkbox'
          value={setting.name} checked={checked} /> {setting.description}
      </label>
    );
  }

  render() {
    const {
      settings
    } = this.props || {};

    if(!settings || settings.length === 0) {
      console.warn('You should have at least one setting in the properties passed to ReactDebugSettings');
      return null;
    }

    return (
      <div style={{marginLeft: '50px'}}>
        <div>{'Check the console debug messages that you want to enable. These settings are stored in localStorage which means that they\'ll still be set the next time you open this browser.'}</div>
        {settings.map( setting => this.renderCheckbox(setting) )}
      </div>
    );
  }
}

module.exports = DebugSettings;
