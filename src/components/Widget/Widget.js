import React from 'react'

class Widget extends React.Component {
    constructor() {
        super()
        this.state = {
            settings: false,
        }

        this.settingsClicked = this.settingsClicked.bind(this);
    }


    render() {
        return (
            <div className="dashboard-widget">
                <div className="dashboard-widget-header row">
                    <div className="dashboard-widget-header-title-wrapper col-10">
                        <p className="dashboard-widget-header-title">{this.props.title}</p>
                    </div>

                    <div className="dashboard-widget-header-settings-wrapper col-2" onClick={this.settingsClicked}>
                        {settingsIcon}
                    </div>
                </div>
                <div className="dashboard-widget-content" id="bar">
                    <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>;
                <Settings atributes={this.settingObject} />
            </div>
        )
    }
}

export default Widget;
