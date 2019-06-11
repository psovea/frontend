import React from 'react';
import './DataContainerHeader.css'

class DataContainerHeader extends React.Component {
	render() {
        return (
            <div className="DataContainerHeader"> 
                <h4 className="DataContainerTitle">{this.props.title}</h4>
            </div>
        );
	}
}

export default DataContainerHeader; 