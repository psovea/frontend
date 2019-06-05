import React from "react";
import "./DataContainer.css"

class DataContainer extends React.Component {

    render () {
        /* Retrieve the rows and collumns from the given properties */
        const rows = this.props.rows
        const collumns = this.props.collumns

        /* Adjust the height and width */
        const adjustedHeight = (rows * 100) + "%"
        const adjustedWidth = (collumns * 100) + "%"

        /* Create the css according to the given dimensions */
        var divStyle = {
            color: 'blue',
            width: adjustedWidth,
            height: adjustedHeight,
            backgroundColor: "red",
        };

        return (
            <div style={divStyle}>
            </div>
        );
    }
}

export default DataContainer;
