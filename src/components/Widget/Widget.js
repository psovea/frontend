import React from 'react'
import PropTypes from 'react-proptypes'

class Widget extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showSettings: false,
            defaultSettings: props.defaultSettings
        }

        this.compRef = React.createRef()
        this.component = props.component

        this.handleSettingsChange = this.handleSettingsChange.bind(this);
        this.applySettings = this.applySettings.bind(this);
    }

    static get propTypes() { 
        return {
            component: PropTypes.any, 
            settings: PropTypes.any,
            componentId: PropTypes.any,
            title: PropTypes.any,
            names: PropTypes.any,
            defaultSettings: PropTypes.any
        }
    }

    componentDidMount() {
        this.setState({currentSettings: this.state.defaultSettings}, () => console.log(this.state))
    }

    handleSettingsChange(i, v) {
        var name = this.props.names[i];
        this.setState({newSettings: {...this.state.newSettings, [name]: v}}, () => console.log(this.state))
    }

    makeSettings = () => {
        return this.props.settings.map((setting, i) => {
            return (
            <div className="dashboard-widget-content-settings-container-content" key={`setting-${i}`}>
                <p className="dashboard-widget-content-settings-container-content-title">{this.props.names[i]}</p>
                <hr />
                {setting((v) => this.handleSettingsChange(i, v))}
            </div>
            )
        })
    }

    applySettings = () => {
        this.setState({currentSettings: this.state.newSettings, showSettings: false}, () => {
            console.log(this.state.currentSettings)
            this.compRef.current.update(this.state.currentSettings)
        })
    }

    getCurrentSettings = () => this.state.currentSettings

    defaultSettings = () => {
        this.setState({currentSettings: this.state.defaultSettings}, () => console.log(this.state))
    }

    makeComponent = (visibility, id) => {
        return (
            <div className={"dashboard-widget-content " + visibility} id={id}>
                { React.cloneElement(this.component, {ref: this.compRef}) }
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
                {this.makeComponent((this.state.showSettings ? "hide" : "show"), this.props.componentId)}
                <div className={"dashboard-widget-content-settings " + (this.state.showSettings ? "show" : "hide")} id={this.props.componentId}>
                    <div className="dashboard-widget-content-settings-container">
                        {this.makeSettings()}
                    </div> 
                    <div className="dashboard-widget-content-settings-buttons">
                        <div className="dashboard-widget-content-settings-buttons-container">
                            <button onClick={this.applySettings} className="dashboard-widget-content-settings-buttons-button button outline primary"><i className="dashboard-widget-settings-button-icon fa fa-check"></i> apply</button>
                            <button onClick={this.defaultSettings} className="dashboard-widget-content-settings-buttons-button button outline secondary"><i className="dashboard-widget-settings-button-icon fa fa-refresh"></i> reset</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Widget
