import React from 'react'
import PropTypes from 'react-proptypes'
class Settings extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false,
        }
        this.settingsClicked = this.settingsClicked.bind(this);
    }

    settingsClicked() {
        this.setState({ settings: !this.state.settings })
    }

    static get propTypes() {
        return {
            attributes: PropTypes.any,
        };
    }

    makeSettings(text) {
        return (
            <div className="dashboard-widget-content-settings-container-content">
                <p className="dashboard-widget-content-settings-container-content-title">{text}</p>
                <hr />
                {this.props.attributes}
            </div>
        )
    }

    render() {
        return (
            <div className={"dashboard-widget-content-settings " + (this.state.show ? "show" : "hide")} id="bar">
                <div className="dashboard-widget-content-settings-container">
                    {this.makeSettings()}
                </div>
                <div className="dashboard-widget-content-settings-buttons">
                    <div className="dashboard-widget-content-settings-buttons-container">
                        <button className="dashboard-widget-content-settings-buttons-button button outline primary">
                            <i className="dashboard-widget-settings-button-icon fa fa-check" />
                            Apply
                        </button>
                        <button className="dashboard-widget-content-settings-buttons-button button outline secondary">
                            <i className="dashboard-widget-settings-button-icon fa fa-refresh" />
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;
