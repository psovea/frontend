/* Widget.js
 * Description: Wrapper for a component. This includes settings, data fetching etc.
 */

import React from 'react'
import PropTypes from 'react-proptypes'
import Loader from 'react-loader-spinner'
import Missing from '../Missing/Missing';
import * as helper from './WidgetHelper'
import { toLocalUrl } from '../../helper';

class Widget extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showSettings: false,
            defaultSettings: props.defaultSettings,
            loading: true,
            error: false
        }

        this.url = "18.224.29.151:5000/get_delays"

        this.compRef = React.createRef()
        this.component = props.component

        this.handleSettingsChange = this.handleSettingsChange.bind(this)
        this.applySettings = this.applySettings.bind(this)
    }

    static get propTypes() {
        return {
            component: PropTypes.any,
            settings: PropTypes.any,
            componentId: PropTypes.any,
            title: PropTypes.any,
            names: PropTypes.any,
            settingsTitles: PropTypes.any,
            defaultSettings: PropTypes.any,
            addSetting: PropTypes.any
        }
    }

    componentDidMount() {
        this.setState({ currentSettings: this.state.defaultSettings }, this.fetchData)
    }

    /* When one of the settings components change their value, it is updated in this
     * state appropriately.
     */
    handleSettingsChange(i, v) {
        var name = this.props.names[i]
        this.setState({ newSettings: { ...this.state.newSettings, [name]: v } })

        this.props.addSetting(this.props.componentId, { ...this.state.newSettings, [name]: v })
    }

    /* Create settings HTML. */
    makeSettings = () => {
        return this.props.settings.map((setting, i) => {
            return (
                <div className="dashboard-widget-content-settings-container-content" key={`setting-${i}`}>
                    <p className="dashboard-widget-content-settings-container-content-title">{this.props.settingsTitles[i]}</p>
                    <hr />
                    {setting((v) => this.handleSettingsChange(i, v))}
                </div>
            )
        })
    }

    /* Apply the updated settings and update the child component. */
    applySettings = () => {
        this.setState({ currentSettings: { ...this.state.currentSettings, ...this.state.newSettings }, showSettings: false }, () => {
            this.fetchData()
        })
    }

    /* Render the loader. */
    loader = () => {
        return (
            <div className={"loader-widget"}>
                <Loader
                    type="Oval"
                    color="red"
                    height="100"
                    width="100"
                />
            </div>
        )
    }

    /* Set the default settings. */
    defaultSettings = () => {
        this.setState({ currentSettings: this.state.defaultSettings })
    }

    /* Create component. If an error has occured, show the "missing data" text
     * , if it is loading, show the loader.
     */
    makeComponent = (visibility, id) => {
        return this.state.error   ? <div><Missing/></div>      :
               this.state.loading ? <div>{this.loader()}</div> :
               <div className={"dashboard-widget-content " + visibility} id={id}>
                    {React.cloneElement(this.component, { ref: this.compRef })}
                </div>
    }

    /* Create a URI based on the settings. */
    createUriFromSettings = () => {
        if (!this.state.currentSettings) { return "" }

        let keys = Object.keys(this.state.currentSettings)
        let vals = Object.values(this.state.currentSettings)

        return keys.includes("range") ? helper.rangeURI(this.state.currentSettings, keys) :
               keys.includes("days")  ? helper.daysURI(this.state.currentSettings, keys)  :
               helper.uri(keys, vals)
    }

    /* Fetch uri */
    fetchSingle = (uri) => {
        let url = toLocalUrl(this.url + uri)
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
    }

    /* Fetch all data based on the current settings. */
    fetchData = () => {
        let uris = this.createUriFromSettings()

        if (!uris) { this.setState({ loading: false, error: false }); return }

        this.setState({ loading: true, error: false }, () => {
            Promise.all(uris.map(this.fetchSingle))
                .then(json => { this.setState({ loading: false, error: false }, () => this.compRef.current.update(json, this.state.currentSettings)) })
                .catch(e => { console.log(e); this.setState({ loading: false, error: true }) })
        })
    }

    render() {
        return (
            <div className="dashboard-widget">
                <div className="dashboard-widget-header row">
                    <div className="dashboard-widget-header-title-wrapper col-10">
                        <p className="dashboard-widget-header-title">{this.props.title}</p>
                    </div>

                    <div className="dashboard-widget-header-settings-wrapper col-2" onClick={() => this.setState({ showSettings: !this.state.showSettings })}>
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
                            <button onClick={this.applySettings} className="dashboard-widget-content-settings-buttons-button button outline primary"><i className="dashboard-widget-settings-button-icon fa fa-check"></i> Toepassen</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Widget
