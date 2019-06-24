/* Table.js:
 * Discription: This is the Table component. The table is shown in a grid box.
 */

import React from 'react'
import PropTypes from 'prop-types'
import Missing from '../Missing/Missing'
// import ReactTable from 'react-table'

import * as R from 'ramda'


import "./Table.css"
import "react-table/react-table.css"

class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: [],
            values: []
        }
    }

    componentDidMount() {
        this.setState({ headers: this.props.headers })
    }

    update(newData) {
        /* If the new data contains stop data, we should fetch the
         * stop names to display.
         */
        const hasStops = R.hasPath(['metric', 'stop_end'])
        if (R.all(hasStops)(newData)) {
            this.getStopNames(newData)
                .then(res => R.zipWith((x, y) => x.metric.stop_end = y, newData, res))
                .then(res => this.setState({values: newData}))
        } else {
            this.setState({values: newData})
        }
    }

    getStopNames(data) {
        var stops = R.join(",", R.map(item => item.metric.stop_end, data))

        return fetch(`https://cors-anywhere.herokuapp.com/http://18.224.29.151:5000/get-stops?stop_code=${stops}`)
            .then(res => res.json())
            .then(res => R.map(stop => stop.stop_name, res))
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
                                <td className="table-row-value" key={i}>{i + 1}</td>
                                {

                                    this.props.order.map(val => {
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
    stateF: PropTypes.any,
    order: PropTypes.any
}

export default DataTable
