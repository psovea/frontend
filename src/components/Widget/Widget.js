import React from 'react'
import PropTypes from 'react-proptypes'

class Widget extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showSettings: false,
            defaultSettings: props.defaultSettings
        }

        this.url="18.224.29.151:5000/get_delays"

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
            defaultSettings: PropTypes.any,
            addSetting: PropTypes.any
        }
    }

    componentDidMount() {
        this.setState({currentSettings: this.state.defaultSettings}, this.fetchData)
    }

    handleSettingsChange(i, v) {
        // console.log("Incoming value:", v)
        var name = this.props.names[i];
        this.setState({newSettings: {...this.state.newSettings, [name]: v}})

        this.props.addSetting(this.props.componentId, {...this.state.newSettings, [name]: v})
    }

    makeSettings = () => {
        return this.props.settings.map((setting, i) => {
            return (
            <div className="dashboard-widget-content-settings-container-content" key={`setting-${i}`}>
                <p className="dashboard-widget-content-settings-container-content-title">{`setting-${i}`}</p>
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

    getCurrentSettings = () => this.state.currentSettings

    defaultSettings = () => {
        this.setState({currentSettings: this.state.defaultSettings})
    }

    makeComponent = (visibility, id) => {
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
            if (n == "return_filter[]") {
                return ys[i].map(x => n + "=" + x).join("&")
            } else if (n == "period") {
                return n + "=" + ys[i].toString() + "s"
            }

            return f(n, ys[i])
        })

        return '?' + zipWith((x, y) => x.toString() + "=" + y.toString(), keys, vals).join("&")
    }

    fetchData = () => {
        let uri = this.createUriFromSettings()

        if (uri == "") { return }

        let url = 'https://cors-anywhere.herokuapp.com/' + this.url + uri

        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => { return res.json()})
          .then(json => this.compRef.current.update(json))
          .catch(e => console.log(e))
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
