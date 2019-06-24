/* Table.js:
 * Discription: This is the Table component. The table is shown in a grid box.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Missing from '../Missing/Missing';

import "./Table.css"

class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: this.props.headers,
            values: []
        }
    }

    update(newData) {
        this.setState({values: newData})
    }

    formatTime(item) {
        let minutes = Math.floor(item / 60).toString()
        let seconds = (item % 60).toString()

        return (minutes >= 1 ? minutes + " minuten en " : "") + seconds +  " seconden"
      }

    render() {
        if (this.state.values == null) {
            return <Missing/>
        }

        return (
            <table className="striped">
                <tbody>
                    <tr className="table-header-row">
                        {this.state.headers.map(col => <th key={col} className="table-header-row-value">{col}</th>)}
                    </tr>

                    {
                        this.state.values.map((row, i) => {
                            let metric = row.metric
                            let values = row.value

                            return <tr className="table-row" key={i}>
                                <td className="table-row-value" key={i}>{i}</td>
                                {

                                    Object.keys(metric).map(val => {
                                        return <td className="table-row-value" key={metric[val]}>{metric[val]}</td>
                                    })
                                }

                                <td className="table-row-value" key={values[1]}>{this.formatTime(parseInt(values[1]))}</td>
                            </tr>
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
    top: PropTypes.any,
    stateF: PropTypes.any
}

export default DataTable;
