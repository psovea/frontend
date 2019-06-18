import React from 'react'
import PropTypes from 'react-proptypes'

class Widget extends React.Component {
    constructor() {
        super()

        this.state = {
            showSettings: false
        }

        this.handleSettingsChange = this.handleSettingsChange.bind(this);
    }

    static get propTypes() { 
        return {
            component: PropTypes.any, 
            settings: PropTypes.any,
            componentId: PropTypes.any,
            title: PropTypes.any,
            names: PropTypes.any 
        }
    }

    handleSettingsChange(i, v) {
        var name = this.props.names[i];
        this.setState({newSettings: {[name]: v}}, () => console.log(this.state))
        // console.log(this.state)
    }

    makeSettings = () => {
        return this.props.settings.map((setting, i) => {
            return (
            <div className="dashboard-widget-content-settings-container-content" key={`setting-${i}`}>
                <p className="dashboard-widget-content-settings-container-content-title">title</p>
                <hr />
                {setting((v) => this.handleSettingsChange(i, v))}
            </div>
            )
        })
    }

    makeComponent = () => {
        return (
            <div className="dashboard-widget-content" id={this.props.componentId}>
                {this.props.component}
            </div>
        )
    }

    render() {
        return (
            <div className="dashboard-widget">
                <div className="dashboard-widget-header row">
                    <div className="dashboard-widget-header-title-wrapper col-10">
                        <p className="dashboard-widget-header-title">{this.props.title}</p>
                    </div>

                    <div className="dashboard-widget-header-settings-wrapper col-2" onClick={() => this.setState({showSettings: !this.state.showSettings})}>
                        <i className="dashboard-widget-header-settings-wrapper-icon fa fa-sliders" aria-hidden="true" />
                    </div>
                </div>
                {this.makeComponent()}
                <div className={"dashboard-widget-content-settings " + (this.state.showSettings ? "show" : "hide")} id="bar">
                    <div className="dashboard-widget-content-settings-container">
                        {this.makeSettings()}
                    </div> 

                    <div className="dashboard-widget-content-settings-buttons">
                        <div className="dashboard-widget-content-settings-buttons-container">
                            <button className="dashboard-widget-content-settings-buttons-button button outline primary"><i className="dashboard-widget-settings-button-icon fa fa-check"></i> apply</button>
                            <button className="dashboard-widget-content-settings-buttons-button button outline secondary"><i className="dashboard-widget-settings-button-icon fa fa-refresh"></i> reset</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Widget
