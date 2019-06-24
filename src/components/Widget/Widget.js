import React from 'react'
import PropTypes from 'react-proptypes'
import Loader from 'react-loader-spinner'

class Widget extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showSettings: false,
            defaultSettings: props.defaultSettings,
            loading: true
        }

        this.url="18.224.29.151:5000/get_delays"

        this.compRef = React.createRef()
        this.component = props.component
        this.DAY = 86400

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
        this.setState({currentSettings: this.state.defaultSettings}, this.fetchData)
    }

    handleSettingsChange(i, v) {
        var name = this.props.names[i]
        this.setState({newSettings: {...this.state.newSettings, [name]: v}})

        this.props.addSetting(this.props.componentId, {...this.state.newSettings, [name]: v})
    }

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

    applySettings = () => {
        this.setState({currentSettings: {...this.state.currentSettings, ...this.state.newSettings}, showSettings: false}, () => {
            this.fetchData()
        })
    }

    // https://mhnpd.github.io/react-loader-spinner/?selectedKind=Loader&selectedStory=Oval&full=0&addons=0&stories=1&panelRight=0
    // Link for loader types
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


    getCurrentSettings = () => this.state.currentSettings

    defaultSettings = () => {
        this.setState({currentSettings: this.state.defaultSettings})
    }

    makeComponent = (visibility, id) => {
        // If state.loading = true, then we display the loader else the widget
        if (this.state.loading) {
            return (
                <div>
                    {/* We need to clone the element, but we don't display it, Not sure what this does, probably a better solution than this */}
                    <div className={"dashboard-widget-content none"} id={id} style={{display: 'none'}}>
                        { React.cloneElement(this.component, {ref: this.compRef}) }
                    </div>
                    {this.loader()}
                </div>
            )
        }
        // When the data is fetched we show the widget normally
        return (
            <div className={"dashboard-widget-content " + visibility} id={id}>
                { React.cloneElement(this.component, {ref: this.compRef}) }
            </div>
        )
    }

    createUriFromSettings = () => {
        if (!this.state.currentSettings) { return "" }

        let keys = Object.keys(this.state.currentSettings)
        let vals = Object.values(this.state.currentSettings)

        let zipWith = (f, xs, ys) => xs.map((n,i) => {
            if (n == "return_filter[]" || n == "district[]") {
                return ys[i].map(x => n + "=" + x).join("&")
            }  else if (n == "period") {
                return n + "=" + ys[i].toString() + "s"
            }

            return f(n, ys[i])
        })

        if (keys.includes("days")) {
            let uris = this.state.currentSettings.days.map(day => {
                let day_query = "start_time=" + (day * -this.DAY) + "&end_time=" + ((day - 1) * -this.DAY)
                let new_keys = keys.filter(x => x != "days")
                let new_vals = new_keys.map(x => this.state.currentSettings[x])
                
                return '?' + zipWith((x, y) => x.toString() + "=" + y.toString(), new_keys, new_vals).join("&") + day_query
            })
            
            // console.log(uris)
            return uris.some(x => x == "") ? null : uris
        }

        let uri = '?' + zipWith((x, y) => x.toString() + "=" + y.toString(), keys, vals).join("&")
        // console.log(uri)

        return uri == "" ? null : [uri]
    }

    f = (uri) => {
        let url = 'https://cors-anywhere.herokuapp.com/' + this.url + uri
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
    }

    fetchData = () => {
        let uris = this.createUriFromSettings()
        
        if (!uris) { this.setState({loading: false}); return }

        this.setState({loading: true}, () => {
            Promise.all(uris.map(this.f))
                .then(json => { this.setState({loading: false}, () => this.compRef.current.update(json)) })
                .catch(e => console.log(e))
        });
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
