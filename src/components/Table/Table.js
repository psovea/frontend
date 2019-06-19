/* Table.js:
 * Discription: This is the Table component. The table is shown in a grid box.
 */

import React from 'react';
import PropTypes from 'prop-types';

import "./Table.css"

class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: this.props.headers,
            values: this.props.values,
            numShow: this.props.numShow
        }
    }

    update(newState) {
        this.setState(newState)
    }

    render() {
        // console.log("numShow table: " + this.state.numShow)
        return (
            <table className="striped">
                <tbody>
                    <tr className="table-header-row">
                        {this.state.headers.map(col => <th key={col} className="table-header-row-value">{col}</th>)}
                    </tr>
    
                    {
                        this.state.values.map((row, i) => {
                            if (this.state.numShow == 0 || i < this.state.numShow) {
                                return <tr className="table-row" key={row}>{row.map(col => 
                                    <td className="table-row-value" key={col}>{col}</td>)}
                                </tr>
                            }
                        })
                    }
    
                </tbody>
            </table>
      )
    }
}

DataTable.propTypes = {
    headers: PropTypes.any,
    values: PropTypes.any,
    numShow: PropTypes.any,
    stateF: PropTypes.any
}

export default DataTable;
